<template>
  <div class="post">
    <div class="page-name">
      投稿
    </div>
    <div class="md-layout post-layout">
      <div class="md-layout-item">
        <div class="post-box">
            <span class="post-text">どんな出来ばえ？</span>
        </div>
        <div class="info">
            <img :src="POST" class="post-img" @click="goToPostInputPage"/>
            <span class="post-text">写真を選択</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import POST from '@/assets/icons/post.png'
export default {
  name: 'PostPage',
  components: {
  },
  mixins: [],
  props: {},
  data() {
    return {
        POST,
        single: null
    }
  },
  computed: {},
  watch: {},
  created() {

  },
  mounted() {

  },
  methods: {
    goToPostInputPage() {
      this.$router.push('/post/post-input')
    }
  },
}

</script>

<style lang="scss" scoped>
@import "@/assets/scss/post";
</style>
