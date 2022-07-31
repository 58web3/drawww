const express = require('express')
const app = express()
const twitter = require('./twitter')
const post = require('./post')
const bodyParser = require('body-parser');
//var fileUpload = require('express-fileupload')
// support parsing of application/json type post data
app.use(bodyParser.json());
// app.use(fileUpload())

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// for parsing application/json
app.use(express.json())
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.use('/v1/twitter', twitter)
app.use('/v1/post', post)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Error')
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

module.exports = {
  handler: app,
}
