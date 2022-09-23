import fs from "fs/promises";
import { getDefaultProvider } from "ethers";
import { isTestnet, wallet } from "../config/constants";

const {
  utils: { deployContract },
} = require("@axelar-network/axelar-local-dev");

// load contracts
const MessageSenderContract = require("../artifacts/contracts/MessageSender.sol/MessageSender.json");
const MessageReceiverContract = require("../artifacts/contracts/MessageReceiver.sol/MessageReceiver.json");

let chains = isTestnet
  ? require("../config/testnet.json")
  : require("../config/local.json");

// get chains
const moonbeamChain = chains.find((chain: any) => chain.name === "Moonbeam");
const polygonChain = chains.find((chain: any) => chain.name === "Polygon");
const ethereumChain = chains.find((chain: any) => chain.name === "Ethereum");
const fantomChain = chains.find((chain: any) => chain.name === "Fantom");
const avalancheChain = chains.find((chain: any) => chain.name === "Avalanche");
const auroraChain = chains.find((chain: any) => chain.name === "Aurora");
const binanceChain = chains.find((chain: any) => chain.name === "Binance");

// deploy script
async function main() {
  /**
   * DEPLOY ON CHAINS
   */
   const chainsFetched = [moonbeamChain, ethereumChain, fantomChain, avalancheChain, polygonChain, auroraChain, binanceChain];
  for(let x=0 ; chainsFetched.length> x; x++)
  {
    const chainProvider = getDefaultProvider(chainsFetched[x].rpc);
    const chainWallet = wallet.connect(chainProvider);
    const sender = await deployContract(
      chainWallet,
      MessageSenderContract,
      [chainsFetched[x].gateway, chainsFetched[x].gasReceiver],
    );
    console.log(`MessageSender deployed on ${chainsFetched[x].name}:`, sender.address);
    chainsFetched[x].messageSender = sender.address;
    const receiver = await deployContract(
      chainWallet,
      MessageReceiverContract,
      [chainsFetched[x].gateway, chainsFetched[x].gasReceiver],
    );
    console.log(
      `MessageReceiver deployed on ${chainsFetched[x].name}:`,
      receiver.address,
    );
    chainsFetched[x].messageReceiver = receiver.address;

    if (isTestnet) {
      await fs.writeFile(
        "config/testnet.json",
        JSON.stringify(chainsFetched, null, 2),
      );
    } else {
      await fs.writeFile(
        "config/local.json",
        JSON.stringify(chainsFetched, null, 2),
      );
    }
  }
}

main();
