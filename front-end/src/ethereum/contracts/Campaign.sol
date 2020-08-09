pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns () public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint amount;
        uint numberOfApprovals;
        address recipient;
        bool complete;
        mapping(address => bool) approvals;
    }
    
    Request[] public requests;
    
    address public manager;
    uint public minimumContribution;
    uint public numberOfApprovers;
    mapping(address => bool) public approvers;
 
    modifier restricted () {
        require(msg.sender == manager);
        _;
    }

    function Campaign (uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }
 
    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        numberOfApprovers++;
    }
    
    function createRequest (string description, uint amount, address recipient) public restricted {
        Request memory newRequest = Request({
           description: description, 
           amount: amount, 
           recipient: recipient, 
           complete: false, 
           numberOfApprovals: 0
        });
        
        requests.push(newRequest);
    }
    
    function approveRequest (uint index) public {
        Request storage request = requests[index];
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        request.approvals[msg.sender] = true;
        request.numberOfApprovals++;
    }
    
    function finalizeRequest (uint index) public restricted {
        Request storage request = requests[index];
        require(!request.complete);
        require(request.numberOfApprovals > (numberOfApprovers / 2));
        request.recipient.transfer(request.amount);
        
        request.complete = true;
        
    }

    function getSummary () public view returns (
        uint, uint, uint, uint, address
    ) {
        return (
            minimumContribution,
            this.balance,
            requests.length,
            numberOfApprovers,
            manager
        );
    }

    function getRequestsCount () public view returns (uint) {
        return requests.length;
    }
}