import {ethers} from "hardhat"
import {expect} from "chai"
import {tName, tSymbol, tDec} from "../config"
import { Contract, Signer } from "ethers";
describe("Token contract", function () {

    let Token;
    let hardhatToken : Contract;
    let owner : Signer;
    let addr1 : Signer;
    let addr2 : Signer;


    beforeEach(async function () {
        
        Token = await ethers.getContractFactory("ERC20");
        [owner, addr1, addr2] = await ethers.getSigners();
        
        hardhatToken = await Token.deploy(tName, tSymbol, tDec);
      });

      describe("Deployment", function () {
        
        it("Should get right name and symbol", async function () {
         
          expect(await hardhatToken.name()).to.equal(tName);
          expect(await hardhatToken.symbol()).to.equal(tSymbol);
          expect(await hardhatToken.decimals()).to.equal(tDec);

        });
      });

        describe("Should mint tokens to address, check supply and check balance and finally burn half", function() {
        it("Mint tokens and check suuply, balance, after burn half", async function() {
            await expect(hardhatToken._mint(0, 50)).to.be.reverted;
            await hardhatToken._mint(addr1.getAddress(), 50);
            expect(await hardhatToken.totalSupply()).to.equal(50);
            expect(await hardhatToken.balanceOf(addr1.getAddress())).to.equal(50);
            await expect(hardhatToken._burn(0, 50)).to.be.reverted;
            await expect(hardhatToken._burn(addr1.getAddress(), 999)).to.be.reverted;
            await hardhatToken._burn(addr1.getAddress(), 25);
            expect(await hardhatToken.totalSupply()).to.equal(25);
            expect(await hardhatToken.balanceOf(addr1.getAddress())).to.equal(25);
            


        });

        describe("All transfers check", function() {
            it("Transfer func", async function() {
            
                await hardhatToken._mint(addr1.getAddress(), 50);
                //await hardhatToken.connect(ZERO_ADDRESS).transfer(addr1.getAddress(),1);
                await expect(hardhatToken.connect(addr1).transfer("0x0", 1)).to.be.reverted;
                await expect(hardhatToken.connect(addr1).transfer(addr2.getAddress(),999)).to.be.reverted;
                await hardhatToken.connect(addr1).transfer(addr2.getAddress(), 10)
                expect(await hardhatToken.totalSupply()).to.equal(50);
                expect(await hardhatToken.balanceOf(addr2.getAddress())).to.equal(10);
                
                expect(await hardhatToken.balanceOf(addr1.getAddress())).to.equal(40);
                
            });
            it("TransferFrom func", async function() {
                
                    await hardhatToken._mint(addr1.getAddress(), 50);
                    await hardhatToken.connect(addr1).approve(addr2.getAddress(), 10);
                    await expect(hardhatToken.transferFrom(addr1.getAddress(), addr2.getAddress(),999)).to.be.reverted;

                    await hardhatToken.transferFrom(addr1.getAddress(), addr2.getAddress(), 10)
                    expect(await hardhatToken.totalSupply()).to.equal(50);
                    expect(await hardhatToken.balanceOf(addr2.getAddress())).to.equal(10);
                    
                    expect(await hardhatToken.balanceOf(addr1.getAddress())).to.equal(40);
                    
                });
    
        });

        describe("Allowence check", function() {
            it("approve check", async function() {
               
                await hardhatToken._mint(addr1.getAddress(), 50);
                expect(await hardhatToken.totalSupply()).to.equal(50);
                expect(await hardhatToken.balanceOf(addr1.getAddress())).to.equal(50);


                await hardhatToken.connect(addr1).approve(addr2.getAddress(), 10);
                expect(await hardhatToken.allowance(addr1.getAddress(), addr2.getAddress())).to.equal(10);
                await expect(hardhatToken.transferFrom(addr1.getAddress(), addr2.getAddress(), 13)).to.be.reverted;

                
            });
            it("Increase Decrease check", async function() {
            
                await hardhatToken._mint(addr1.getAddress(), 50);
                expect(await hardhatToken.totalSupply()).to.equal(50);
                expect(await hardhatToken.balanceOf(addr1.getAddress())).to.equal(50);
                await hardhatToken.connect(addr1).approve(addr2.getAddress(), 5);
                await hardhatToken.connect(addr1).increaseAllowance(addr2.getAddress(), 1);
                expect(await hardhatToken.allowance(addr1.getAddress(), addr2.getAddress())).to.equal(6);
                await hardhatToken.connect(addr1).decreaseAllowance(addr2.getAddress(), 2);
                expect(await hardhatToken.allowance(addr1.getAddress(), addr2.getAddress())).to.equal(4);
                await expect(hardhatToken.connect(addr1).decreaseAllowance(addr2.getAddress(), 10)).to.be.reverted;
            });
        
        
        });


        
    });


});
