import { task } from "hardhat/config";
import * as dotenv from "dotenv";
import { contractAddress, routerAdress, WETH, amountADesired, amountBDesired, amountAMin, amountBMin, myWallet, deadline} from "../config"
import { parseEther } from "ethers/lib/utils";

dotenv.config();

task("addLiq", "Add liquidity to pair(check config.ts)")
    .setAction(async (_, hre) => {
      const provider = new hre.ethers.providers.JsonRpcProvider(process.env.API_URL_KOVAN) 
      const signer = new hre.ethers.Wallet(process.env.PRIVATE_KEY !== undefined ? process.env.PRIVATE_KEY : [], provider)
      const TKNcontract = await hre.ethers.getContractAt('contracts/erc20.sol:ERC20', contractAddress, signer)
      const app1 = await TKNcontract.approve(routerAdress, parseEther("99999"))

      const myContract = await hre.ethers.getContractAt('IUniswapV2Router02', routerAdress, signer)

      const out = await myContract.addLiquidity(contractAddress, WETH, amountADesired, amountBDesired,amountAMin, amountBMin, myWallet, Date.now() + 200);
      console.log(out)
    });