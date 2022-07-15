<template>
  <div class="detail">
    <div class="md-layout detail-layout">
      <div class="md-layout-item">
        <div class="detail">
            <img :src="IMAGE" class="image"/>
            <span class="text-detail">かなたそ</span>
        </div>
        <div class="icon">
           <img :src="TWIITER" class="twitter" />
        </div>
        <md-button class="detail-button" @click="goToNFTMintPage">
            投稿する
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>

import IMAGE from '@/assets/image/example.png'
import TWIITER from '@/assets/icons/twitter.png'
export default {
  name: 'DeatailPage',
  components: {
  },
  mixins: [],
  props: {},
  data() {
    return {
        IMAGE,
        TWIITER
    }
  },
  computed: {},
  watch: {},
  created() {

  },
  mounted() {

  },
  methods: {
    goToNFTMintPage() {
        this.$router.push('/nft')
    }
  },
}

</script>

<style lang="scss" scoped>
@import "@/assets/scss/detail";
</style>
