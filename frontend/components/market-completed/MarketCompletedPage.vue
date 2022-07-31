<template>
  <div class="marketplace">
    <div class="md-layout marketplace-layout">
      <div class="md-layout-item">
        <div class="marketplace-item">
            <img :src="dataImage" class="image"/>
            <span class="text-detail">{{ nameImage }}</span>
            <span class="text-title">NFT</span>
            <span class="text-detail">0x56A0c97FE2536dEc74de803b941eF2Cb3D504B54</span>
            <span class="text-title">NFT 所有者</span>
            <span class="text-detail">0x56A0c97FE2536dEc74de803b941eF2Cb3D504B54</span>
            <span class="text-title">NFT マーケットプレイスURL</span>
            <span class="text-detail">https://opensea.io/collection/veryuniverseanimals</span>
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
  },
}

</script>

<style lang="scss" scoped>
@import "@/assets/scss/market-completed";
</style>
