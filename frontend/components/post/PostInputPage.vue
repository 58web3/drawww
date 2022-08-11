<template>
  <div class="post-input">
    <div class="page-name">{{ $t("post") }}</div>
    <div class="md-layout post-layout">
      <div class="md-layout-item">
        <div class="exit-button">
          <img :src="EXIT" class="exit" @click="resetData" />
        </div>
        <div class="text-input">
          <md-field>
            <label>{{ $t("description") }}</label>
            <md-textarea v-model="description"></md-textarea>
          </md-field>
        </div>
        <div class="post-box">
          <img :src="dataImage" />
        </div>
        <div class="info">
          <md-field>
            <md-file
              accept="image/*"
              @md-change="onFileUpload($event)"
              :placeholder="$t('select_photo')"
            />
          </md-field>
        </div>
        <md-button class="post-button" @click="goToPostCompletedPage">
          {{ $t("posted") }}
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
const FormData = require("form-data");
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
      updateFile: null,
      description: "",
      defaultLanguage: ""
    };
  },
  computed: {
    image() {
      return this.$store.getters["user/getImage"];
    },
    file() {
      return this.$store.getters["user/getFile"];
    },
    language() {
      return this.$i18n.locale;
    },
  },
  watch: {
    image() {
      return this.$store.getters["user/getImage"];
    },
    language() {
      return this.$i18n.locale;
    },
  },
  created() {
    this.defaultLanguage = this.$i18n.defaultLocale;
  },
  mounted() {
    if (this.image) {
      this.description = this.image.description;
      this.dataImage = this.image.url;
    }
  },
  methods: {
    async goToPostCompletedPage() {
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("description", this.description);

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
            name: response.data.name,
            description: response.data.description,
          };
          this.$store.dispatch("user/setIsImage", image);
          this.$store.dispatch("user/setIsTweetId", this.tweetId);
        })
        .catch((error) => {
          console.log(error);
        });
      this.$router.push(
        this.language === this.defaultLanguage
          ? "/post/post-twitter"
          : `/${this.language}/post/post-twitter`
      );
    },
    onFileUpload(event) {
      this.$store.dispatch("user/setIsFile", event[0]);
      this.updateFile = event[0];
      let reader = new FileReader();
      let tempData;
      reader.readAsDataURL(event[0]);
      reader.onload = (e) => {
        console.log(e);
        tempData = {
          url: e.target.result,
          name: event[0].name,
          description: this.description,
        };
        this.dataImage = tempData.url;
        this.$store.dispatch("user/setIsImage", tempData);
      };
    },
    resetData() {
      this.description = "";
      this.dataImage = null;
      this.$store.dispatch("user/setIsImage", null);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/post-input";
</style>
