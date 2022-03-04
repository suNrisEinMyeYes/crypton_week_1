/**
 * @type import('hardhat/config').HardhatUserConfig
 */
import * as dotenv from "dotenv";
import "solidity-coverage";
import "hardhat-gas-reporter"
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import '@typechain/hardhat';
import "hardhat-contract-sizer"
import "./tasks/approve"
import "./tasks/balanceOf"
import "./tasks/transfer"
import "./tasks/pairCreate"
import "./tasks/addLiq"

dotenv.config();

export default {
  solidity: "0.8.4",
  contractSizer:{
    alphaSort : true,
    runOnCompile : true,
    strict : true,
    only:[':ERC20$']
  },
  networks: {
    rinkeby: {
      url: process.env.API_URL !== undefined ? process.env.API_URL : "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    },
    kovan: {
      url: process.env.API_URL_KOVAN !== undefined ? process.env.API_URL_KOVAN : "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : []
    },
  },
};