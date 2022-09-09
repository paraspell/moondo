<template>
    <div id="app">

      <b-field style ="margin-top: 10%; " class="textt"  label-position="inside" label="Select origin chain">
        <b-select expanded v-model="key" placeholder="Select parachain 1" required>
          <option v-for="(item) in items" :key="item">{{item}}</option>
        </b-select>
      </b-field>

      <b-field class="textt"  label-position="inside" label="Select destination chain">
        <b-select expanded v-model="keyy" placeholder="Select parachain 1" required>
          <option v-for="(item) in items" :key="item">{{item}}</option>
        </b-select>
      </b-field>


      <b-field class="textt"  label-position="inside" label="Provide account address">
        <b-input expanded @input.native="addrAssign($event)" v-model="addr"></b-input>
      </b-field>
  
      <b-field class="textt" label-position="inside" label="Provide aUSDC token sum">
        <b-input expanded @input.native="sumAssign($event)" v-model="sum"></b-input>
      </b-field>

      <b-button class="buttonn" pack="fas" icon-right="file-import" expanded type="is-primary" @click="transfer()">Send transaction</b-button>

      <b-field style ="margin-top: 15%; " class="textt"  label-position="inside" label="Select chain">
        <b-select expanded v-model="selectedPrefundChain" placeholder="Select parachain 1" required>
          <option v-for="(acc) in prefundedAccChain" :selectedPrefundChain="acc">{{acc}}</option>
        </b-select>
      </b-field>

      <b-field class="textt"  label-position="inside" label="Select option">
        <b-select expanded v-model="option" required>
          <option v-for="(acc) in options" :option="acc">{{acc}}</option>
        </b-select>
      </b-field>

      <b-field v-if="option == 'Your account address balance'" class="textt" label-position="inside" label="Provide your account address">
        <b-input expanded @input.native="addressSub($event)" v-model="balanceAddr"></b-input>
      </b-field>

      <b-button class="buttonn" pack="fas" icon-right="file-import" expanded type="is-primary" @click="displayBallance()">Display ballance</b-button>

      <h1 v-if="currentBallance != ''" class="text">Selected account ballance on {{selectedPrefundChain}} is {{currentBallance}} aUSDC</h1>


    </div>
  </template>
  <script lang="ts">
    import { defineComponent } from '@vue/composition-api'
    import { wallet, isTestnet } from "../../moondo-Axelar-GMP/config/constants";
    import {
      sendTokenToDestChain,
      getBalance,
      generateRecipientAddress,
      truncatedAddress,
    } from "../../moondo-Axelar-GMP/utils";
    
    export default defineComponent({
  
      data() {
        return {
            prefundedAccChain: [] as Array<string>,
            items: [] as Array<string>,  
            selectedPrefundChain: "" as string,
            options: [] as Array<string>,
            option: "" as string,
            balanceAddr: "" as string,
            key: "" as string,   
            keyy: "" as string,   
            sum: "" as string,   
            addr: "" as string,   
            txhash: "" as any,
            currentBallance: "" as string,
            
          };
        },
      mounted: async function () {
        this.items.push("Moonbeam")
        this.items.push("Avalanche")
        this.items.push("Ethereum")
        this.items.push("Fantom")
        this.items.push("Polygon")

        this.prefundedAccChain.push("Moonbeam")
        this.prefundedAccChain.push("Avalanche")
        this.prefundedAccChain.push("Ethereum")
        this.prefundedAccChain.push("Fantom")
        this.prefundedAccChain.push("Polygon")

        this.options.push("Prefunded account ballance")
        this.options.push("Your account address balance")
      },
      methods: {
        async transfer(){
          if(this.items.length == 0 || this.key == "" || this.keyy == "" || this.sum == "" || this.addr == "")
          {
            this.$notify({ text: 'You did not specify required details!', type: 'error', duration: 8000,speed: 100})
            return
          }
          this.$notify({ text: 'Your transaction is processing!', duration: 8000,speed: 100})
          this.txhash = await sendTokenToDestChain(this.sum, [this.addr], this.key, this.keyy)
          this.$notify({ text: 'Your transaction is processed!', type:"success", duration: 8000,speed: 100})
        },

        async displayBallance(){
          if(this.option == 'Your account address balance'){
            if(this.selectedPrefundChain == "Moonbeam"){
              const _balances = await getBalance([this.balanceAddr], "MoonbeamDES");
               this.currentBallance = _balances[0]
            }
            else if(this.selectedPrefundChain == "Ethereum"){
              const _balances = await getBalance([this.balanceAddr], "EthereumDES");
              this.currentBallance = _balances[0]
            }
            else if(this.selectedPrefundChain == "Fantom"){
              const _balances = await getBalance([this.balanceAddr], "FantomDES");
              this.currentBallance = _balances[0]
            }
            else if(this.selectedPrefundChain == "Avalanche"){
              const _balances = await getBalance([this.balanceAddr], "AvalancheDES");
              this.currentBallance = _balances[0]
            }
            else if(this.selectedPrefundChain == "Polygon"){
              const _balances = await getBalance([this.balanceAddr], "PolygonDES");
              this.currentBallance = _balances[0]
            }
          }

          else if(this.option == 'Prefunded account ballance'){
            if(this.selectedPrefundChain == "Moonbeam"){
              const _balances = await getBalance([wallet.address], "MoonbeamSRC");
               this.currentBallance = _balances[0]
            }
            else if(this.selectedPrefundChain == "Ethereum"){
              const _balances = await getBalance([wallet.address], "EthereumSRC");
              this.currentBallance = _balances[0]
            }
            else if(this.selectedPrefundChain == "Fantom"){
              const _balances = await getBalance([wallet.address], "FantomSRC");
              this.currentBallance = _balances[0]
            }
            else if(this.selectedPrefundChain == "Avalanche"){
              const _balances = await getBalance([wallet.address], "AvalancheSRC");
              this.currentBallance = _balances[0]
            }
            else if(this.selectedPrefundChain == "Polygon"){
              const _balances = await getBalance([wallet.address], "PolygonSRC");
              this.currentBallance = _balances[0]
            }
          }
        },

        async addrAssign(value: any){
          this.addr=value.target.value
        },

        async setTxHash(value: any){
          this.txhash=value.target.value
        },

        async sumAssign(value: any){
          this.sum=value.target.value
        },

        async addressSub(value: any){
          this.balanceAddr=value.target.value
        },
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
      font-family: "Pacifico", cursive;
      font-size: 20px;
      margin-top: 15px;
    }
  </style>