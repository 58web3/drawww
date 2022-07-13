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
                <img :src="IMAGE" />
                <img :src="EXIT" class="exit"/>
            </div>
        </div>
        <div class="info">
            <img :src="POST" />
            <span class="post-text">写真を選択</span>
        </div>
        <md-button class="post-button">
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
        EXIT
    }
  },
  computed: {},
  watch: {},
  created() {

  },
  mounted() {

  },
  methods: {

  },
}

</script>

<style lang="scss" scoped>
@import "@/assets/scss/post-input";
</style>
