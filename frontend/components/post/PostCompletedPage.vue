<template>
  <div class="post-completed">
    <div class="page-name">
      Twitter投稿完了
    </div>
    <div class="md-layout post-layout">
      <div class="md-layout-item">
        <md-button class="post-button" @click="goToTwitterPage">
            閲覧する
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PostCompletedPage',
  components: {
  },
  mixins: [],
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    goToTwitterPage() {
      window.location.href = 'https://twitter.com/home';
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/post-completed";
</style>
