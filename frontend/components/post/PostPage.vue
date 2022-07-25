<template>
  <div class="post">
    <div class="page-name">投稿</div>
    <div class="md-layout post-layout">
      <div class="md-layout-item">
        <div class="post-box">
          <span class="post-text">どんな出来ばえ？</span>
        </div>
        <div class="info">
          <md-field>
            <md-file
              v-model="dataImage"
              accept="image/*"
              @md-change="onFileUpload($event)"
              placeholder="写真を選択"
            />
          </md-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import POST from "@/assets/icons/post.png";
export default {
  name: "PostPage",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      POST,
      dataImage: null,
      imageUrl: ''
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onFileUpload(event) {
      console.log(this.dataImage);
      console.log(event[0]);
      let reader = new FileReader();
      reader.readAsDataURL(event[0]);
      reader.onload = (e) => {
        console.log(e)
        this.imageUrl = e.target.result;
        this.$store.dispatch('user/setIsImageUrl', this.imageUrl)
      };
      this.$router.push("/post/post-input");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/post";
</style>
