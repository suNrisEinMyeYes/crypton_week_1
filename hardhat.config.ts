/**
 * @type import('hardhat/config').HardhatUserConfig
 */
import { task } from "hardhat/config";
import * as dotenv from "dotenv";
import "solidity-coverage";
import "hardhat-gas-reporter"
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import '@typechain/hardhat';

dotenv.config();
const contractAddress = "0x6d104F4Da361010c47d75953aCD4B06C96CE4170";
task("transfer", "Transfer to address")
    .addParam("to", "The account's address")
    .addParam("sum", "Tokens to transfer")
    .setAction(async (taskArgs, hre) => {
      const provider = new hre.ethers.providers.JsonRpcProvider(process.env.API_URL) 
      const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY !== undefined ? process.env.PRIVATE_KEY : [], provider)

      const myContract = await hre.ethers.getContractAt('ERC20', contractAddress, signer)
      const out = await myContract.transfer(taskArgs.to, taskArgs.sum);
      console.log(out)
    });

    task("approve", "approve tokens to address")
    .addParam("to", "The account's address")
    .addParam("sum", "Tokens to approve")
    .setAction(async (taskArgs, hre) => {
      const provider = new hre.ethers.providers.JsonRpcProvider(process.env.API_URL) 
      const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY !== undefined ? process.env.PRIVATE_KEY : [], provider)

      const myContract = await hre.ethers.getContractAt('ERC20', contractAddress, signer)
      const out = await myContract.approve(taskArgs.to, taskArgs.sum);
      console.log(out)
    });

    task("balance", "balance of addr")
    .addParam("addr", "The account's address")
    .setAction(async (taskArgs, hre) => {
      const provider = new hre.ethers.providers.JsonRpcProvider(process.env.API_URL) 
      const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY !== undefined ? process.env.PRIVATE_KEY : [], provider)
      const myContract = await hre.ethers.getContractAt('ERC20', contractAddress, signer)
      const out = await myContract.balanceOf(taskArgs.addr);
      console.log(out)
    });

export default {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: process.env.API_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
  },
};