import { Wallet } from "ethers";


function getWallet() {
  const mnemonic = "decide junk amused creek tag fork thought hundred island refuse found envelope";
  const privateKey = "0x8ff26335325ad2c33d87bf8be4a53f28abaac5cf654a42080bc2b91938b1281d";
  return privateKey ? new Wallet(privateKey) : Wallet.fromMnemonic(mnemonic);
}

export const isTestnet = process.env.NEXT_PUBLIC_ENVIRONMENT === "local";
export const wallet = getWallet();
