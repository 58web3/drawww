const express = require("express");
require("dotenv").config();
var Twitter = require("twitter");
const router = express.Router();
const dotenv = require("dotenv")
const fs = require("fs")

dotenv.config()

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  bearer_token: process.env.BEARER_TOKEN,
});

router.post("/create", async (req, res) => {
  try {
    const requestJSON = req.body;
    let tweetId = requestJSON.tweetId;
    const url = requestJSON.imageUrl;

    if(tweetId) {
      await postTwitter(url);
    }

    res.json({ tweet_id: tweetId });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

async function postTwitter(
  imageUrl
) {
  const imageData = fs.readFileSync(imageUrl)
  const base64image = Buffer.from(imageData).toString('base64');
  let postData = null;

  client.post("media/upload", {media_data: base64image}, function(error, media, response) {
    if (error) {
      console.log(error)
    } else {
      const status = {
        status: "I tweeted from Node.js!",
        media_ids: media.media_id_string
      }

      postData = status;
  
      client.post("statuses/update", status, function(error, tweet, response) {
        if (error) {
          console.log(error)
        } else {
          console.log("Successfully tweeted an image!")
        }
      })
    }
  })

  return postData;
}

module.exports = router;
