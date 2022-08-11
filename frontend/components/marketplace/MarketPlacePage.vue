<template>
  <div class="marketplace">
    <div class="md-layout marketplace-layout">
      <div class="md-layout-item">
        <div class="marketplace-item">
            <img :src="dataImage" class="image"/>
            <span class="text-detail">{{ nameImage }}</span>
            <span class="text-title">NFT</span>
            <span class="text-detail">{{ transactionHash }}</span>
            <span class="text-title">{{ $t("nft_owner") }}</span>
            <span class="text-detail">{{ transactionHash }}</span>
        </div>
        <div class="link-box">
          <span class="link">{{ testUrl }}</span>
        </div>
        <md-button class="marketplace-button" @click="goToCompletedPage">
            {{ $t("register_list_url") }}
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
        testUrl: 'https://testnets.opensea.io/assets/rinkeby/',
        defaultLanguage: ""
    }
  },
  computed: {
    contractInfo() {
      return this.$store.getters['user/getContractInfo']
    },
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
  },
  mounted() {
    this.dataImage = this.contractInfo.url;
    this.nameImage = this.contractInfo.name;
    this.transactionHash = this.contractInfo.transaction_hash;
  },
  methods: {
    goToCompletedPage() {
      this.$router.push(
        this.language === this.defaultLanguage
          ? "/market-completed"
          : `/${this.language}/market-completed`
      );
    }
  },
}

</script>

<style lang="scss" scoped>
@import "@/assets/scss/marketplace";
</style>
