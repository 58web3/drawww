<template>
  <div class="post-completed">
    <div class="page-name">
      {{ $t("twitter_post_complete") }}
    </div>
    <div class="md-layout post-layout">
      <div class="md-layout-item">
        <md-button class="post-button" @click="goToTwitterPage">
          {{ $t("browse") }}
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostCompletedPage",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    goToTwitterPage() {
      window.location.href = "https://twitter.com/home";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/post-completed";
</style>
