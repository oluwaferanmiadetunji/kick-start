// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.7.0;

contract CampaignFactory {
    Campaign[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        Campaign newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    } 

    function getDeployedCampaigns() public view returns (Campaign[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    constructor (uint minimum, address creator) {
        address manager = creator;
        uint minimumContribution = minimum;
    }

    struct NewRequest {
        uint amount;
        uint approvalCount;
        string description;
        address recipient;
        bool complete;
        mapping(address => bool) approvals;
    }

    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public numberOfApprovers;
}