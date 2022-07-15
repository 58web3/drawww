<template>
  <div class="dao">
    <div class="md-layout dao-layout">
      <div class="md-layout-item">
        <div class="dao-item">
            <span class="label">#天音かなた</span>
            <img :src="IMAGE" class="image"/>
            <span class="text-title">総売り上げ額</span>
            <span class="text-detail">143.47 ETH</span>
            <span class="text-title">ロックアップ金額</span>
            <span class="text-detail">89.22 ETH</span>
        </div>
        <div class="dao-item-2">
            <span class="label">#初音ミク</span>
            <img :src="IMAGE2" class="image"/>
            <span class="text-title">総売り上げ額</span>
            <span class="text-detail">972.47 ETH</span>
            <span class="text-title">ロックアップ金額</span>
            <span class="text-detail">875.21 ETH</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import IMAGE from '@/assets/image/example.png'
import IMAGE2 from '@/assets/image/example2.png'
export default {
  name: 'DaoPage',
  components: {
  },
  mixins: [],
  props: {},
  data() {
    return {
        IMAGE,
        IMAGE2
    }
  },
  computed: {},
  watch: {},
  created() {

  },
  mounted() {

  },
  methods: {
  },
}

</script>

<style lang="scss" scoped>
@import "@/assets/scss/dao";
</style>
