<template>
  <div class="home">
    <div class="md-layout home-layout">
      <div class="md-layout-item">
        <div class="home-detail" v-for="item in listImages" :key="item.id">
          <img :src="item.url" class="image" @click="goToDetailPage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IMAGE from "@/assets/image/example.png";
export default {
  name: "HomePage",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      IMAGE,
      listImages: [
        {
          id: "1",
          url: IMAGE,
        },
        {
          id: "2",
          url: IMAGE,
        },
        {
          id: "3",
          url: IMAGE,
        },
        {
          id: "4",
          url: IMAGE,
        },
        {
          id: "5",
          url: IMAGE,
        },
        {
          id: "6",
          url: IMAGE,
        },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getDBPost();
  },
  methods: {
    goToDetailPage() {
      this.$router.push("/detail");
    },
    async getDBPost() {
      const config = {
        method: 'get',
        url: `/v1/post/`,
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
      await axios(config)
          .then((response) => {
            console.log(response.data)
          })
          .catch((error) => {
            console.log(error)
          })
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/home";
</style>
