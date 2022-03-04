import {ethers} from "hardhat"
import {expect} from "chai"
import {stakeTotalsupply, stakeAddress, rewardAddress} from "../config"
import { Contract, Signer } from "ethers";
import { formatEther, parseEther } from "ethers/lib/utils";
describe("Token contract", function () {

    let Token;
    let hardhatToken : Contract;
    let owner : Signer;
    let addr1 : Signer;
    let addr2 : Signer;
    const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";


    beforeEach(async function () {
        
        Token = await ethers.getContractFactory("StakingToken");
        [owner, addr1, addr2] = await ethers.getSigners();
        
        hardhatToken = await Token.deploy(stakeTotalsupply, stakeAddress, rewardAddress);
      });

      

        describe("Getters check", function() {
        it("add, remove, is", async function() {
            expect(await hardhatToken.isStakeholder(addr1)).to.equal(false);
            await hardhatToken.addStakeholder(addr1.getAddress());
            expect(await hardhatToken.isStakeholder(addr1)).to.equal(true);
            await hardhatToken.removeStakeholder(addr1.getAddress());
            expect(await hardhatToken.isStakeholder(addr1)).to.equal(false);


            


        });
    });
});