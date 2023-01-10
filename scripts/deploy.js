const main = async () => {

    const CrowdFund = await ethers.getContractFactory('CrowdFund');
    console.log('Deploying CrowdFund...');
    const crowdFund = await CrowdFund.deploy();
    await crowdFund.deployed();
    console.log('CrowdFund deployed to:', crowdFund.address);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

runMain();