const {expect} = require('chai');
const {BN, expectEvent, expectRevert} = require('@openzeppelin/test-helpers');

describe('CrowdFund', () => {
    before(async () => {
        this.CrowdFund = await ethers.getContractFactory('CrowdFund');
    });

    beforeEach(async () => {
        this.crowdFund = await this.CrowdFund.deploy();
        await this.crowdFund.deployed();
        await this.crowdFund.createCampaign('Test', 100, 100000);

    });

    // create a crowd funding campaign with Name, goal and deadline
    it('creates a crowd funding campaign', async () => {
        await this.crowdFund.createCampaign('Test', 100, 100000);
        const campaign = await this.crowdFund.campaigns(0);
        expect(campaign.name).to.equal('Test');
        expect(campaign.goal).to.equal(100);
        expect(campaign.deadline).to.equal(100000);

    });

    // contribute to a campaign
    it('contributes to a campaign', async () => {
        await this.crowdFund.contribute(0, {value: 50});
        const campaign = await this.crowdFund.campaigns(0);
        expect(campaign.total).to.equal(50);
    });
    //emit an event when a campaign is created
    it('emits an event when a campaign is created', async () => {
        await expect(this.crowdFund.createCampaign('Test', 100, 100000))
            .to.emit(this.crowdFund, 'CampaignCreated')
            .withArgs(0, 'Test', 100, 100000);
    });

    //emit an event when a campaign is contributed to
    it('emits an event when a campaign is contributed to', async () => {
        await expect(this.crowdFund.contribute(0, {value: 50}))
            .to.emit(this.crowdFund, 'CampaignContributed')
            .withArgs(0, 50);
    });

    // emit an event if the deadline for a campaign is reached
    it('emits an event if the deadline is reached', async () => {
        await expect(this.crowdFund.contribute(0, {value: 50}))
            .to.emit(this.crowdFund, 'DeadlineReached')
            .withArgs(0);
    });

    // campaign contributor can withdraw funds if goal is not reached within deadline
    it('contributor can withdraw funds if goal is not reached within deadline', async () => {
        await this.crowdFund.contribute(0, {value: 50});
        await expect(this.crowdFund.withdraw(0))
            .to.emit(this.crowdFund, 'Withdraw')
            .withArgs(0, 50);
    });

});
