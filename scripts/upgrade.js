const { ethers, upgrades } = require("hardhat");

const main = async () => {
    const CrowdFundV2 = await ethers.getContractFactory("CrowdFund");
    console.log("Upgrading Crowdfund....");
    await upgrades.upgradeProxy("0x5FC8d32690cc91D4c39d9d3abcBD16989F875707", CrowdFundV2);
    console.log("Crowdfund upgraded")
}


const runMain = async () => {
    try {
        await main();
        process.exit(0)
    } catch (error) {
        console.error(error);
        process.exit(1)
    }
}

runMain();