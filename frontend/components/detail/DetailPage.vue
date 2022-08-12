<template>
  <div class="detail">
    <div class="md-layout detail-layout">
      <div class="md-layout-item">
        <div class="detail">
          <img :src="post.url" class="image" />
          <span class="text-detail">{{ nameImage }}</span>
          <span class="description">{{ description }}</span>
        </div>
        <div class="icon">
          <img :src="TWITTER" class="twitter" />
        </div>
        <md-button class="detail-button" @click="goToNFTMintPage">
          {{ $t("minting_the_nft") }}
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>
import TWITTER from "@/assets/icons/twitter.png";
const axios = require("axios");
const Web3 = require("web3");
let web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
import contract from "../../../mintNFT/artifacts/contracts/NFTImplementERC721.sol/NFTImplementERC721.json";
const abi = contract.abi;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
export default {
  name: "DeatailPage",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      TWITTER,
      post: null,
      imageData: null,
      nameImage: "",
      account: "",
      defaultLanguage: "",
      description: ""
    };
  },
  computed: {
    tweetId() {
      return this.$store.getters["user/getTweetId"];
    },
    language() {
      return this.$i18n.locale;
    },
  },
  watch: {
    language() {
      return this.$i18n.locale;
    },
  },
  async created() {
    this.defaultLanguage = this.$i18n.defaultLocale;
    this.getPostDetail(this.$route.params.id);
  },
  mounted() {},
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
            description: this.post.description
          };
          this.nameImage = this.imageData.name;
          this.description = this.imageData.description;
          this.$store.dispatch("user/setIsImage", this.imageData);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async goToNFTMintPage() {
      const systemDate = Date.now();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      this.account = accounts[0];
      const nftErc721 = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

      let transactionHash = "";
      let urlMetaData = this.imageData.url;
      const gasLimit = await nftErc721.methods
        .mintSingleNFT(urlMetaData)
        .estimateGas({ from: this.account });
      const gasPrice = await web3.eth.getGasPrice();
      let tokenId;
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
        })
        .then(function (result) {
          console.log("result", result);
          tokenId = result.events.Transfer.returnValues.tokenId;
        });

      if (transactionHash) {
        const data = {
          tweet_id: this.tweetId,
          url: this.imageData.url,
          name: this.imageData.name,
          transaction_hash: transactionHash,
          token_id: tokenId,
          contract_address: CONTRACT_ADDRESS,
          date: systemDate,
          created_at: systemDate,
          updated_at: systemDate,
        };

        let config = {
          method: "post",
          url: "/v1/contract",
          data,
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        };

        axios(config)
          .then((response) => {
            this.$store.dispatch(
              "user/setIsContractInfo",
              response.data.contract
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }

      this.$router.push(
        this.language === this.defaultLanguage
          ? "/nft"
          : `/${this.language}/nft`
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/detail";
</style>
