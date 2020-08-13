// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum, string description, string name) public {
        address newCampaign = new Campaign(minimum, description, name, msg.sender);
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
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    Request[] public requests;
    
    uint public minimumContribution;
    uint public approversCount;
    uint public total;
    string public projectDescription;
    string public managerName;
    mapping(address => bool) public approvers;
    address public manager; 
 
    modifier restricted () {
        require(msg.sender == manager);
        _;
    }

    function Campaign (uint minimum, string description, string name, address creator) public {
        manager = creator;
        minimumContribution = minimum;
        projectDescription = description;
        managerName = name;
    }
 
    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
        total += msg.value;
    }
    
    function createRequest (string description, uint amount, address recipient) public restricted {
        Request memory newRequest = Request({
           description: description, 
           amount: amount, 
           recipient: recipient, 
           complete: false, 
           approvalCount: 0
        });
        
        requests.push(newRequest);
    }
    
    function approveRequest (uint index) public {
        Request storage request = requests[index];
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    
    function finalizeRequest (uint index) public restricted {
        Request storage request = requests[index];
        require(!request.complete);
        require(request.approvalCount > (approversCount / 2));
        request.recipient.transfer(request.amount);
        
        request.complete = true;
        
    }

    function getSummary () public view returns (
        uint, uint, uint, uint, uint, string, string, address
    ) {
        return (
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            total,
            projectDescription,
            managerName,
            manager
        );
    }

    function getRequestsCount () public view returns (uint) {
        return requests.length;
    }
}