<template>
  <div id="app">
    <b-navbar style="margin-bottom: 5%;">
      <template #start>
        <h1 style="margin-top: 0.5% ;" class="name first" >Moon</h1>
        <img class="mainLogo rotate" src="./assets/moondo.png" />
        <h1 style="margin-top: 0.5% ;margin-right: 1%;" class="name first" >Do</h1>
        <b-navbar-item  class="top" tag="router-link" to="/" type="is-link">Home</b-navbar-item>
        <b-navbar-item class="top" tag="router-link" to="/gmp" type="is-link">GMP Transfer</b-navbar-item>
        <b-navbar-dropdown class="top" label="XCM Transfer">
          <b-navbar-item tag="router-link" to="/relaytopara" type="is-link">From Relay chain</b-navbar-item>
          <b-navbar-item tag="router-link" to="/paratorelay" type="is-link">To Relay chain</b-navbar-item>
          <b-navbar-item tag="router-link" to="/paratopara" type="is-link">To Parachain</b-navbar-item>
        </b-navbar-dropdown>
        <b-navbar-item class="top" tag="router-link" to="/transactor" type="is-link">Transactor XCM</b-navbar-item>
        <b-navbar-item class="top" tag="router-link" to="/sovereign" type="is-link">Generate sovereign</b-navbar-item>
        <b-navbar-item style = "margin-top: 0.2%; margin-left:1%; " @click="isCardModalActive = true">Connect account<b-icon style="margin-left:5px;" size="is-small" pack="fas" icon="wallet"></b-icon></b-navbar-item>
      </template>
    </b-navbar>
    <router-view/>
    <b-modal v-model="isCardModalActive" :width="640" scroll="keep">
      <b-message 
        title="Info" 
        type="is-info" 
        aria-close-label="Close message">NOTICE: PLEASE USE TALISMAN WALLET, OTHER WALLETS ARE NOT COMPATIBLE WITH XCM TRANSACTOR PALLET CURRENTLY!<br> Select account you wish to login with and then close this popup by clicking anywhere around these boxes.
      </b-message>
      <b-select placeholder="Select account" expanded style="text-align: center;" @input.native="accountLogin($event)" required>
        <option v-for="(dropdown, index) in dropdown" :key="index">{{dropdown}}</option>
      </b-select>
    </b-modal>
    <notifications/>
  </div>
</template>

<script>
  import { defineComponent } from '@vue/composition-api'
  import '@polkadot/api-augment';
  import store from './store';
  import { web3Accounts, web3Enable } from "@polkadot/extension-dapp" 

  export default defineComponent({
    data() {
      return {
        accounts: [],  //List of names - To be also used on Log in button
        addresses: [], //List of addresses
        injected: [],  //Collected injected wallets
        dropdown: [],  //Dropdown of names & addresses
        isCardModalActive: false   //Used to determine whether wallet login popup is or is not active
      };
    },
    mounted: async function () {
     //Connect injected wallets that are available
     const extensions = await web3Enable("PolkadotJS")
      if(extensions.length == 0) {
        this.$notify({ title: 'Error', text: 'You do not have PolkadotJS extension make sure to install one if you want to use your wallet.', type: 'error', duration: 8000,speed: 100})
        return
      }
      //Collect injected wallets
      this.injected = await web3Accounts()
      //Used to extract address and name from injected wallet login
      for (let i=0 ;i<this.injected.length; i++){
        this.accounts.push(JSON.stringify(this.injected[i]["meta"]["name"]))
        this.addresses.push(JSON.stringify(this.injected[i]["address"]))
        this.dropdown.push(this.accounts[i] + this.addresses[i])
      }
    },
    methods:{
      //Used to extract address from injected wallet login
      async accountLogin(value){
        var accSplit = value.target.value.split('"')
        this.loginn(accSplit[3])
      },
      
      async loginn(value){
        this.login=value
        store.commit('saveAccount', this.login)
      },  

    }
  })
</script>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");
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
  .mainLogo {
    width: 3%;
  }
  .rotate {
    animation: rotation 50s infinite linear;
  }
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
  .name {
    color: #e1147a;
    font-family: "Pacifico", cursive;
    font-size: 40px;
  }
  .undername {
    color: black;
    font-family: "Anybody", cursive;
    font-size: 14px;

  }
  .undertext {
    color: black;
    font-family: "Anybody", cursive;
    font-size: 20px;
    margin-bottom: 1px;
    margin-top: 25px;
  }
  .together {
    display:block
  }
  .flex__container {
    display: flex;
    flex-direction: column;
  }
  .top {
    margin-top: 8px;
  }
</style>

