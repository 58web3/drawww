const AWS = require('aws-sdk')

if (process.env.USE_DYNAMODB_LOCAL == "true") {
  // use dynamodb local
  const myConfig = new AWS.Config({
    credentials: {
      accessKeyId: 'dummy',
      secretAccessKey: 'dummy',
    },
    region: 'us-west-2',
    endpoint: process.env.DYNAMODB_LOCAL_URL,
  })
  AWS.config = myConfig
} else {
  AWS.config.region = 'ap-northeast-1';
}

const dynamodb = new AWS.DynamoDB.DocumentClient()

const tables = [
  {
    TableName: 'Post',
    KeySchema: [{ AttributeName: 'tweet_id', KeyType: 'HASH' }],
    AttributeDefinitions: [{ AttributeName: 'tweet_id', AttributeType: 'S' }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
    TableName: 'Contract',
    KeySchema: [{ AttributeName: 'tweet_id', KeyType: 'HASH' }],
    AttributeDefinitions: [{ AttributeName: 'tweet_id', AttributeType: 'S' }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    }
  }
]
const dym = new AWS.DynamoDB()
console.log(dym);

tables.forEach((t) => {
  try {
    dym.createTable(t, function(err, data) {
      if (err) {
        console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2))
      } else {
        console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2))
      }
    })
  } catch (e) {
    console.log(e)
  }
})


module.exports = dynamodb
