const express = require("express");
require("dotenv").config();
const router = express.Router();
const uuid = require("uuid");
const dynamodb = require("./init_dynamodb");
const create = require("ipfs-http-client");

const multer = require("multer");
const upload = multer();

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    let tweetId = uuid.v4() + Date.now();
    const systemDate = Date.now();
    const projectId = process.env.PROJECT_ID;
    const projectSecret = process.env.PROJECT_SECRET;
    const subDomain = process.env.SUB_DOMAIN;
    const auth =
      "Basic " +
      Buffer.from(projectId + ":" + projectSecret).toString("base64");

    const client = await create.create({
      host: `ipfs.infura.io`,
      port: 5001,
      protocol: "https",
      apiPath: "/api/v0",
      headers: {
        authorization: auth,
      },
    });

    const added = await client.add(file.buffer);
    const url = `https://${subDomain}.infura-ipfs.io/ipfs/${added.path}`;

    const tweet = {
      tweet_id: tweetId,
      date: systemDate,
      url: url,
      name: req.file.originalname,
      description: req.body.description,
    };

    await dynamodb
      .put({
        TableName: "Post",
        Item: tweet,
      })
      .promise();

    console.log(res);
    res.json({
      tweet_id: tweetId,
      url: tweet.url,
      name: tweet.name,
      description: tweet.description,
    });
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
          tweet_id: req.params.tweet_id,
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
