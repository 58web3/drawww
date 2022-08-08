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
            <span class="text-title title-url">NFT マーケットプレイスURL</span>
            <span class="text-detail link-url">{{ testUrl }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MarketCompletedPage',
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

  },
  mounted() {
    this.dataImage = this.contractInfo.url;
    this.nameImage = this.contractInfo.name;
    this.transactionHash = this.contractInfo.transaction_hash;
  },
  methods: {
  },
}

</script>

<style lang="scss" scoped>
@import "@/assets/scss/market-completed";
</style>
