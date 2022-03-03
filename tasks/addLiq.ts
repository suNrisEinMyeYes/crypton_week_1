import { task } from "hardhat/config";
import * as dotenv from "dotenv";
import { contractAddress, routerAdress, WETH, amountADesired, amountBDesired, amountAMin, amountBMin, myWallet, deadline} from "../config"

dotenv.config();

task("addLiq", "Add liquidity to pair(check config.ts)")
    .setAction(async (_, hre) => {
      const provider = new hre.ethers.providers.JsonRpcProvider(process.env.API_URL) 
      const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY !== undefined ? process.env.PRIVATE_KEY : [], provider)
      const myContract = await hre.ethers.getContractAt('IUniswapV2Router02', routerAdress, signer)

      const out = await myContract.addLiquidityETH(contractAddress, amountBDesired, amountBMin, amountAMin, myWallet, deadline);
      console.log(out)
    });