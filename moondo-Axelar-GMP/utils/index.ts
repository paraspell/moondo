import { Contract, ethers, getDefaultProvider, providers } from "ethers";
import {
  AxelarQueryAPI,
  Environment,
  EvmChain,
  GasToken,
} from "@axelar-network/axelarjs-sdk";

import AxelarGatewayContract from "../artifacts/@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol/IAxelarGateway.json";
import MessageSenderContract from "../artifacts/contracts/MessageSender.sol/MessageSender.json";
import MessageReceiverContract from "../artifacts/contracts/MessageReceiver.sol/MessageReceiver.json";
import IERC20 from "../artifacts/@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IERC20.sol/IERC20.json";
import { isTestnet, wallet } from "../config/constants";

let chains = isTestnet
  ? require("../config/testnet.json")
  : require("../config/local.json");

const moonbeamChain = chains.find(
  (chain: any) => chain.name === "Moonbeam",
) as any;
const avalancheChain = chains.find(
  (chain: any) => chain.name === "Avalanche",
) as any;
const ethereumChain = chains.find(
  (chain: any) => chain.name === "Ethereum",
) as any;
const fantomChain = chains.find(
  (chain: any) => chain.name === "Fantom",
) as any;
const polygonChain = chains.find(
  (chain: any) => chain.name === "Polygon",
) as any;

if (!moonbeamChain || !avalancheChain || !ethereumChain || !fantomChain || !polygonChain ) process.exit(0);

const useMetamask = false; // typeof window === 'object';

const moonbeamProvider = useMetamask
  ? new providers.Web3Provider((window as any).ethereum)
  : getDefaultProvider(moonbeamChain.rpc);
const moonbeamConnectedWallet = useMetamask
  ? (moonbeamProvider as providers.Web3Provider).getSigner()
  : wallet.connect(moonbeamProvider);
const avalancheProvider = getDefaultProvider(avalancheChain.rpc);
const avalancheConnectedWallet = wallet.connect(avalancheProvider);
const ethereumProvider = getDefaultProvider(ethereumChain.rpc);
const ethereumConnectedWallet = wallet.connect(ethereumProvider);
const fantomProvider = getDefaultProvider(fantomChain.rpc);
const fantomConnectedWallet = wallet.connect(fantomProvider);
const polygonProvider = getDefaultProvider(polygonChain.rpc);
const polygonConnectedWallet = wallet.connect(polygonProvider);

//______________________________________
const srcGatewayContractAvalanche = new Contract(
  avalancheChain.gateway,
  AxelarGatewayContract.abi,
  avalancheConnectedWallet,
);
const srcGatewayContractEthereum = new Contract(
  ethereumChain.gateway,
  AxelarGatewayContract.abi,      
  ethereumConnectedWallet,
);
const srcGatewayContractPolygon = new Contract(
  polygonChain.gateway,
  AxelarGatewayContract.abi,
  polygonConnectedWallet,
);
const srcGatewayContractFantom = new Contract(
  fantomChain.gateway,
  AxelarGatewayContract.abi,
  fantomConnectedWallet,
);
const srcGatewayContractMoonbeam = new Contract(
  moonbeamChain.gateway,
  AxelarGatewayContract.abi,
  moonbeamConnectedWallet,
);
//________________________________________

//_________________________________________
const destGatewayContractAvalanche = new Contract(
  avalancheChain.gateway,
  AxelarGatewayContract.abi,
  avalancheConnectedWallet,
);
const destGatewayContractEthereum = new Contract(
  ethereumChain.gateway,
  AxelarGatewayContract.abi,
  ethereumConnectedWallet,
);
const destGatewayContractPolygon = new Contract(
  polygonChain.gateway,
  AxelarGatewayContract.abi,
  polygonConnectedWallet,
);
const destGatewayContractFantom = new Contract(
  fantomChain.gateway,
  AxelarGatewayContract.abi,
  fantomConnectedWallet,
);
const destGatewayContractMoonbeam = new Contract(
  moonbeamChain.gateway,
  AxelarGatewayContract.abi,
  moonbeamConnectedWallet,
);

//_________________________________________

//__________________________________________
const sourceContractAvalanche = new Contract(
  avalancheChain.messageSender as string,
  MessageSenderContract.abi,
  avalancheConnectedWallet,
);

const sourceContractEthereum = new Contract(
  ethereumChain.messageSender as string,
  MessageSenderContract.abi,
  ethereumConnectedWallet,
);

const sourceContractPolygon = new Contract(
  polygonChain.messageSender as string,
  MessageSenderContract.abi,
  polygonConnectedWallet,
);

const sourceContractFantom = new Contract(
  fantomChain.messageSender as string,
  MessageSenderContract.abi,
  fantomConnectedWallet,
);

const sourceContractMoonbeam = new Contract(
  moonbeamChain.messageSender as string,
  MessageSenderContract.abi,
  moonbeamConnectedWallet,
);

//__________________________________________

//__________________________________________
const destContractAvalanche = new Contract(
  avalancheChain.messageReceiver as string,
  MessageReceiverContract.abi,
  avalancheConnectedWallet,
);

const destContractEthereum = new Contract(
  ethereumChain.messageReceiver as string,
  MessageReceiverContract.abi,
  ethereumConnectedWallet,
);

const destContractPolygon = new Contract(
  polygonChain.messageReceiver as string,
  MessageReceiverContract.abi,
  polygonConnectedWallet,
);

const destContractFantom = new Contract(
  fantomChain.messageReceiver as string,
  MessageReceiverContract.abi,
  fantomConnectedWallet,
);

const destContractMoonbeam = new Contract(
  moonbeamChain.messageReceiver as string,
  MessageReceiverContract.abi,
  moonbeamConnectedWallet,
);

//______________________________________________


export function generateRecipientAddress(): string {
  return ethers.Wallet.createRandom().address;
}

export async function sendTokenToDestChain(
  amount: string,
  recipientAddress: string,
  originChain: string,
  destinationChain: string,
  onSent: (txhash: string) => void,
) {

  // Get token address from the gateway contract
  var tokenAddress: any
  if(originChain == "Moonbeam")
    tokenAddress = await srcGatewayContractMoonbeam.tokenAddresses("aUSDC");
  else if(originChain == "Avalanche")
    tokenAddress = await srcGatewayContractAvalanche.tokenAddresses("aUSDC");
  else if(originChain == "Ethereum")
    tokenAddress = await srcGatewayContractEthereum.tokenAddresses("aUSDC");
  else if(originChain == "Fantom")
    tokenAddress = await srcGatewayContractFantom.tokenAddresses("aUSDC");
  else if(originChain == "Polygon")
    tokenAddress = await srcGatewayContractPolygon.tokenAddresses("aUSDC");

  var erc20: any
  if(originChain == "Avalanche"){
    erc20 = new Contract(
      tokenAddress,
      IERC20.abi,
      avalancheConnectedWallet,
    );
  }
  if(originChain == "Moonbeam"){
    erc20 = new Contract(
      tokenAddress,
      IERC20.abi,
      moonbeamConnectedWallet,
    );
  }
  if(originChain == "Polygon"){
    erc20 = new Contract(
      tokenAddress,
      IERC20.abi,
      polygonConnectedWallet,
    );
  }
  if(originChain == "Fantom"){
    erc20 = new Contract(
      tokenAddress,
      IERC20.abi,
      fantomConnectedWallet,
    );
  }
  if(originChain == "Ethereum"){
    erc20 = new Contract(
      tokenAddress,
      IERC20.abi,
      ethereumConnectedWallet,
    );
  }

  // Approve the token for the amount to be sent
  if(originChain == "Moonbeam"){
    await erc20
      .approve(sourceContractMoonbeam.address, ethers.utils.parseUnits(amount, 6))
      .then((tx: any) => tx.wait());
  }

  else if(originChain == "Ethereum"){
    await erc20
      .approve(sourceContractEthereum.address, ethers.utils.parseUnits(amount, 6))
      .then((tx: any) => tx.wait());
  }

  else if(originChain == "Avalanche"){
    await erc20
      .approve(sourceContractAvalanche.address, ethers.utils.parseUnits(amount, 6))
      .then((tx: any) => tx.wait());
  }

  else if(originChain == "Polygon"){
    await erc20
      .approve(sourceContractPolygon.address, ethers.utils.parseUnits(amount, 6))
      .then((tx: any) => tx.wait());
  }

  else if(originChain == "Fantom"){
    await erc20
      .approve(sourceContractFantom.address, ethers.utils.parseUnits(amount, 6))
      .then((tx: any) => tx.wait());
  }

  const api = new AxelarQueryAPI({ environment: Environment.TESTNET });

  
  //select sender && destination for fee calculation etc
  var currency: any
  var senderChain: any

  if(originChain == "Ethereum"){
    currency = GasToken.ETH
    senderChain = EvmChain.ETHEREUM
  }
  else if(originChain == "Avalanche"){
    currency = GasToken.AVAX
    senderChain = EvmChain.AVALANCHE
  }
  else if(originChain == "Fantom"){
    currency = GasToken.FTM
    senderChain = EvmChain.FANTOM
  }
  else if(originChain == "Moonbeam"){
    currency = GasToken.GLMR
    senderChain = EvmChain.MOONBEAM
  }
  else if(originChain == "Polygon"){
    currency = GasToken.MATIC
    senderChain = EvmChain.POLYGON
  }

  var destChain: any
  if(destinationChain == "Ethereum"){
    destChain = EvmChain.ETHEREUM
  }
  else if(destinationChain == "Avalanche"){
    destChain = EvmChain.AVALANCHE
  }
  else if(destinationChain == "Moonbeam"){
    destChain = EvmChain.MOONBEAM
  }
  else if(destinationChain == "Fantom"){
    destChain = EvmChain.FANTOM
  }
  else if(destinationChain == "Polygon"){
    destChain = EvmChain.POLYGON
  }

  const gasFee = await api.estimateGasFee(
    senderChain,
    destChain,
    currency,
  );

  // Send the token
  var receipt: any
  var contractS: any
  if(originChain == "Moonbeam"){
    contractS = sourceContractMoonbeam
  }

  else if(originChain == "Ethereum"){
    contractS = sourceContractEthereum
  }

  else if(originChain == "Avalanche"){
    contractS = sourceContractAvalanche
  }

  else if(originChain == "Polygon"){
    contractS = sourceContractPolygon
  }

  else if(originChain == "Fantom"){
    contractS = sourceContractFantom
  }


  if(destinationChain == "Moonbeam"){
    receipt = await contractS
    .sendToMany(
      destinationChain,
      destContractMoonbeam.address,
      recipientAddress,
      "aUSDC",
      ethers.utils.parseUnits(amount, 6),
      {
        value: BigInt(isTestnet ? gasFee : 3000000),
      },
    )
    .then((tx: any) => tx.wait());
  }
  else if(destinationChain == "Avalanche"){
    receipt = await contractS
    .sendToMany(
      destinationChain,
      destContractAvalanche.address,
      recipientAddress,
      "aUSDC",
      ethers.utils.parseUnits(amount, 6),
      {
        value: BigInt(isTestnet ? gasFee : 3000000),
      },
    )
    .then((tx: any) => tx.wait());
  }
  else if(destinationChain == "Polygon"){
    receipt = await contractS
    .sendToMany(
      destinationChain,
      destContractPolygon.address,
      recipientAddress,
      "aUSDC",
      ethers.utils.parseUnits(amount, 6),
      {
        value: BigInt(isTestnet ? gasFee : 3000000),
      },
    )
    .then((tx: any) => tx.wait());
  }
  else if(destinationChain == "Ethereum"){
    receipt = await contractS
    .sendToMany(
      destinationChain,
      destContractEthereum.address,
      recipientAddress,
      "aUSDC",
      ethers.utils.parseUnits(amount, 6),
      {
        value: BigInt(isTestnet ? gasFee : 3000000),
      },
    )
    .then((tx: any) => tx.wait());
  }
  else if(destinationChain == "Fantom"){
    receipt = await contractS
    .sendToMany(
      destinationChain,
      destContractFantom.address,
      recipientAddress,
      "aUSDC",
      ethers.utils.parseUnits(amount, 6),
      {
        value: BigInt(isTestnet ? gasFee : 3000000),
      },
    )
    .then((tx: any) => tx.wait());
  }

  console.log({
    txHash: receipt.transactionHash,
  });
  onSent(receipt.transactionHash);


  var contractD: any
  if(destinationChain == "Moonbeam"){
    contractD = destContractMoonbeam
  }

  else if(destinationChain == "Ethereum"){
    contractD = destContractEthereum
  }

  else if(destinationChain == "Avalanche"){
    contractD = destContractAvalanche
  }

  else if(destinationChain == "Polygon"){
    contractD = destContractPolygon
  }

  else if(destinationChain == "Fantom"){
    contractD = destContractFantom
  }
  // Wait destination contract to execute the transaction.
  return new Promise((resolve, reject) => {

    //REPLACE THIS
    contractD.on("Executed", () => {
      contractD.removeAllListeners("Executed");
      resolve(null);
    });
  });
}

export function truncatedAddress(address: string): string {
  return (
    address.substring(0, 6) + "..." + address.substring(address.length - 4)
  );
}

export async function getBalance(addresses: string[], isSource: string) {

  var contract: any

  if(isSource == "MoonbeamSRC"){
    contract = srcGatewayContractMoonbeam
  }
  else if(isSource == "MoonbeamDES"){
    contract = destGatewayContractMoonbeam
  }
  else if(isSource == "AvalancheSRC"){
    contract = srcGatewayContractAvalanche
  }
  else if(isSource == "AvalancheDES"){
    contract = destGatewayContractAvalanche
  }
  else if(isSource == "PolygonSRC"){
    contract = srcGatewayContractPolygon
  }
  else if(isSource == "PolygonDES"){
    contract = destGatewayContractPolygon
  }
  else if(isSource == "EthereumSRC"){
    contract = srcGatewayContractEthereum
  }
  else if(isSource == "EthereumDES"){
    contract = destGatewayContractEthereum
  }
  else if(isSource == "FantomSRC"){
    contract = srcGatewayContractFantom
  }
  else if(isSource == "FantomDES"){
    contract = destGatewayContractFantom
  }

  var connectedWallet: any
  if(isSource == "MoonbeamSRC" || isSource == "MoonbeamDES"){
    connectedWallet = moonbeamConnectedWallet
  }
  if(isSource == "AvalancheSRC" || isSource == "AvalancheDES"){
    connectedWallet = avalancheConnectedWallet
  }
  if(isSource == "PolygonSRC" || isSource == "PolygonDES"){
    connectedWallet = polygonConnectedWallet
  }
  if(isSource == "EthereumSRC" || isSource == "EthereumDES"){
    connectedWallet = ethereumConnectedWallet
  }
  if(isSource == "FantomSRC" || isSource == "FantomDES"){
    connectedWallet = fantomConnectedWallet
  }

  const tokenAddress = await contract.tokenAddresses("aUSDC");
  const erc20 = new Contract(tokenAddress, IERC20.abi, connectedWallet);
  const balances = await Promise.all(
    addresses.map(async (address) => {
      const balance = await erc20.balanceOf(address);
      return ethers.utils.formatUnits(balance, 6);
    }),
  );
  return balances;
}
