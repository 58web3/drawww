<template>
  <div class="post-completed">
    <div class="page-name">
      {{ $t("post_completed") }}
    </div>
    <div class="md-layout post-layout">
      <div class="md-layout-item">
        <md-button class="post-button" @click="goToPostCompletePage">
          {{ $t("post_to_twitter") }}
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "PostTwitterPage",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      tweetIdVal: "",
      dataImage: "",
      defaultLanguage: ""
    };
  },
  computed: {
    tweetId() {
      return this.$store.getters["user/getTweetId"];
    },
    image() {
      return this.$store.getters["user/getImage"];
    },
    language() {
      return this.$i18n.locale;
    },
  },
  watch: {
    language() {
      return this.$i18n.locale;
    },
  },
  created() {
    this.defaultLanguage = this.$i18n.defaultLocale;
  },
  mounted() {},
  methods: {
    async goToPostCompletePage() {
      const data = {
        tweetId: this.tweetId,
        imageUrl: this.image.url,
      };

      const config = {
        method: "post",
        url: `/v1/twitter/create`,
        data,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      await axios(config)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      this.$router.push(
        this.language === this.defaultLanguage
          ? "/post/post-completed"
          : `/${this.language}/post/post-completed`
      );
    },
    async loginTwitter() {
      const requestURL = process.env.TWITTER_REQUEST_URL + 
      "?oauth_consumer_key=" + process.env.CONSUMER_KEY +
      "&oauth_callback=" + encodeURIComponent(process.env.DRAWWW_APP_URL);

      console.log(requestURL)
      const res1 = await axios.get(requestURL);
      console.log(res1.data)

      const authorizeURL = process.env.TWITTER_AUTHORIZE_URL + "?oauth_token=" + res1.data.oauth_token
      console.log(authorizeURL)
      const res2 = await axios.get(authorizeURL);
      console.log(res2.data)

      const accessURL = process.env.TWITTER_ACCESS_URL + 
      "?oauth_token=" + res1.data.oauth_token +
      "&oauth_verifier=" + res1.data.oauth_verifier +
      "&oauth_consumer_key=" + process.env.CONSUMER_KEY;
      console.log(accessURL)
      const res3 = await axios.post(accessURL, {});
      console.log(res3.data)
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/post-completed";
</style>
