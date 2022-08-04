<template>
  <div class="marketplace">
    <div class="md-layout marketplace-layout">
      <div class="md-layout-item">
        <div class="marketplace-item">
            <img :src="dataImage" class="image"/>
            <span class="text-detail">かなたそ</span>
            <span class="text-title">NFT</span>
            <span class="text-detail">0x56A0c97FE2536dEc74de803b941eF2Cb3D504B54</span>
            <span class="text-title">NFT 所有者</span>
            <span class="text-detail">0x56A0c97FE2536dEc74de803b941eF2Cb3D504B54</span>
        </div>
        <div class="link-box">
          <span class="link">https:// ~ Open SeaなどのサイトURL</span>
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
        nameImage: ''
    }
  },
  computed: {
    image() {
      return this.$store.getters['user/getImage']
    }
  },
  watch: {},
  created() {

  },
  mounted() {
    this.dataImage = this.image.url;
    this.nameImage = this.image.name;
  },
  methods: {
    goToCompletedPage() {
        this.$router.push('/market-completed')
    }
  },
}

</script>

<style lang="scss" scoped>
@import "@/assets/scss/marketplace";
</style>
