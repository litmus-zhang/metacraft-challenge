const { expect } = require('chai');

describe('Token', () => {
    before(async () => {
        this.Token = await ethers.getContractFactory('Token');
    });

    beforeEach(async () => {
        this.token = await this.Token.deploy(1000000);
        await this.token.deployed();
    });

    it('has a name', async () => {
        expect(await this.token.name()).to.equal('MetaToken');
    });
    it('has a symbol', async () => {
        expect(await this.token.symbol()).to.equal('MTK');
    });
    it('has 18 decimals', async () => {
        expect(await this.token.decimals()).to.equal(18);
    });
});