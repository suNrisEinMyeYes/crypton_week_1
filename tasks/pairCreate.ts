import { task } from "hardhat/config";
import * as dotenv from "dotenv";
import { contractAddress, factoryAdress } from "../config"

dotenv.config();

task("pair", "pair your and another tkn")
    .addParam("addr", "The account's address you want to pair with")
    .setAction(async (taskArgs, hre) => {
      const provider = new hre.ethers.providers.JsonRpcProvider(process.env.API_URL) 
      const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY !== undefined ? process.env.PRIVATE_KEY : [], provider)
      const myContract = await hre.ethers.getContractAt('IUniswapV2Factory', factoryAdress, signer)

      const out = await myContract.createPair(contractAddress, taskArgs.addr);
      console.log(out)
    });