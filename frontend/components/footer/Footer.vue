<template>
  <div class="footer">
    <md-toolbar>
      <div class="md-toolbar-row">
        <div class="md-toolbar-box">
          <div class="md-large item" @click="goToHomePage">
            <div :class="home"></div>
            <span class="footer-btn-font">{{ $t("home") }}</span>
          </div>
          <div class="md-large item" @click="goToPostPage">
            <div :class="post"></div>
            <img :src="TEXT" class="text-content" />
          </div>
          <div class="md-large item" @click="goToDAOPage">
            <div :class="dao"></div>
            <span class="footer-btn-font">{{ $t("nft_dao") }}</span>
          </div>
        </div>
      </div>
    </md-toolbar>
  </div>
</template>

<script>
import TEXT from "@/assets/image/text.png";
export default {
  name: "Footer",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      TEXT,
      home: "circle",
      post: "circle",
      dao: "circle",
      defaultLanguage: ''
    };
  },
  async fetch() {},
  computed: {
    language() {
      return this.$i18n.locale
    }
  },
  watch: {
    language() {
      return this.$i18n.locale
    }
  },
  created() {
    this.defaultLanguage = this.$i18n.defaultLocale;
  },
  mounted() {
    this.$root.$on("home-active", () => {
      this.home = "circle home";
      this.post = "circle";
      this.dao = "circle";
    });

    this.$root.$on("post-active", () => {
      this.post = "circle post";
      this.home = "circle";
      this.dao = "circle";
    });

    this.$root.$on("dao-active", () => {
      this.home = "circle";
      this.post = "circle";
      this.dao = "circle dao";
    });
  },
  methods: {
    goToHomePage() {
      this.$root.$emit("home-active");
      this.$router.push(this.language === this.defaultLanguage ? "/home" : `/${this.language}/home`);
    },
    goToPostPage() {
      this.$root.$emit("post-active");
      this.$router.push(this.language === this.defaultLanguage ? "/post" : `/${this.language}/post`);
    },
    goToDAOPage() {
      this.$root.$emit("dao-active");
      this.$router.push(this.language === this.defaultLanguage ? "/dao" : `/${this.language}/dao`);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/footer";
</style>
