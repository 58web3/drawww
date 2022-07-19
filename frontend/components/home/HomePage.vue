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
          Logout
        </md-button>
        <div class="home-detail" v-for="item in listImages" :key="item.id">
          <img :src="item.url" class="image" @click="goToDetailPage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IMAGE from "@/assets/image/example.png";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES } from "@web3auth/base";
export default {
  name: "HomePage",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      IMAGE,
      listImages: [
        {
          id: "1",
          url: IMAGE,
        },
        {
          id: "2",
          url: IMAGE,
        },
        {
          id: "3",
          url: IMAGE,
        },
        {
          id: "4",
          url: IMAGE,
        },
        {
          id: "5",
          url: IMAGE,
        },
        {
          id: "6",
          url: IMAGE,
        },
      ],
      checkLogout: false,
      web3auth: null
    };
  },
  computed: {},
  watch: {},
  created() {
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
    this.web3auth.initModal()
    let isLogin = sessionStorage.getItem('isLogin');
    if(isLogin) {
      this.checkLogout = true
    } else {
      this.checkLogout = false
    }
    //this.$root.$emit("home-active");
  },
  methods: {
    goToDetailPage() {
      this.$router.push("/detail");
    },
    async logout() {
      this.$store.dispatch('user/setUser', null)
      sessionStorage.removeItem('user')
      sessionStorage.setItem('isLogin', true);
      await this.web3auth.logout()
      this.$router.push('/')
    }    
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/home";
</style>
