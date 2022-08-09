<template>
  <div class="marketplace">
    <div class="md-layout marketplace-layout">
      <div class="md-layout-item">
        <div class="marketplace-item">
            <img :src="dataImage" class="image"/>
            <span class="text-detail">{{ nameImage }}</span>
            <span class="text-title">NFT</span>
            <span class="text-detail">{{ transactionHash }}</span>
            <span class="text-title">NFT 所有者</span>
            <span class="text-detail">{{ transactionHash }}</span>
        </div>
        <div class="link-box">
          <span class="link">{{ testUrl }}</span>
        </div>
        <md-button class="marketplace-button" @click="goToCompletedPage">
            出品先URLを登録
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MarketPlacePage',
  components: {
  },
  mixins: [],
  props: {},
  data() {
    return {
        dataImage: '',
        nameImage: '',
        transactionHash: '',
        testUrl: 'https://testnets.opensea.io/assets/rinkeby/'
    }
  },
  computed: {
    contractInfo() {
      return this.$store.getters['user/getContractInfo']
    }
  },
  watch: {},
  created() {
    //this.getContractDetail(this.tweetId);
  },
  mounted() {
    console.log(this.contractInfo)
    this.dataImage = this.contractInfo.url;
    this.nameImage = this.contractInfo.name;
    this.transactionHash = this.contractInfo.transaction_hash;
  },
  methods: {
    // async getContractDetail(tweetId) {
    //   const config = {
    //     method: "get",
    //     url: `/v1/contract/${tweetId}`,
    //     headers: {
    //       accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //   };
    //   await axios(config)
    //     .then((response) => {
    //       this.transactionHash = response.data.transaction_hash;
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
    goToCompletedPage() {
        this.$router.push('/market-completed')
    }
  },
}

</script>

<style lang="scss" scoped>
@import "@/assets/scss/marketplace";
</style>
