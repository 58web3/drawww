<template>
  <div class="footer">
    <md-toolbar>
      <div class="md-toolbar-row">
        <div class="md-toolbar-box">
          <div class="md-large item" @click="goToHomePage">
            <div :class="home"></div>
            <span class="footer-btn-font">Home</span>
          </div>
          <div class="md-large item" @click="goToPostPage">
            <div :class="post"></div>
            <img :src="TEXT" class="text-content" />
          </div>
          <div class="md-large item" @click="goToDAOPage">
            <div :class="dao"></div>
            <span class="footer-btn-font">NFT DAO</span>
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
    };
  },
  async fetch() {},
  computed: {},
  watch: {},
  created() {},
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
      this.$router.push("/home");
    },
    goToPostPage() {
      this.$root.$emit("post-active");
      this.$router.push("/post");
    },
    goToDAOPage() {
      this.$root.$emit("dao-active");
      this.$router.push("/dao");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/footer";
</style>
