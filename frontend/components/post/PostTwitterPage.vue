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
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/post-completed";
</style>
