![MoonDoLogo](https://user-images.githubusercontent.com/55763425/188012784-886be693-17f3-495d-be2f-1e19e6496dca.png)


### Moonbeam dedicated UI enhacement of 
- **native XCM transfers**
- **XCM Transactor**
- **Axelar's GMP functionality**

# Moon🌕️Do readme contents
#### [1. Introduction](#1-introduction)<br />
#### [2. Overview](#2-overview)<br />
#### [3. Installation](#3-installation-for-local-use)<br />


# 1. Introduction 🌿
Application is deployed & able to be previewed on following link - [Try out Moon🌕️Do on Heroku](https://moondo.herokuapp.com/)

Moon🌕️Do is XCM enhancement tool built in mind with Moonbeam network. Tool includes UI enhancement of native XCM transfers in three scenarios (Parachain to Parachain, Parachain to Relay chain, Relay chain to Parachain), XCM Transactor that can perform XCM calls or Balance transfers, generating Sovereign account details & Axelar's GMP XCM transfer capability from Moonbeam to other compatible nodes. Moon🌕️Do is designed to save users time not requiring as many details as it would be necessary to execute tasks through Polkadot UI/ Axelar's test UI. All features are designed to be easily found & used right away. 

# 2. Overview 🔎
There are not that many UI XCM Tools focusing on Moonbeam's native XCM transfers, XCM Transactor, Axelar's GMP or Sovereign account generating. Moon🌕️Do focuses on ease of use, being fast, secure & user friendly. User no longer needs to go through a lengthy process to generate a sovereign account manually. They can do it with a few specific details & simple click of a button. Moreover, they can execute XCM or many else calls with XCM Transactor from a different chain with a user-friendly UI. Lastly, user can use Axelar's GMP technology to pass assets between Moonbeam & other supported nodes.

The project allows user to start Application, that can right out of the box generate sovereign account addresses for cross-chain transfers to/from the Relay chain. User can also create XCM Transactor calls from Parachain to do actions on the Relay chain. 
Currently available call options that can be executed through XCM Transactor from Moonbase Alpha Parachain:
- XCM Transfer Call from Relay Chain to any Parachain connected with HRMP channels
- Balance transfer between Relay Chain accounts

Not only that, but user can now also create native XCM calls in three different scenarios:
- Transfer from Parachain to Relay chain (Any parachain, that is connected to Moonbase Alpha Relay)
- Transfer from Parachain to Parachain (Between parachains connected to Moonbase Alpha Relay)
- Transfer from Relay chain to Parachain (From Moonbase Alpha Relay to any parachain connected)

Another beneficial feature is Axelar's GMP to transfer assets cross-chain between Moonbeam & other supported nodes.

Every screen has notifications for important actions (eg. copied address to clipboard, information, that sovereign addresses are generating, information about block finalization of XCM Transactor call, information about tx hash of XCM Transaction call).

Instead of filling lengthy calls Moon🌕️Do fills them for you. This for example involves constructing API calls you wish to perform on the Relay chain and computing encoded call data from them. This encoded call data is then used in a call executed on Parachain (XCM Transactor scenario).

In the picture below on the left is the amount of data Moon🌕️Do requires & on right is the amount of data you would have to fill to create two calls necessary for XCM call execution through XCM Transactor pallet. You can click on the image to see it in full resolution.
[![comparison](https://raw.githubusercontent.com/dudo50/MoonDo/main/img/comparisonimg.jpg)](https://raw.githubusercontent.com/dudo50/MoonDo/main/img/comparisonimg.jpg)
This is what Moon🌕️Do focuses on with all other scenarios as well.

# 3. Installation for local use 

Make sure to import Alice account which has permission to execute XCM Transactor calls on Moonbase Alpha into your wallet. These permissions can only be received by governance vote.

### Getting local repository ready 
First we start by installing necessary libraries
```
sudo apt install git make
```
Ensure you have latest node.js installed if not use following command
```
sudo n stable
```
Clone this repository with command
```
git clone https://github.com/dudo50/MoonDo.git
```

### Importing Alice on Moonbase Alpha
Important details about Alice are displayed below. Please note, that account index you will be promted to enter when filling XCM Transactor call is also displayed below.

Head to Moonbase Alpha node into accounts pallet - [Link](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fwss.api.moonbase.moonbeam.network#/accounts). Click on "Add account" and enter private key displayed below.
```
Alice private key: 0x28194e8ddb4a2f2b110ee69eaba1ee1f35e88da2222b5a7d6e3afa14cf7a3347   //Private key you import into Moonbase Alpha
Alice address: 0x44236223aB4291b93EEd10E4B511B37a398DEE55                               //Just to let you know
Alice account index: 42                                                                 //Will be needed in application
```
Once you enter private key and submit, you should receive JSON file. This JSON file can be imported to wallet to import Alice account into it.
If Alice have no DEV tokens you can deposit them through [Moonbase faucet](https://apps.moonbeam.network/moonbase-alpha/faucet/)

#### PLEASE NOTE: Currently TransactorXCM calls can only be executed through Talisman wallet as there is an open PR issue with Polkadot JS wallet & AccountKey20 address types. Talisman however works perfectly!

### After the repository is cloned proceed to install application dependencies with
```
npm install
```
### Running localhost network with Axelar's GMP
```
make installAxelarGMP
```
### Deploying contracts necessary to run for Axelar's GMP
```
make deployAxelarContracts
```
### Launch localhost network after it was put down
```
make relaunchAxelar
```

### Launching application after dependencies are installed
```
npm run serve
```
### Building application for production
```
npm build
```

## Project achievements 🏆️

- 🥈 Second place bounty in Moonbeam connected contracts Hackathon - Build Cross-chain application with Axelar [Link to hackathon post](https://devpost.com/software/moondo)
- 🥈 Second place for Moonbeam XCM bounty in Polkadot Hackathon Latam - Build Cross-chain application for Moonbeam [Link to hackathon post](https://polkadothackathonlatam.com/proyecto-inner/dudo50/usuario-single/)
