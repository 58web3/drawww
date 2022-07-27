<template>
  <div class="post-completed">
    <div class="page-name">
      投稿完了
    </div>
    <div class="md-layout post-layout">
      <div class="md-layout-item">
        <md-button class="post-button" @click="goToPostCompletePage">
            Twitterに投稿
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  name: 'PostTwitterPage',
  components: {
  },
  mixins: [],
  props: {},
  data() {
    return {
      tweetIdVal: '',
      dataImage: ''
    }
  },
  computed: {
    tweetId() {
      return this.$store.getters['user/getTweetId']
    },
    image() {
      return this.$store.getters["user/getImage"];
    }
  },
  watch: {},
  created() {
    this.dataImage = this.image.url;
  },
  mounted() {
    this.tweetIdVal = this.tweetId;
  },
  methods: {
   async goToPostCompletePage() {
      const data = {
        tweetId: this.tweetIdVal,
        imageUrl: this.dataImage
      };

      const config = {
        method: 'post',
        url: `/v1/twitter/create`,
        data,
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
      await axios(config)
          .then((response) => {
            console.log(response.data)
          })
          .catch((error) => {
            console.log(error)
          })
      this.$router.push('/post/post-completed')
    } 
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/post-completed";
</style>
