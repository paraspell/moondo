import { createAndExport } from "@axelar-network/axelar-local-dev";
import { Network } from "@axelar-network/axelar-local-dev/dist/Network";
import { wallet } from "../config/constants";

// deploy network
createAndExport({
  accountsToFund: [wallet.address],
  chains: ["Moonbeam", "Avalanche", "Polygon", "Ethereum", "Fantom","Aurora","Binance"],
  chainOutputPath: "config/local.json",
  async callback(network: Network) {
    await network.deployToken("USDC", "aUSDC", 6, BigInt(100_000_000e6));

    if (network.name === "Avalanche") {
      await network.giveToken(
        wallet.address,
        "aUSDC",
        BigInt("1000000000000"),
      );
    }
    if (network.name === "Moonbeam") {
      await network.giveToken(
        wallet.address,
        "aUSDC",
        BigInt("1000000000000"),
      );
    }
    if (network.name === "Polygon") {
      await network.giveToken(
        wallet.address,
        "aUSDC",
        BigInt("1000000000000"),
      );
    }
    if (network.name === "Ethereum") {
      await network.giveToken(
        wallet.address,
        "aUSDC",
        BigInt("1000000000000"),
      );
    }
    if (network.name === "Fantom") {
      await network.giveToken(
        wallet.address,
        "aUSDC",
        BigInt("1000000000000"),
      );
    }
    if (network.name === "Aurora") {
      await network.giveToken(
        wallet.address,
        "aUSDC",
        BigInt("1000000000000"),
      );
    }
    if (network.name === "Binance") {
      await network.giveToken(
        wallet.address,
        "aUSDC",
        BigInt("1000000000000"),
      );
    }
  },
});
