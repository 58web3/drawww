<template>
  <div class="home">
    <div class="md-layout home-layout">
      <div class="md-layout-item">
        <md-button
          class="md-raised md-primary login-button"
          style="width: 100%"
          v-if="checkLogout"
          @click="logout"
        >
          {{ $t('logout') }}
        </md-button>
        <div
          class="home-detail"
          v-for="item in listImages"
          :key="item.tweet_id"
        >
          <img :src="item.url" class="image" @click="goToDetailPage(item.tweet_id)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES } from "@web3auth/base";
const axios = require('axios')
export default {
  name: "HomePage",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      listImages: [],
      checkLogout: false,
      web3auth: null,
      defaultLanguage: ""
    };
  },
  computed: {
    language() {
      return this.$i18n.locale;
    }
  },
  watch: {
    language() {
      return this.$i18n.locale;
    }
  },
  created() {
    this.defaultLanguage = this.$i18n.defaultLocale;
    this.web3auth = new Web3Auth({
      clientId: process.env.WEB3AUTH_CLIENT_ID,
      chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: process.env.WEB3AUTH_CHAIN_ID,
        rpcTarget: process.env.WEB3AUTH_RPC_TARGET,
      },
    });
    console.log(this.web3auth);

    const config = {
      method: "get",
      url: `/v1/post`,
      headers: { 
        'accept': 'application/json', 
        'Content-Type': 'application/json'
      },
    };

    axios(config)
      .then((response) => {
        this.listImages = response.data.posts;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  mounted() {
    this.web3auth.initModal();
    let isLogin = sessionStorage.getItem("isLogin");
    if (isLogin) {
      this.checkLogout = true;
    } else {
      this.checkLogout = false;
    }
    //this.$root.$emit("home-active");
  },
  methods: {
    goToDetailPage(id) {
      this.$store.dispatch('user/setIsTweetId', id)
      this.$router.push(
        this.language === this.defaultLanguage
          ? `/post/${id}`
          : `/${this.language}/post/${id}`
      );
    },
    async logout() {
      this.$store.dispatch("user/setUser", null);
      sessionStorage.removeItem("user");
      sessionStorage.setItem("isLogin", true);
      await this.web3auth.logout();
      this.$router.push(
        this.language === this.defaultLanguage
          ? "/"
          : `/${this.language}`
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/home";
</style>
