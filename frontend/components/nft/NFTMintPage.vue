<template>
  <div class="nft-mint">
    <div class="page-name">
      {{ $t("nft_completed") }}
    </div>
    <div class="md-layout nft-mint-layout">
      <div class="md-layout-item">
        <md-button class="nft-mint-button" @click="goToMarkerplacePage">
          {{ $t("see_nft") }}
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NFTMintPage",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
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
    goToMarkerplacePage() {
      this.$router.push(
        this.language === this.defaultLanguage
          ? "/marketplace"
          : `/${this.language}/marketplace`
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/nft-mint";
</style>
