const express = require("express");
require("dotenv").config();
var Twitter = require("twitter");
const router = express.Router();
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

router.post("/create", async (req, res) => {
  try {
    const requestJSON = req.body;
    let tweetId = requestJSON.tweetId;
    const url = requestJSON.imageUrl;

    if (tweetId) {
      await postTwitter(url);
    }

    res.json({ tweet_id: tweetId });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

async function postTwitter(imageUrl) {
  const postContent = imageUrl;
  const params = { status: postContent };

  client.post("statuses/update", params, function (error, tweet, response) {
    if (error) {
      console.log(error);
    } else {
      console.log("Successfully tweeted an image!");
    }
  });
}

module.exports = router;
