<template>
  <div class="dao">
    <div class="md-layout dao-layout">
      <div class="md-layout-item">
        <div class="dao-item" v-for="item of listContract" :key="item.tweet_id">
          <span class="label">#{{ item.name }}</span>
          <img :src="item.url" class="image" />
          <span class="text-title">総売り上げ額</span>
          <span class="text-detail">143.47 ETH</span>
          <span class="text-title">ロックアップ金額</span>
          <span class="text-detail">89.22 ETH</span>
        </div>
        <span class="empty-data" v-if="listContract.length === 0">No contract data</span>
      </div>
    </div>
  </div>
</template>

<script>
import IMAGE from "@/assets/image/example.png";
import IMAGE2 from "@/assets/image/example2.png";
const axios = require("axios");
export default {
  name: "DaoPage",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      IMAGE,
      IMAGE2,
      listContract: [],
    };
  },
  computed: {},
  watch: {},
  created() {
    const config = {
      method: "get",
      url: `/v1/contract`,
      headers: {
        'accept': 'application/json', 
        'Content-Type': 'application/json'
      },
    };

    axios(config)
      .then((response) => {
        console.log(response)
        this.listContract = response.data.contract;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/dao";
</style>
