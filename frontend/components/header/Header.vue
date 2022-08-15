<template>
  <div class="header">
    <img :src="Header">
    <select class="select-lang" v-model="language" @change="(e) => changeLanguage(e)">
      <option v-for="item in languages" :key="item.code" :value="item.code">
        {{ item.name }}
      </option>
    </select>
  </div>
</template>

<script>
import Header from '@/assets/image/Header.png';
export default {
  name: "Header",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      Header,
      language: "",
      defaultLanguage: "",
      languages: [],
    };
  },
  async fetch() {},
  computed: {},
  watch: {},
  created() {
    this.language = this.$i18n.locale;
    this.defaultLanguage = this.$i18n.defaultLocale;
    this.languages = this.$i18n.locales;
  },
  mounted() {},
  methods: {
    changeLanguage(e) {
      this.$i18n.setLocale(e.target.value);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/header";
</style>
