import {ethers} from "hardhat"
import {expect, assert} from "chai"
import {ERC20} from "../typechain-types"
import { Contract, Signer } from "ethers";
describe("Token contract", function () {

    let Token;
    let hardhatToken : Contract;
    let owner : Signer;
    let addr1 : Signer;
    let addr2 : Signer;
    



    beforeEach(async function () {
        // Get the ContractFactory and Signers here.
        Token = await ethers.getContractFactory("ERC20");
        [owner, addr1, addr2] = await ethers.getSigners();
    
        // To deploy our contract, we just have to call Token.deploy() and await
        // for it to be deployed(), which happens once its transaction has been
        // mined.
        hardhatToken = await Token.deploy("Sushi", "TKN");
      });

      describe("Deployment", function () {
        // `it` is another Mocha function. This is the one you use to define your
        // tests. It receives the test name, and a callback function.
    
        // If the callback function is async, Mocha will `await` it.
        it("Should get right name and symbol", async function () {
          // Expect receives a value, and wraps it in an Assertion object. These
          // objects have a lot of utility methods to assert values.
    
          // This test expects the owner variable stored in the contract to be equal
          // to our Signer's owner.
          expect(await hardhatToken.name()).to.equal("Sushi");
          expect(await hardhatToken.symbol()).to.equal("TKN");
          expect(await hardhatToken.decimals()).to.equal(18);

        });
      });

        describe("Should mint tokens to address, check supply and check balance and finally burn half", function() {
        it("Mint tokens and check suuply, balance, after burn half", async function() {
        // Transfer 50 tokens from owner to addr1
            await hardhatToken._mint(addr1.getAddress(), 50);
            expect(await hardhatToken.totalSupply()).to.equal(50);
            expect(await hardhatToken.balanceOf(addr1.getAddress())).to.equal(50);
            await hardhatToken._burn(addr1.getAddress(), 25);
            expect(await hardhatToken.totalSupply()).to.equal(25);
            expect(await hardhatToken.balanceOf(addr1.getAddress())).to.equal(25);
            


        });

        describe("All transfers check", function() {
            it("Transfer func", async function() {
            // Transfer 50 tokens from owner to addr1
                await hardhatToken._mint(addr1.getAddress(), 50);
                await hardhatToken.connect(addr1).transfer(addr2.getAddress(), 10)
                expect(await hardhatToken.totalSupply()).to.equal(50);
                expect(await hardhatToken.balanceOf(addr2.getAddress())).to.equal(10);
                
                expect(await hardhatToken.balanceOf(addr1.getAddress())).to.equal(40);
                
            });
            it("TransferFrom func", async function() {
                // Transfer 50 tokens from owner to addr1
                    await hardhatToken._mint(addr1.getAddress(), 50);
                    await hardhatToken.connect(addr1).approve(addr2.getAddress(), 10);
                    await hardhatToken.transferFrom(addr1.getAddress(), addr2.getAddress(), 10)
                    expect(await hardhatToken.totalSupply()).to.equal(50);
                    expect(await hardhatToken.balanceOf(addr2.getAddress())).to.equal(10);
                    
                    expect(await hardhatToken.balanceOf(addr1.getAddress())).to.equal(40);
                    
                });
    
        });

        describe("Allowence check", function() {
            it("approve check", async function() {
                // Transfer 50 tokens from owner to addr1
                await hardhatToken._mint(addr1.getAddress(), 50);
                expect(await hardhatToken.totalSupply()).to.equal(50);
                expect(await hardhatToken.balanceOf(addr1.getAddress())).to.equal(50);
                await hardhatToken.connect(addr1).approve(addr2.getAddress(), 5);
                expect(await hardhatToken.allowance(addr1.getAddress(), addr2.getAddress())).to.equal(5);
                
            });
            it("Increase Decrease check", async function() {
                // Transfer 50 tokens from owner to addr1
                await hardhatToken._mint(addr1.getAddress(), 50);
                expect(await hardhatToken.totalSupply()).to.equal(50);
                expect(await hardhatToken.balanceOf(addr1.getAddress())).to.equal(50);
                await hardhatToken.connect(addr1).approve(addr2.getAddress(), 5);
                await hardhatToken.connect(addr1).increaseAllowance(addr2.getAddress(), 1);
                expect(await hardhatToken.allowance(addr1.getAddress(), addr2.getAddress())).to.equal(6);
                await hardhatToken.connect(addr1).decreaseAllowance(addr2.getAddress(), 2);
                expect(await hardhatToken.allowance(addr1.getAddress(), addr2.getAddress())).to.equal(4);
            });
        
        
        });


        /*it("Should send tokens to another addr", async function() {
            // Transfer 50 tokens from owner to addr1
            await hardhatToken.sendMoney(addr2.address, ethers.utils.parseUnits("1", "ether"));

            const addr2Balance = await hardhatToken.connect(addr2).balanceOf();
            expect(addr2Balance).to.equal(1);
        });*/
    });

    /*describe("Investors", function() {
        it("Should contain all investors", async function() {
        // Transfer 50 tokens from owner to addr1
            await hardhatToken.invest({value:10});
            a = [owner.getAddress()]
            await hardhatToken.connect(addr1).invest({value:10});
            a.push(addr1.address)
            b = await hardhatToken.showInvestors()
            //console.log(await hardhatToken.showInvestors())
            //console.log(a)
            assert.deepEqual(a,b)
            //expect(await hardhatToken.showInvestors()).to.eventually.include.all.members(a);
        });
        it("Should contain all charity of defined investor", async function() {
            // Transfer 50 tokens from owner to addr1
                await hardhatToken.invest({value:10});
                sum = 10
                await hardhatToken.invest({value:10});
                sum = 20
                await hardhatToken.connect(addr1).invest({value:10});
                
                expect(await hardhatToken.showAllInvestementsByAddress(owner.address)).to.equal(sum);
            });
        
    });*/


});
