<template>
    <div id="app">

      <div class="box" style="margin-top: 25%;  font-family: 'Anybody', cursive;">
        You are logged in as {{$store.state.account}}.
      </div>
  
      <b-field class="textt"  label-position="inside" label="Provide asset ID you wish to use">
        <b-input expanded @input.native="asstID($event)" v-model="assetId"></b-input>
      </b-field>
  
      <b-field class="textt" label-position="inside" label="Provide account index">
        <b-input expanded @input.native="indx($event)" v-model="accIndex"></b-input>
      </b-field>
  
      <b-field class="textt" label-position="inside" label="Select operation you wish to perform on Relay chain">
        <b-select expanded v-model="operation" @input.native="asignOper($event)" placeholder="Select operation" required>
          <option v-for="(operation) in operations" :key="operation">{{operation}}</option>
        </b-select>
      </b-field>

      <b-field v-if="operation == 'Balance transfer'" class="textt" label-position="inside" label="Provide destination address">
        <b-input expanded @input.native="addrSub($event)" v-model="addr"></b-input>
      </b-field>

      <b-field v-if="operation == 'Balance transfer'" class="textt" label-position="inside" label="Provide sum you wish to transfer">
        <b-input expanded @input.native="sumSub($event)" v-model="sum"></b-input>
      </b-field>

      <b-button class="buttonn" pack="fas" icon-right="file-import" expanded type="is-primary" @click="sendXCM($store.state.account)">Create call</b-button>
    
    </div>
  </template>
  
  <script lang="ts">
    import { Keyring } from '@polkadot/api'
    import { ApiPromise, WsProvider } from '@polkadot/api'
    import { defineComponent } from '@vue/composition-api'
    import { decodeAddress } from '@polkadot/util-crypto'
    import { web3FromAddress } from "@polkadot/extension-dapp"
    import '@polkadot/api-augment';

    export default defineComponent({

      data() {
        return {
            addr: "" as string,
            sum: 0 as number,
            assetId: 0 as number,
            accIndex: 0 as number,
            operation: "" as string,   
            operations: [] as Array<string>,  
          };
        },
  
      mounted: async function () {

        this.operations.push("Balance transfer")
      },
  
      methods: {
  
        async indx(value: any){
          this.accIndex=value.target.value
        },

        async sumSub(value: any){
          this.sum=value.target.value
        },
        async addrSub(value: any){
          this.addr=value.target.value
        },
        async asstID(value: any){
          this.assetId=value.target.value
        },
        async asignOper(value: any){
          this.operation=value.target.value
        },

        //ACCOUNT REGISTERED ON MOONBASE ALPHA TESTNET THAT HAS SUDO DETAILS:
        // PRIVATE KEY 0x28194e8ddb4a2f2b110ee69eaba1ee1f35e88da2222b5a7d6e3afa14cf7a3347
        //INDEX 42
        //ADDRESS 0x44236223aB4291b93EEd10E4B511B37a398DEE55

        //XCUNIT ASSET ID 42259045809535163221576417993425387648

        //MOONBASE ALPHA WSS - wss://wss.api.moonbase.moonbeam.network
        //MOONBASE RELAY WSS - wss://frag-moonbase-relay-rpc-ws.g.moonbase.moonbeam.network

        async sendXCM(address: string){
          const wsProvider = new WsProvider('wss://wss.api.moonbase.moonbeam.network');
          const api = await ApiPromise.create({ provider: wsProvider });

          const wsProvider2 = new WsProvider('wss://frag-moonbase-relay-rpc-ws.g.moonbase.moonbeam.network');
          const api2 = await ApiPromise.create({ provider: wsProvider });
          
          if(this.operation == "Balance transfer"){

            //Calculate encoded data for balance transfer call:
            const dataEncode = api2.tx.balances.transfer(
              {
                Id: this.addr
              },
                this.sum
            )
            
            const dataHash = dataEncode.method.toHex()

            api.tx.xcmTransactor.transactThroughDerivative(
              "Relay",
              this.accIndex,
              {
                currency: {
                  AsCurrencyId: {
                    ForeignAsset: this.assetId                  //ASSET ID HERE
                  }
                },
                feeAmount: null
              },
              dataHash,    //INNER CALL HERE
              {
                transactRequiredWeightAtMost: 1000000000000,
                overallWeight: null
              }
            ).signAndSend//METAMASK INJECT HERE
          }
        }
      }
    })
  </script>
  
  <style scoped>
    @import url("https://fonts.googleapis.com/css2?family=Anybody:wght@300&family=BIZ+UDGothic&family=Pacifico&display=swap");
  
    #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      background-color: white;
      margin-top: 20px;
      margin-left: 20%;
      margin-right: 20%;
    }
    select {
      width: 150px;
      margin: 10px;
    }
    select:focus {
      min-width: 150px;
      width: auto;
    }
    .textt{
      color: black;
      font-family: "Anybody", cursive;
      font-size: 30px;
      margin-bottom: 20px;
    }
  </style>