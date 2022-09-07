<template>
    <div id="app">

      <b-field style ="margin-top: 30%; " class="textt"  label-position="inside" label="Select origin chain">
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

      <b-button class="buttonn" pack="fas" icon-right="file-import" expanded type="is-primary" @click="">Send transaction</b-button>

      

    </div>
  </template>
  <script lang="ts">
    import { defineComponent } from '@vue/composition-api'
    import { wallet, isTestnet } from "./moondo-Axelar-GMP/config/constants";
    import {
      sendTokenToDestChain,
      getBalance,
      generateRecipientAddress,
      truncatedAddress,
    } from "./moondo-Axelar-GMP/utils";
    
    export default defineComponent({
  
      data() {
        return {
            items: [] as Array<string>,  
            key: "" as string,   
            keyy: "" as string,   
            sum: 0 as number,   
            addr: "" as string,   
          };
        },
      mounted: async function () {
        this.items.push("Moonbeam")
        this.items.push("Avalanche")
        this.items.push("Ethereum")
        this.items.push("Fantom")
        this.items.push("Polygon")
      },
      methods: {
        async addrAssign(value: any){
          this.addr=value.target.value
        },
        async sumAssign(value: any){
          this.sum=value.target.value
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
      font-family: "Anybody", cursive;
      font-size: 20px;
      margin-top: 15px;
    }
  </style>