<template>
  <div class="post-input">
    <div class="page-name">投稿</div>
    <div class="md-layout post-layout">
      <div class="md-layout-item">
        <div class="post-box">
          <span class="post-text">{{ nameImage }}</span>
          <div class="image">
            <img :src="dataImage" />
            <img :src="EXIT" class="exit" />
          </div>
        </div>
        <div class="info">
          <md-field>
            <md-file
              
              accept="image/*"
              @md-change="onFileUpload($event)"
              placeholder="写真を選択"
            />
          </md-field>
        </div>
        <md-button class="post-button" @click="goToPostCompletedPage">
          投稿する
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>
import IMAGE from "@/assets/image/example.png";
import POST from "@/assets/icons/post.png";
import EXIT from "@/assets/icons/exit.png";
const axios = require("axios");
const FormData = require('form-data');
export default {
  name: "PostInputPage",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      POST,
      IMAGE,
      EXIT,
      dataImage: "",
      tweetId: "",
      nameImage: '',
      updateFile: null
    };
  },
  computed: {
    image() {
      return this.$store.getters["user/getImage"];
    },
    file() {
      return this.$store.getters["user/getFile"];
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.nameImage = this.image.name;
    this.dataImage = this.image.url;
  },
  methods: {
    async goToPostCompletedPage() {
      let formData = new FormData();
      formData.append("file", this.file);

      let config = {
        method: "post",
        url: "/v1/post",
        data: formData,
        headers: {},
      };

      axios(config)
        .then((response) => {
          console.log(response.data);
          this.tweetId = response.data.tweet_id;
          const image = {
            url: response.data.url,
            name: response.data.name
          }
          console.log('image', image)
          this.$store.dispatch("user/setIsImage", image);
          this.$store.dispatch("user/setIsTweetId", this.tweetId);
        })
        .catch((error) => {
          console.log(error);
        });
      this.$router.push("/post/post-twitter");
    },
    onFileUpload(event) {
      this.$store.dispatch("user/setIsFile", event[0]);
      this.updateFile = event[0];
      let reader = new FileReader();
      reader.readAsDataURL(event[0]);
      reader.onload = (e) => {
        console.log(e);
        this.image = {
          url: e.target.result,
          name: (event[0].name)
          };
        console.log(this.nameImage)
        this.nameImage = this.image.name;
        this.$store.dispatch("user/setIsImage", this.image);
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/post-input";
</style>
