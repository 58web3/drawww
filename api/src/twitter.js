const express = require("express");
require("dotenv").config();
var Twitter = require("twitter");
const uuid = require("uuid");
const router = express.Router();
const dotenv = require("dotenv")

dotenv.config()

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  bearer_token: process.env.BEARER_TOKEN,
});

router.post("/", async (req, res) => {
  try {
    const requestJSON = req.body;
    let tweetId = uuid.v4();
    const systemDate = Date.now();
    const url = requestJSON.imageUrl;
    const dataSave = await postTwitter(requestJSON.imageUrl);

    const tweet = {
      tweet_id: tweetId,
      date: systemDate,
      data: dataSave,
      url: url
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

async function postTwitter(
  imageUrl
) {
  const imageData = fs.readFileSync(imageUrl)
  let postData = null;

  client.post("media/upload", {media: imageData}, function(error, media, response) {
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
