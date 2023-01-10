// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract CrowdFund {
    event CampaignCreated(
        address campaignAddress,
        string name,
        uint goal,
        uint deadline
    );
    event CampaignContributed(string name, uint amount, uint total);
    event DeadlineReached(string campaignName, uint total);
    //event CampaignCreated(string name, uint goal, uint deadline);

    //Campaign struct
    struct Campaign {
        string name;
        uint goal;
        uint deadline;
        uint total;
        address payable owner;
    }
     //array of campaigns
    Campaign[] public campaigns;


    //create a new campaign with name, goal and deadline
    function createCampaign(
        string memory name,
        uint goal,
        uint deadline
    ) public {
        //create a new campaign
        Campaign memory newCampaign = Campaign(
            name,
            goal,
            deadline,
            0,
            payable(msg.sender)
        );
        //add campaign to array
        campaigns.push(newCampaign);
        //emit event
        emit CampaignCreated(address(this), name, goal, deadline);
    }

    //contribute to a campaign
    function contribute(uint index) public payable {
        //get campaign from array
        Campaign storage campaign = campaigns[index];
        //add amount to total
        campaign.total += msg.value;
        //emit event
        emit CampaignContributed(campaign.name, msg.value, campaign.total);
    }
    // withdraw funds if deadline reached
    function withdraw() public payable {
        //get campaign from array
        Campaign storage campaign = campaigns[0];
        //check if deadline reached
        require(block.timestamp >= campaign.deadline, "Deadline not reached");
        //check if goal reached
        require(campaign.total >= campaign.goal, "Goal not reached");
        //transfer funds to owner
        campaign.owner.transfer(campaign.total);
        //emit event
        emit DeadlineReached(campaign.name, campaign.total);
    }

    function getAllCampaigns() public view returns (Campaign[] memory){
        return campaigns;
    }
}

