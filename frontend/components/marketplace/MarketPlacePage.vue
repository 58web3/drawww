<template>
  <div class="marketplace">
    <div class="md-layout marketplace-layout">
      <div class="md-layout-item">
        <div class="marketplace-item">
            <img :src="IMAGE" class="image"/>
            <span class="text-detail">かなたそ</span>
            <span class="text-title">NFT</span>
            <span class="text-detail">0x56A0c97FE2536dEc74de803b941eF2Cb3D504B54</span>
            <span class="text-title">NFT 所有者</span>
            <span class="text-detail">0x56A0c97FE2536dEc74de803b941eF2Cb3D504B54</span>
        </div>
        <md-button class="marketplace-button" @click="goToCompletedPage">
            出品先URLを登録
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>

import IMAGE from '@/assets/image/example.png'
export default {
  name: 'MarketPlacePage',
  components: {
  },
  mixins: [],
  props: {},
  data() {
    return {
        IMAGE
    }
  },
  computed: {},
  watch: {},
  created() {

  },
  mounted() {

  },
  methods: {
    goToCompletedPage() {
        this.$router.push('/market-completed')
    }
  },
}

</script>

<style lang="scss" scoped>
@import "@/assets/scss/market-completed";
</style>
