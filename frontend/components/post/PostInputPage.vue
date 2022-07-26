<template>
  <div class="post-input">
    <div class="page-name">
      投稿
    </div>
    <div class="md-layout post-layout">
      <div class="md-layout-item">
        <div class="post-box">
            <span class="post-text">かなたそ</span>
            <div class="image">
                <img :src="dataImage" />
                <img :src="EXIT" class="exit"/>
            </div>
        </div>
        <div class="info">
            <img :src="POST" />
            <span class="post-text">写真を選択</span>
        </div>
        <md-button class="post-button" @click="goToPostCompletedPage">
            投稿する
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>
import IMAGE from '@/assets/image/example.png'
import POST from '@/assets/icons/post.png'
import EXIT from '@/assets/icons/exit.png'
//const IPFS = require('ipfs')
const axios = require('axios')
export default {
  name: 'PostInputPage',
  components: {
  },
  mixins: [],
  props: {},
  data() {
    return {
        POST,
        IMAGE,
        EXIT,
        dataImage: '',
        tweetId: '',
    }
  },
  computed: {
    imageUrl() {
      return this.$store.getters['user/getImageUrl']
    }
  },
  watch: {},
  created() {

  },
  mounted() {
    this.dataImage = this.imageUrl;
  },
  methods: {
    async goToPostCompletedPage() {
      // const node = await IPFS.create()

      // const data = this.imageUrl

      // const results = node.add(data)

      // for await (const { cid } of results) {
      //   console.log(cid.toString())
      // }

      const data = {
        imageUrl: this.dataImage
      };

      const config = {
        method: 'post',
        url: `/v1/post`,
        data,
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
      await axios(config)
          .then((response) => {
            console.log(response.data)
            this.tweetId = response.data.tweet_id
            this.$store.dispatch('user/setIsTweetId', this.tweetId)
          })
          .catch((error) => {
            console.log(error)
          })
      this.$router.push('/post/post-twitter')
    }
  },
}

</script>

<style lang="scss" scoped>
@import "@/assets/scss/post-input";
</style>
