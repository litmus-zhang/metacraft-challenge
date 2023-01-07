const main = async () => {
    const Token = await ethers.getContractFactory('Token');
    console.log('Deploying Token...');
    const token = await Token.deploy();
    await token.deployed();
    console.log('Token deployed to:', token.address);

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