const express = require("express");
require("dotenv").config();
var Twitter = require("twitter");
const uuid = require("uuid");
const router = express.Router();
const Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.EVM_RPC_TARGET)
);

const EXPLORER_URL = process.env.EXPLORER_URL;

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  bearer_token: process.env.BEARER_TOKEN,
});

let param = {
  title: '',
  url: ''
}

client
  .post("update", param)
  .then(function (tweet) {
    console.log(tweet);
  })
  .catch(function (error) {
    throw error;
  });

router.post("/", async (req, res) => {
  try {
    const requestJSON = req.body;
    let tweetId = uuid.v4();
    const systemDate = Date.now();

    const tweet = {
      tweet_id: tweetId,
      date: systemDate,
      title: param.title,
      url: param.url
    };

    await dynamodb
      .put({
        TableName: "Twitter",
        Item: tweet,
      })
      .promise();

    res.json({ tweet_id: tweetId });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = router;
