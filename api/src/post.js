const express = require("express");
require("dotenv").config();
const router = express.Router();
const uuid = require("uuid");
const dynamodb = require("./init_dynamodb");

router.post("/", async (req, res) => {
  try {
    const requestJSON = req.body;
    let tweetId = uuid.v4();
    const systemDate = Date.now();
    const url = requestJSON.imageUrl;

    const tweet = {
      tweet_id: tweetId,
      date: systemDate,
      url: url,
    };

    console.log(tweet)

    await dynamodb
      .put({
        TableName: "Post",
        Item: tweet,
      })
      .promise();

    console.log(res)
    res.json({ tweet_id: tweetId });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.get("/", async (req, res) => {
  try {
    let posts = null;
    let count = null;
    await dynamodb
      .scan({ TableName: "Post" }, function (err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          count = data.count;
          posts = data.Items;
        }
      })
      .promise();

    res.json({ count, posts });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.get("/:tweet_id", async (req, res) => {
  try {
    console.log("tweet_id: " + req.params.tweet_id);
    const dbUser = await dynamodb
      .get({
        TableName: "Post",
        Key: {
          user_id: req.params.tweet_id,
        },
      })
      .promise();

    console.log(dbUser);
    const post = dbUser.Item;

    res.json(post);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = router;
