<template>
  <div class="post-completed">
    <div class="page-name">
      投稿完了
    </div>
    <div class="md-layout post-layout">
      <div class="md-layout-item">
        <md-button class="post-button" @click="goToPostTwitterPage">
            Twitterに投稿
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
   goToPostTwitterPage() {
      this.$router.push('/post/post-completed')
    } 
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/post-completed";
</style>
