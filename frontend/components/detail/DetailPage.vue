<template>
  <div class="detail">
    <div class="md-layout detail-layout">
      <div class="md-layout-item">
        <div class="detail">
            <img :src="post.url" class="image"/>
            <span class="text-detail">{{ nameImage }}</span>
        </div>
        <div class="icon">
           <img :src="TWIITER" class="twitter" />
        </div>
        <md-button class="detail-button" @click="goToNFTMintPage">
            NFTをMintする
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>

import TWIITER from '@/assets/icons/twitter.png'
const axios = require('axios')
export default {
  name: 'DeatailPage',
  components: {
  },
  mixins: [],
  props: {},
  data() {
    return {
        TWIITER,
        post: null,
        image: null,
        nameImage: ''
    }
  },
  computed: {
    tweetId() {
      return this.$store.getters['user/getTweetId']
    }
  },
  watch: {},
  async created() {
    await this.getPostDetail(this.tweetId)
  },
  mounted() {

  },
  methods: {
    async getPostDetail(tweetId) {
      const config = {
        method: 'get',
        url: `/v1/post/${tweetId}`,
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
      await axios(config)
          .then((response) => {
            this.post = response.data
            this.image = {
              url: this.post.url,
              name: this.post.name
            };
            this.nameImage = this.image.name;
            console.log(this.nameImage)
            this.$store.dispatch('user/setIsImage', this.image)
          })
          .catch((error) => {
            console.log(error)
          })
    },
    goToNFTMintPage() {
        this.$router.push('/nft')
    }
  },
}

</script>

<style lang="scss" scoped>
@import "@/assets/scss/detail";
</style>
