<template>
  <div class="nft-mint">
    <div class="md-layout nft-mint-layout">
      <div class="md-layout-item">
        <md-button class="nft-mint-button" @click="goToMarkerplacePage">
            NFTを見てみる
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NFTMintPage',
  components: {
  },
  mixins: [],
  props: {},
  data() {
    return {
    }
  },
  computed: {},
  watch: {},
  created() {

  },
  mounted() {

  },
  methods: {
    goToMarkerplacePage() {
        this.$router.push('/markerplace')
    }
  },
}

</script>

<style lang="scss" scoped>
@import "@/assets/scss/nft-mint";
</style>
