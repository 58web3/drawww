<!-- Please remove this file from your project -->
<template>
  <div class="login">
    <span class="login-header">ログイン</span>
    <md-button
      class="md-raised md-primary login-button"
      style="width: 100%"
      v-if="checkLogin"
      @click="login"
    >
      {{ $t('login') }}
    </md-button>
  </div>
</template>

<script>
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import RPC from "../utils/evm";
const axios = require('axios')

export default {
  name: "LoginPage",
  mixins: [],
  props: {},
  data() {
    return {
      loading: { value: false },
      loginButtonStatus: null,
      connecting: null,
      web3auth: null,
      provider: null,
      userData: {},
      userAccount: null,
      user_id: null,
      checkLogin: true
    };
  },
  computed: {
    user() {
      return this.$store.getters['user/getUser']
    },
  },
  watch: {},
  created() {
    this.loading = { value: false };
    this.loginButtonStatus = "";
    this.connecting = false;
    this.provider = null;
    this.web3auth = new Web3Auth({
      clientId: process.env.WEB3AUTH_CLIENT_ID,
      chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: process.env.WEB3AUTH_CHAIN_ID,
        rpcTarget: process.env.WEB3AUTH_RPC_TARGET,
      },
    });
    console.log(this.web3auth);
  },
  mounted() {
    this.userData = sessionStorage.getItem('user');
    if(this.userData) {
      this.checkLogin = false;
    }
    try {
      this.loading.value = true;
      this.web3auth.initModal();
    } catch (error) {
      this.uiConsole("error", error);
    } finally {
      this.loading.value = false;
    }
  },
  methods: {
    async login() {
      if (!this.web3auth) {
        this.uiConsole("web3auth not initialized yet");
        return;
      }
      this.provider = await this.web3auth.connect();
      const rpc = new RPC(this.provider);
      const userAccounts = await rpc.getAccounts();
      if (userAccounts && userAccounts.length > 0) {
        this.userAccount = userAccounts[0];
      }
      await this.getUserInfo();
      const user = this.userData;
      this.$store.dispatch('user/setUser', user)
      sessionStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('isLogin', true);

      console.log(user);
      console.log(this.userAccount);
      this.$router.push('/home')
      if (!user) {
        return;
      }
    },
    async getUserInfo() {
      if (!this.web3auth) {
        this.uiConsole("web3auth not initialized yet");
        return;
      }
      this.userData = await this.web3auth.getUserInfo();
      this.uiConsole(this.userData);
    },
    async getAccounts() {
      if (!this.provider) {
        this.uiConsole("provider not initialized yet");
        return;
      }
      const rpc = new RPC(this.provider);
      this.userAccount = await rpc.getAccounts();
      this.uiConsole(this.userAccount);
    },
    uiConsole: (...args) => {
      console.log(args);
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .login-header {
    font-size: 22px;
    line-height: 38px;
  }
  .login-button {
    margin-top: 20px;
  }
}
</style>
