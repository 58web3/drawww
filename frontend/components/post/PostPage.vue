<template>
  <div class="post">
    <div class="page-name">{{ $t("post") }}</div>
    <div class="md-layout post-layout">
      <div class="md-layout-item">
        <div class="text-input">
          <md-field>
            <label>{{ $t("description") }}</label>
            <md-textarea v-model="description"></md-textarea>
          </md-field>
        </div>
        <div class="info">
          <md-field>
            <md-file
              v-model="dataImage"
              accept="image/*"
              @md-change="onFileUpload($event)"
              :placeholder="$t('select_photo')"
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
      description: "",
      defaultLanguage: ""
    };
  },
  computed: {
    language() {
      return this.$i18n.locale;
    }
  },
  watch: {
    language() {
      return this.$i18n.locale;
    }
  },
  created() {
    this.defaultLanguage = this.$i18n.defaultLocale;
  },
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
          description: this.description,
        };
        this.$store.dispatch("user/setIsImage", tempData);
      };
      this.$router.push(
        this.language === this.defaultLanguage
          ? "/post/post-input"
          : `/${this.language}/post/post-input`
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/post";
</style>
