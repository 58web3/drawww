const express = require("express");
require("dotenv").config();
const router = express.Router();

router.get('/', async (req, res) => {
    try {
      let posts = null
      let count = null
      await dynamodb.scan({ TableName: 'Posts' }, function (err, data) {
        if (err) {
          console.log('Error', err)
        } else {
          count = data.count
          posts = data.Items
        }
      }).promise()
  
      res.json({ count, posts })
    } catch (e) {
      console.log(e)
      res.status(500).send(e)
    }
  })

module.exports = router;
