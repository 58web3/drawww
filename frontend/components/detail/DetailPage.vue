<template>
  <div class="detail">
    <div class="md-layout detail-layout">
      <div class="md-layout-item">
        <div class="detail">
          <img :src="post.url" class="image" />
          <span class="text-detail">{{ nameImage }}</span>
        </div>
        <div class="icon">
          <img :src="TWIITER" class="twitter" />
        </div>
        <md-button
          class="detail-button metamask-button"
          v-if="isMetamask"
          @click="connectMetamask"
        >
          Connect Metamask
        </md-button>
        <md-button class="detail-button" v-if="!isMetamask" @click="goToNFTMintPage">
          NFTをMintする
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
const Web3 = require("web3");
let web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
import contract from "../../../mintNFT/artifacts/contracts/NFTImplementERC721.sol/NFTImplementERC721.json";
const abi = contract.abi;
const NFT_USE_ERC721_ADDRESS_CONTRACT =
  process.env.NFT_USE_ERC721_ADDRESS_CONTRACT;
const ETHERSCAN_TRANSACTION_LINK = process.env.ETHERSCAN_TRANSACTION_LINK;
const GAS_LIMIT = 420000;
export default {
  name: "DeatailPage",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      // TWIITER,
      post: null,
      imageData: null,
      nameImage: "",
      account: "",
      isMetamask: false
    };
  },
  computed: {
    tweetId() {
      return this.$store.getters["user/getTweetId"];
    }
  },
  watch: {},
  async created() {
    await this.getPostDetail(this.tweetId);
  },
  mounted() {
    this.isMetamask = typeof window.ethereum !== "undefined";
  },
  methods: {
    async getPostDetail(tweetId) {
      const config = {
        method: "get",
        url: `/v1/post/${tweetId}`,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      await axios(config)
        .then((response) => {
          this.post = response.data;
          this.imageData = {
            url: this.post.url,
            name: this.post.name,
          };
          this.nameImage = this.imageData.name;
          console.log(this.nameImage);
          this.$store.dispatch("user/setIsImage", this.imageData);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async goToNFTMintPage() {
      const nftErc721 = new web3.eth.Contract(
        abi,
        NFT_USE_ERC721_ADDRESS_CONTRACT
      );
      let transactionHash = "";
      let urlMetaData = this.imageData.url;

      const gasLimit = await nftErc721.methods.mintSingleNFT(urlMetaData).estimateGas({from: this.account});
      const gasPrice = await web3.eth.getGasPrice(); 

      await nftErc721.methods
        .mintSingleNFT(urlMetaData)
        .send({
          from: this.account,
          gasLimit,
          gasPrice,
        })
        .on("transactionHash", function (hash) {
          transactionHash = hash;
        })
        .on("receipt", function (receipt) {
          console.log("this is recept ether", receipt);
        });
      console.log(transactionHash);
      this.$router.push("/nft");
    },
    async connectMetamask() {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      this.account = accounts[0];
      this.isMetamask = false
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/detail";
</style>
