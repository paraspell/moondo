<template>
    <div id="app">
  
      <div class="box" style="margin-top: 25%;  font-family: 'Anybody', cursive;">
        You are logged in as {{$store.state.account}}.
      </div>
  
      <b-field class="textt" label-position="inside" label="Input origin Parachain node WSS address">
        <b-input expanded @input.native="inputwss($event)" v-model="wssaddr"></b-input>
      </b-field>

      <b-field class="textt" label-position="inside" label="Select destination parachain">
        <b-select v-model="keyy" expanded placeholder="Select parachain 2" required>
          <option v-for="(item) in items" :key="item">{{item}}</option>
        </b-select>
      </b-field>
  
      <b-field class="textt" label-position="inside" label="Input recipient address">
        <b-input expanded @input.native="addrs($event)" v-model="addr"></b-input>
      </b-field>

      <b-field class="textt" label-position="inside" label="Select destination account type">
        <b-select v-model="type" expanded required>
          <option v-for="(type) in accTypes" :key="type">{{type}}</option>
        </b-select>
      </b-field>
  
      <b-field class="textt" label-position="inside" label="Insert asset ID">
        <b-input expanded @input.native="asstid($event)" v-model="asst"></b-input>
      </b-field>

      <b-field class="textt" label-position="inside" label="Input asset amount">
        <b-input expanded @input.native="unit($event)" v-model="amount"></b-input>
      </b-field>
  
      <b-button class="buttonn" expanded  type="is-primary" label="Send transaction" pack="fas" icon-right="file-import" @click="sendXCM($store.state.account)"/>
  
    </div>
  </template>
  
  <script lang="ts">
    import { ApiPromise, WsProvider } from '@polkadot/api'
    import { defineComponent, isRaw } from '@vue/composition-api'
    import { decodeAddress } from '@polkadot/util-crypto'
    import { web3FromAddress } from "@polkadot/extension-dapp"
    import '@polkadot/api-augment';
    export default defineComponent({
    
      data() {
        return {
          items: [] as Array<number>,   //Stores Parachains connected to Relay chain
          keyy: "" as string,   //Selected destination parachain
          addr: "" as string,   //Recipient address is stored here
          amount: 0 as number,   //Required amount to be transfered is stored here
          asst: "" as string,
          wssaddr: "" as string,
          type: "" as string,
          accTypes: [] as Array<string>,

        };
      },
      mounted: async function () {
        this.$notify({ text: `Fetching Parachains connected to Relay chain. Please wait for success notification.`, duration: 6000,speed: 100})
        const wsProvider = new WsProvider('wss://frag-moonbase-relay-rpc-ws.g.moonbase.moonbeam.network');
        const api = await ApiPromise.create({ provider: wsProvider });
        //API call to query Parachains connected to Relay chain
        const parachain = await api.query.paras.parachains()
        const queryPara = JSON.stringify(parachain)
        const newParas = queryPara.split('[').join(',').split(']').join(',').split(',')
        const results = newParas.filter(element => {return element !== "";});
        const extractedParas = results.map((i) => Number(i));
        this.items = extractedParas
        this.$notify({ text: 'Parachains connected to Relay chain fetched successfuly!', type:"success", duration: 4000,speed: 100})
        
        this.accTypes.push("AccountKey20")
        this.accTypes.push("AccountId32")

      },
      methods: {
        //Used to store recipient address
        // eslint-disable-next-line 
        async addrs(value: any){
          this.addr=value.target.value
        },
        //Used to store selected currency
        // eslint-disable-next-line 
        async asstid(value: any){
          this.asst=value.target.value
        },

        //Used to store wss address 
        // eslint-disable-next-line 
        async inputwss(value: any){
          this.wssaddr=value.target.value
        },
        //Used to store user required transfer amount
        // eslint-disable-next-line 
        async unit(value: any){
          this.amount=value.target.value
        },
        //Used to create XCM transfer
        async sendXCM(address: string) {
          if(this.keyy == "" || this.wssaddr == "") 
          {
            this.$notify({ title: 'Error', text: 'You did not select parachain correctly/ input wss port for origin Parachain.', type: 'error', duration: 3000,speed: 100})
          }
          else 
          {
            if(this.addr=="")
            {
              this.$notify({ title: 'Error', text: 'You need to input recipient first.', type: 'error', duration: 3000,speed: 100})
            }
            else{
              if(this.amount<1000000000000)
              {
                this.$notify({ title: 'Error', text: 'Specified amount is less than required {1000000000000}.', type: 'error', duration: 3000,speed: 100})
              }
              else{
              
                var counter = 0
                const injector = await web3FromAddress(address); 
                const wsProvider = new WsProvider(this.wssaddr);
                const api = await ApiPromise.create({ provider: wsProvider });
                if(this.type == "AccountId32"){
                  api.tx.xTokens
                    .transfer(
                    {
                      ForeignAsset: this.asst
                    },
                    this.amount,
                    {
                      V1: {
                        parents: 1,
                        interior: {
                          X2: [
                            {
                              Parachain: this.keyy
                            },
                            {
                              AccountId32: {
                                network: "Any",
                                id: api
                                  .createType("AccountId32", decodeAddress(this.addr))
                                  .toHex()
                              }
                          }
                          ]
                        }
                      }
                    },
                    399600000000
                  )
                  .signAndSend(address, { signer: injector.signer },  ({ status, txHash }) => {
                    if(counter == 0){    
                        this.$notify({ text: `Transaction hash is ${txHash.toHex()}`, duration: 10000,speed: 100})
                        counter++
                      }
                      if (status.isFinalized) {
                        this.$notify({ text: `Transaction finalized at blockHash ${status.asFinalized}`,type: 'success',duration: 10000,speed: 100})
                      }
                  });
                }

                else if (this.type == "AccountKey20"){
                  api.tx.xTokens
                    .transfer(
                    {
                      ForeignAsset: this.asst
                    },
                    this.amount,
                    {
                      V1: {
                        parents: 1,
                        interior: {
                          X2: [
                            {
                              Parachain: this.keyy
                            },
                            {
                              AccountKey20: {
                              network: "Any",
                              key: this.addr
                            }
                          }
                          ]
                        }
                      }
                    },
                    399600000000
                  )
                  .signAndSend(address, { signer: injector.signer },  ({ status, txHash }) => {
                    if(counter == 0){    
                        this.$notify({ text: `Transaction hash is ${txHash.toHex()}`, duration: 10000,speed: 100})
                        counter++
                      }
                      if (status.isFinalized) {
                        this.$notify({ text: `Transaction finalized at blockHash ${status.asFinalized}`,type: 'success',duration: 10000,speed: 100})
                      }
                  });
                }
              }
            }
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