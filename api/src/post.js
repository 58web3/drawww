const express = require("express");
require("dotenv").config();
const router = express.Router();
const uuid = require("uuid");
//const IPFS = require("ipfs");
const dynamodb = require("./init_dynamodb");
//import { create } from 'ipfs-http-client'
const create = require("ipfs-http-client");

const multer = require('multer');
const upload = multer();


router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    console.log('req', req.file)
    let tweetId = uuid.v4();
    const systemDate = Date.now();
    //const image = requestJSON.image;

    const client = create.create('https://ipfs.infura.io:5001/api/v0');

    const added = await client.add(file.buffer)
    const url = `https://ipfs.infura.io/ipfs/${added.path}`

    console.log('url', url)

    const tweet = {
      tweet_id: tweetId,
      date: systemDate,
      url: url,
      //name: image.name,
    };

    await dynamodb
      .put({
        TableName: "Post",
        Item: tweet,
      })
      .promise();

    console.log(res);
    res.json({ tweet_id: tweetId });
    //res.send({ tweet_id: tweetId , file});
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
