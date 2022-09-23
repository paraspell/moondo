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

let chains = require("../config/local.json");

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
const auroraChain = chains.find(
  (chain: any) => chain.name === "Aurora",
) as any;
const binanceChain = chains.find(
  (chain: any) => chain.name === "Binance",
) as any;

if (!moonbeamChain || !avalancheChain || !ethereumChain || !fantomChain || !polygonChain || !auroraChain || !binanceChain ) process.exit(0);

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

const auroraProvider = getDefaultProvider(auroraChain.rpc);
const auroraConnectedWallet = wallet.connect(auroraProvider);

const binanceProvider = getDefaultProvider(binanceChain.rpc);
const binanceConnectedWallet = wallet.connect(binanceProvider);

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
const srcGatewayContractAurora = new Contract(
  auroraChain.gateway,
  AxelarGatewayContract.abi,      
  auroraConnectedWallet,
);
const srcGatewayContractBinance = new Contract(
  binanceChain.gateway,
  AxelarGatewayContract.abi,
  binanceConnectedWallet,
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
const destGatewayContractAurora = new Contract(
  auroraChain.gateway,
  AxelarGatewayContract.abi,
  auroraConnectedWallet,
);
const destGatewayContractBinance = new Contract(
  binanceChain.gateway,
  AxelarGatewayContract.abi,
  binanceConnectedWallet,
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
const sourceContractAurora = new Contract(
  auroraChain.messageSender as string,
  MessageSenderContract.abi,
  auroraConnectedWallet,
);

const sourceContractBinance = new Contract(
  binanceChain.messageSender as string,
  MessageSenderContract.abi,
  binanceConnectedWallet,
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
const destContractAurora = new Contract(
  auroraChain.messageReceiver as string,
  MessageReceiverContract.abi,
  auroraConnectedWallet,
);

const destContractBinance = new Contract(
  binanceChain.messageReceiver as string,
  MessageReceiverContract.abi,
  binanceConnectedWallet,
);

//______________________________________________


export function generateRecipientAddress(): string {
  return ethers.Wallet.createRandom().address;
}

export async function sendTokenToDestChain(
  amount: string,
  recipientAddress: string[],
  originChain: string,
  destinationChain: string,
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
  else if(originChain == "Aurora")
    tokenAddress = await srcGatewayContractAurora.tokenAddresses("aUSDC");
  else if(originChain == "Binance")
    tokenAddress = await srcGatewayContractBinance.tokenAddresses("aUSDC");

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
  if(originChain == "Aurora"){
      erc20 = new Contract(
        tokenAddress,
        IERC20.abi,
        auroraConnectedWallet,
      );
  }
  if(originChain == "Binance"){
      erc20 = new Contract(
        tokenAddress,
        IERC20.abi,
        binanceConnectedWallet,
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
  else if(originChain == "Aurora"){
    await erc20
      .approve(sourceContractAurora.address, ethers.utils.parseUnits(amount, 6))
      .then((tx: any) => tx.wait());
  }
  else if(originChain == "Binance"){
    await erc20
      .approve(sourceContractBinance.address, ethers.utils.parseUnits(amount, 6))
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
  else if(originChain == "Aurora"){
    currency = GasToken.GLMR
    senderChain = EvmChain.AURORA
  }
  else if(originChain == "Binance"){
    currency = GasToken.MATIC
    senderChain = EvmChain.BINANCE
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
  else if(destinationChain == "Aurora"){
    destChain = EvmChain.AURORA
  }
  else if(destinationChain == "Binance"){
    destChain = EvmChain.BINANCE
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
  else if(originChain == "Aurora"){
    contractS = sourceContractAurora
  }

  else if(originChain == "Binance"){
    contractS = sourceContractBinance
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
  else if(destinationChain == "Aurora"){
    receipt = await contractS
    .sendToMany(
      destinationChain,
      destContractAurora.address,
      recipientAddress,
      "aUSDC",
      ethers.utils.parseUnits(amount, 6),
      {
        value: BigInt(isTestnet ? gasFee : 3000000),
      },
    )
    .then((tx: any) => tx.wait());
  }
  else if(destinationChain == "Binance"){
    receipt = await contractS
    .sendToMany(
      destinationChain,
      destContractBinance.address,
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
  //onSent(receipt.transactionHash);


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
  else if(destinationChain == "Aurora"){
    contractD = destContractAurora
  }

  else if(destinationChain == "Binance"){
    contractD = destContractBinance
  }
  // Wait destination contract to execute the transaction.
  return new Promise((resolve, reject) => {

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
  else if(isSource == "AuroraSRC"){
    contract = srcGatewayContractAurora
  }
  else if(isSource == "AuroraDES"){
    contract = destGatewayContractAurora
  }
  else if(isSource == "BinanceSRC"){
    contract = srcGatewayContractBinance
  }
  else if(isSource == "BinanceDES"){
    contract = destGatewayContractBinance
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
  if(isSource == "AuroraSRC" || isSource == "AuroraDES"){
    connectedWallet = auroraConnectedWallet
  }
  if(isSource == "BinanceSRC" || isSource == "BinanceDES"){
    connectedWallet = binanceConnectedWallet
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

export async function sendTokenToDestChainFromOwnACC(
  amount: string,
  recipientAddress: string[],
  originChain: string,
  destinationChain: string,
  originAcc: string,
) {

  const moonbeamConnectedWallet2 = (moonbeamProvider as providers.Web3Provider).getSigner(originAcc)

  const avalancheConnectedWallet2 = (avalancheProvider as providers.Web3Provider).getSigner(originAcc)

  const ethereumConnectedWallet2 = (ethereumProvider as providers.Web3Provider).getSigner(originAcc)

  const fantomConnectedWallet2 = (fantomProvider as providers.Web3Provider).getSigner(originAcc)

  const polygonConnectedWallet2 = (polygonProvider as providers.Web3Provider).getSigner(originAcc)

  console.log(moonbeamConnectedWallet2,avalancheConnectedWallet2,ethereumConnectedWallet2,fantomConnectedWallet2,polygonConnectedWallet2)
  //______________________________________
  const srcGatewayContractAvalanche2 = new Contract(
    avalancheChain.gateway,
    AxelarGatewayContract.abi,
    avalancheConnectedWallet2,
  );
  const srcGatewayContractEthereum2 = new Contract(
    ethereumChain.gateway,
    AxelarGatewayContract.abi,      
    ethereumConnectedWallet2,
  );
  const srcGatewayContractPolygon2 = new Contract(
    polygonChain.gateway,
    AxelarGatewayContract.abi,
    polygonConnectedWallet2,
  );
  const srcGatewayContractFantom2 = new Contract(
    fantomChain.gateway,
    AxelarGatewayContract.abi,
    fantomConnectedWallet2,
  );
  const srcGatewayContractMoonbeam2 = new Contract(
    moonbeamChain.gateway,
    AxelarGatewayContract.abi,
    moonbeamConnectedWallet2,
  );
  //________________________________________

  //__________________________________________
  const sourceContractAvalanche2 = new Contract(
    avalancheChain.messageSender as string,
    MessageSenderContract.abi,
    avalancheConnectedWallet2,
  );

  const sourceContractEthereum2 = new Contract(
    ethereumChain.messageSender as string,
    MessageSenderContract.abi,
    ethereumConnectedWallet2,
  );

  const sourceContractPolygon2 = new Contract(
    polygonChain.messageSender as string,
    MessageSenderContract.abi,
    polygonConnectedWallet2,
  );

  const sourceContractFantom2 = new Contract(
    fantomChain.messageSender as string,
    MessageSenderContract.abi,
    fantomConnectedWallet2,
  );

  const sourceContractMoonbeam2 = new Contract(
    moonbeamChain.messageSender as string,
    MessageSenderContract.abi,
    moonbeamConnectedWallet2,
  );

  //__________________________________________

  //__________________________________________
  const destContractAvalanche2 = new Contract(
    avalancheChain.messageReceiver as string,
    MessageReceiverContract.abi,
    avalancheConnectedWallet2,
  );

  const destContractEthereum2 = new Contract(
    ethereumChain.messageReceiver as string,
    MessageReceiverContract.abi,
    ethereumConnectedWallet2,
  );

  const destContractPolygon2 = new Contract(
    polygonChain.messageReceiver as string,
    MessageReceiverContract.abi,
    polygonConnectedWallet2,
  );

  const destContractFantom2 = new Contract(
    fantomChain.messageReceiver as string,
    MessageReceiverContract.abi,
    fantomConnectedWallet2,
  );

  const destContractMoonbeam2 = new Contract(
    moonbeamChain.messageReceiver as string,
    MessageReceiverContract.abi,
    moonbeamConnectedWallet2,
  );

  //______________________________________________
  var tokenAddress: any
  if(originChain == "Moonbeam")
    tokenAddress = await srcGatewayContractMoonbeam2.tokenAddresses("aUSDC");
  else if(originChain == "Avalanche")
    tokenAddress = await srcGatewayContractAvalanche2.tokenAddresses("aUSDC");
  else if(originChain == "Ethereum")
    tokenAddress = await srcGatewayContractEthereum2.tokenAddresses("aUSDC");
  else if(originChain == "Fantom")
    tokenAddress = await srcGatewayContractFantom2.tokenAddresses("aUSDC");
  else if(originChain == "Polygon")
    tokenAddress = await srcGatewayContractPolygon2.tokenAddresses("aUSDC");

  var erc20: any
  if(originChain == "Avalanche"){
    erc20 = new Contract(
      tokenAddress,
      IERC20.abi,
      avalancheConnectedWallet2,
    );
  }
  if(originChain == "Moonbeam"){
    erc20 = new Contract(
      tokenAddress,
      IERC20.abi,
      moonbeamConnectedWallet2,
    );
  }
  if(originChain == "Polygon"){
    erc20 = new Contract(
      tokenAddress,
      IERC20.abi,
      polygonConnectedWallet2,
    );
  }
  if(originChain == "Fantom"){
    erc20 = new Contract(
      tokenAddress,
      IERC20.abi,
      fantomConnectedWallet2,
    );
  }
  if(originChain == "Ethereum"){
    erc20 = new Contract(
      tokenAddress,
      IERC20.abi,
      ethereumConnectedWallet2,
    );
  }
  if(originChain == "Moonbeam"){
    await erc20
      .approve(sourceContractMoonbeam2.address, ethers.utils.parseUnits(amount, 6))
      .then((tx: any) => tx.wait());
  }

  else if(originChain == "Ethereum"){
    await erc20
      .approve(sourceContractEthereum2.address, ethers.utils.parseUnits(amount, 6))
      .then((tx: any) => tx.wait());
  }

  else if(originChain == "Avalanche"){
    await erc20
      .approve(sourceContractAvalanche2.address, ethers.utils.parseUnits(amount, 6))
      .then((tx: any) => tx.wait());
  }

  else if(originChain == "Polygon"){
    await erc20
      .approve(sourceContractPolygon2.address, ethers.utils.parseUnits(amount, 6))
      .then((tx: any) => tx.wait());
  }

  else if(originChain == "Fantom"){
    await erc20
      .approve(sourceContractFantom2.address, ethers.utils.parseUnits(amount, 6))
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
    contractS = sourceContractMoonbeam2
  }

  else if(originChain == "Ethereum"){
    contractS = sourceContractEthereum2
  }

  else if(originChain == "Avalanche"){
    contractS = sourceContractAvalanche2
  }

  else if(originChain == "Polygon"){
    contractS = sourceContractPolygon2
  }

  else if(originChain == "Fantom"){
    contractS = sourceContractFantom2
  }


  if(destinationChain == "Moonbeam"){
    receipt = await contractS
    .sendToMany(
      destinationChain,
      destContractMoonbeam2.address,
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
      destContractAvalanche2.address,
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
      destContractPolygon2.address,
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
      destContractEthereum2.address,
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
      destContractFantom2.address,
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
  //onSent(receipt.transactionHash);

  
  var contractD: any
  if(destinationChain == "Moonbeam"){
    contractD = destContractMoonbeam2
  }

  else if(destinationChain == "Ethereum"){
    contractD = destContractEthereum2
  }

  else if(destinationChain == "Avalanche"){
    contractD = destContractAvalanche2
  }

  else if(destinationChain == "Polygon"){
    contractD = destContractPolygon2
  }

  else if(destinationChain == "Fantom"){
    contractD = destContractFantom2
  }
  
  // Wait destination contract to execute the transaction.
  return new Promise((resolve, reject) => {

    contractD.on("Executed", () => {
      contractD.removeAllListeners("Executed");
      resolve(null);
    });
  });
}