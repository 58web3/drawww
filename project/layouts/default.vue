<template>
  <div :key="keyRender" class="body-wrapper">
      <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'LayoutDefault',
  components: {},
  mixins: [],
  middleware: [],
  data() {
    return {
      keyRender: new Date().getTime(),
    }
  },
  computed: {},
}
</script>
<style lang="scss">
.body-wrapper {
  overflow: hidden;
}

body {
  width: 375px !important;
  margin: 0 auto;
  padding-left: 5px;
  padding-right: 5px;
  background-color: #fff;
}

.wrapper {
  height: calc(100vh - 12px - 64px);
  overflow-y: scroll;
  overflow-x: none;
}
</style>
