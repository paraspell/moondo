<template>
    <div id="app">
  
      <b-field style ="margin-top: 30%; " class="textt" label-position="inside" label="Input Relay node name (with small letters & 1 word only)">
        <b-input expanded @input.native="nodenameinput($event)" v-model="nodeName"></b-input>
      </b-field>
  
  
      <b-field class="textt" label-position="inside" label="Input node ID">
          <b-input expanded @input.native="nodeidinput($event)" v-model="nodeId"></b-input>
      </b-field>
  
      <b-field class="textt" label-position="inside" label="Input account index">
          <b-input expanded @input.native="accidxInput($event)" v-model="accIndex"></b-input>
      </b-field>

      <b-button class="buttonn" pack="fas" icon-right="file-import" expanded type="is-primary" @click="calculateSovereignAddress(nodeId,nodeName,accIndex)">Generate sovereign</b-button>
    
      <div v-if="generatedMoonbaseRelay != ''">
        <h1 class = "text">Moonbase Relay generated address: {{generatedMoonbaseRelay}}</h1>
        <b-button @click="notify" type="is-primary" expanded outlined v-clipboard="generatedMoonbaseRelay">Copy Moonbase Relay generated address to clipboard</b-button>
      </div>

      <div v-if="generatedMoonbaseAlpha != ''">
        <h1 class = "text" >Moonbase Alpha generated address: {{generatedMoonbaseAlpha}}</h1>
        <b-button @click="notify" type="is-primary" expanded outlined v-clipboard="generatedMoonbaseAlpha">Copy Moonbase Alpha generated address to clipboard</b-button>
      </div>

      <div v-if="generatedParachains != ''">
        <h1 class = "text">Other parachains generated address: {{generatedParachains}}</h1>
        <b-button @click="notify" type="is-primary" expanded outlined v-clipboard="generatedParachains">Copy other parachains generated address to clipboard</b-button>
      </div>

      <div v-if="derivativeAddressRelay != ''">
        <h1 class = "text">Calculated derivative address for Relay: {{derivativeAddressRelay}}</h1>
        <b-button @click="notify" type="is-primary" expanded outlined v-clipboard="derivativeAddressRelay">Copy calculated derivative address for Relay to clipboard</b-button>
      </div>

      <div v-if="encodedAddressRelay != ''">
      <h1 class = "text">Encoded address for Relay: {{encodedAddressRelay}}</h1>
      <b-button @click="notify" type="is-primary" expanded outlined v-clipboard="encodedAddressRelay">Copy encoded address for Relay to clipboard</b-button>
      </div>

      <div v-if="moonbeamDerivative != ''">
        <h1 class = "text">Calculated derivative address for Moonbeam: {{moonbeamDerivative}}</h1>
        <b-button @click="notify" type="is-primary" expanded outlined v-clipboard="moonbeamDerivative">Copy calculated derivative address for Moonbeam to clipboard</b-button>
      </div>

      <div v-if="otherParasDerivative != ''">
        <h1 class = "text" v-if="otherParasDerivative != ''">Calculated derivative address for other Parachains: {{otherParasDerivative}}</h1>
        <b-button @click="notify" type="is-primary" expanded outlined v-clipboard="otherParasDerivative">Copy calculated derivative address for other Parachains to clipboard</b-button>
      </div>

      <div v-if="otherParasEncoded != ''">
        <h1 class = "text" v-if="otherParasEncoded != ''">Encoded address for Parachains: {{otherParasEncoded}}</h1>
        <b-button @click="notify" type="is-primary" expanded outlined v-clipboard="otherParasEncoded">Copy encoded address for Parachains to clipboard</b-button>
        
      </div>
    </div>
  </template>
  
  <script lang="ts">
    import { defineComponent } from '@vue/composition-api'
    import '@polkadot/api-augment';
    import { ApiPromise, WsProvider } from '@polkadot/api';
    import { ParaId } from '@polkadot/types/interfaces';
    import { blake2AsU8a, encodeAddress, decodeAddress } from '@polkadot/util-crypto';
    import { u8aToHex, hexToU8a, bnToU8a } from '@polkadot/util';
  
    export default defineComponent({
    
      data() {
        return {
            nodeId: "" as string, 
            nodeName: "" as string,
            accIndex: 0 as number,
            text: 'This will get copied!',

            generatedMoonbaseAlpha: "" as string,
            generatedParachains: "" as string,
            generatedMoonbaseRelay: "" as string,

            derivativeAddressRelay: "" as any,
            encodedAddressRelay: "" as any,

            moonbeamDerivative: "" as any,

            otherParasDerivative: "" as any,
            otherParasEncoded: "" as any,

          };
        },
  
  
      methods: {
  
            async nodenameinput(value: any){
            this.nodeName=value.target.value
            },

            async accidxInput(value: any){
            this.accIndex=value.target.value
            },
    
            async nodeidinput(value: any){
            this.nodeId=value.target.value
            },

            async notify(){
              this.$notify({ text: 'Sucessfully copied to clipboard!.', duration: 2000,speed: 100})

            },

            //CODE DERIVED FROM https://github.com/albertov19/xcmTools WITH APPROVAL FROM OWNER 
            async calculateSovereignAddress(paraid: string, relay: string, index: number) {
              if(paraid=="" || relay == "" || index == 0){
                this.$notify({ title: 'Error', text: 'You did not enter some of the details necessary.', type: 'error', duration: 8000,speed: 100})
                return
              }
              this.$notify({ title: 'Generating', text: 'Your sovereign account details are generating.', duration: 5000,speed: 100})
              let relayURL;
              switch (relay.toLowerCase()) {
                case 'polkadot':
                  relayURL = 'wss://rpc.polkadot.io';
                  break;
                case 'kusama':
                  relayURL = 'wss://kusama-rpc.polkadot.io';
                  break;
                case 'moonbase':
                  relayURL = 'wss://frag-moonbase-relay-rpc-ws.g.moonbase.moonbeam.network';
                  break;
                default:
                  console.error('Relay chains are Polkadot, Kusama or Moonbase');
                  this.$notify({ title: 'Error', text: 'You need to select Polkadot, Kusama or Moonbase relay!', type: 'error', duration: 8000,speed: 100})
                  return

              }

                const relayProvider = new WsProvider(relayURL);

                const relayApi = await ApiPromise.create({
                  provider: relayProvider,
                });

                const targetParaId: ParaId = relayApi.createType('ParaId', paraid);

                const sovAddressRelay = u8aToHex(
                  new Uint8Array([...new TextEncoder().encode('para'), ...targetParaId.toU8a()])
                ).padEnd(66, '0');

                const sovAddressPara = u8aToHex(
                  new Uint8Array([...new TextEncoder().encode('sibl'), ...targetParaId.toU8a()])
                ).padEnd(66, '0');

                this.generatedMoonbaseRelay = sovAddressRelay
                this.generatedParachains = sovAddressPara
                this.generatedMoonbaseAlpha = sovAddressPara.slice(0, 42)

                this.calculateDerivedAddress(this.generatedMoonbaseRelay, [index], 0)
                this.calculateDerivedAddress(this.generatedParachains, [index], 1)
                this.calculateDerivedAddress(this.generatedMoonbaseAlpha, [index], 2)

                await relayApi.disconnect();
              },


            //CODE DERIVED FROM https://github.com/albertov19/PolkaTools WITH APPROVAL FROM OWNER 
            async calculateDerivedAddress(addr: any, index: Array<any>, counter: number) {
            // If address does not start with 0x - decode it
            let address = addr;
            const ethAddress = address.length === 42;

            const derivativeToEthAddress = (d: string) => d.slice(0, 42);
            let derivative: any;

            for (let l = 0; l < index.length; l++) {
              if (!ethAddress) {
                address = decodeAddress(address);
              } else {
                address = hexToU8a(address);
              }

              // Calculate Derivative Address of Given Index
              derivative = u8aToHex(
                blake2AsU8a(
                  new Uint8Array([
                    ...new TextEncoder().encode('modlpy/utilisuba'),
                    ...address,
                    ...bnToU8a(index[l], { bitLength: 16 }),
                  ]),
                  256
                )
              );

              if (ethAddress) address = derivativeToEthAddress(derivative);
              else address = derivative;
            }
            

            if (ethAddress && counter == 2) {
                this.moonbeamDerivative = derivative
            } else {
              if(counter == 0)
              {
                this.derivativeAddressRelay = derivative
                this.encodedAddressRelay = encodeAddress(derivative)
              }
              else if(counter == 1)
              {
                this.otherParasDerivative = derivative
                this.otherParasEncoded = encodeAddress(derivative)
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
    .text{
      color: black;
      font-family: "Anybody", cursive;
      font-size: 20px;
      margin-top: 15px;
    }
  </style>