<template>
  <div class="footer">
    <md-toolbar>
      <div class="md-toolbar-row">
        <div class="md-toolbar-box">
          <div class="md-large item">
            <div class="circle"></div>
            <span class="footer-btn-font">Home</span>
          </div>
          <div class="md-large item">
            <div class="circle text"></div>
            <img :src="TEXT" class="text-content"/>
          </div>
          <div class="md-large item">
            <div class="circle"></div>
            <span class="footer-btn-font">NFT DAO</span>
          </div>
        </div>
      </div>
    </md-toolbar>
  </div>
</template>

<script>

import TEXT from "@/assets/image/text.png"
export default {
  name: "Footer",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      TEXT
    };
  },
  async fetch() {},
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/footer";
</style>
