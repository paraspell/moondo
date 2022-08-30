<template>
    <div id="app">
  
      <b-field style ="margin-top: 30%; " class="textt" label-position="inside" label="Input Relay node name (with small letters & 1 word only)">
        <b-input expanded @input.native="nodenameinput($event)" v-model="nodeName"></b-input>
      </b-field>
  
  
      <b-field class="textt" label-position="inside" label="Input node ID">
          <b-input expanded @input.native="nodeidinput($event)" v-model="nodeId"></b-input>
      </b-field>
  
      <b-button class="buttonn" pack="fas" icon-right="file-import" expanded type="is-primary" @click="generateSover()">Generate sovereign</b-button>
    
    </div>
  </template>
  
  <script lang="ts">
    import { defineComponent } from '@vue/composition-api'
    import '@polkadot/api-augment';
  
    export default defineComponent({
    
      data() {
        return {
            sovereign: [] as Array<string>,   
            nodeId: 0 as number, 
            nodeName: "" as string,
          };
        },
  
  
      methods: {
  
            async nodenameinput(value: any){
            this.nodeName=value.target.value
            },
    
            async nodeidinput(value: any){
            this.nodeId=value.target.value
            },

            //Function that will open back end to use XCMTools and PolkaTools commands in terminal
            async generateSover(){
                console.log(this.nodeId, this.nodeName)
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
  </style>