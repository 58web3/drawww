<template>
  <div :key="keyRender" class="body-wrapper">
    <Header />
    <div class="wrapper">
      <router-view />
      </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
export default {
  name: 'LayoutDefault',
  components: {},
  mixins: [],
  middleware: [],
  data() {
    return {
      keyRender: new Date().getTime(),
      Header,
      Footer
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
    width: 100%;
    margin: 0 auto;
    top: 101px;
    bottom: 101px;
    position: absolute;
}
</style>
