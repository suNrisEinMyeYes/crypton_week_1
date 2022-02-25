import { ethers } from "hardhat";
import {tName, tSymbol, tDec} from "../config"

async function main() {
  
  const Greeter = await ethers.getContractFactory("ERC20");
  const greeter = await Greeter.deploy(tName, tSymbol, tDec);

  await greeter.deployed();

  console.log("Contract deployed to:", greeter.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
