const { ethers, upgrades } = require('hardhat');

const main = async () => {

    const CrowdFund = await ethers.getContractFactory('CrowdFund');
    console.log('Deploying CrowdFund...');
    const crowdFundV2 = await upgrades.deployProxy(CrowdFund,['Sample', 100, 100000], { initializer: 'createCampaign' });
    await crowdFundV2.deployed();
    console.log('CrowdFund deployed to:', crowdFundV2.address);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }


}

runMain();