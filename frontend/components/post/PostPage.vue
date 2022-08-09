<template>
  <div class="post">
    <div class="page-name">投稿</div>
    <div class="md-layout post-layout">
      <div class="md-layout-item">
        <div class="text-input">
          <md-field>
            <label>どんな出来ばえ？</label>
            <md-textarea v-model="description"></md-textarea>
          </md-field>
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
      description: ''
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onFileUpload(event) {
      console.log(event[0]);
      this.$store.dispatch("user/setIsFile", event[0]);
      let reader = new FileReader();
      let tempData;
      reader.readAsDataURL(event[0]);
      reader.onload = (e) => {
        console.log(e);
        tempData = {
          url: e.target.result,
          name: event[0].name,
          description: this.description
        };
        this.$store.dispatch("user/setIsImage", tempData);
      };
      this.$router.push("/post/post-input");
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/post";
</style>
