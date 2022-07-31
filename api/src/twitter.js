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
  consumer_key: "xGwoSRAdx8FQoc2WKYVGUsFtJ",
  consumer_secret: "Ly0Bl8om7HGPToPjNoPp8KAlzhpmQiUTFJtmB9HW0tCAXWXhIv",
  bearer_token:
    "AAAAAAAAAAAAAAAAAAAAAD6zewEAAAAAY2m5dOB9nJGp3I%2FXqOZYvAqd%2Fpw%3DYwKOHI3nLvXxdxNtD0OZgw1bWGGanqvzgIw5pQ96iGOgylsh8z",
});

client
  .post("update", { status: "I Love Twitter" })
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
