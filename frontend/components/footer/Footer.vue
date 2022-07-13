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
            <div class="circle temp"></div>
            <span class="footer-btn-font">Temp</span>
          </div>
          <div class="md-large item">
            <div class="circle"></div>
            <span class="footer-btn-font">NTF DAO</span>
          </div>
        </div>
      </div>
    </md-toolbar>
  </div>
</template>

<script>

export default {
  name: "Footer",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {};
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
