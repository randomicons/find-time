const AWS = require('aws-sdk')
const constants = require('../constants/index')
AWS.config.update({
  region: constants.aws_region,
  endpoint: "http://localhost:" + constants.db_local_port
})
const docClient = new AWS.DynamoDB.DocumentClient()

exports.create_user = function (req, res) {
  const params = {
    TableName: constants.user_table_name,
    Item: {
      userId: req.body.email,
      dataType: constants.user_id,
      password: req.body.password
    },
    ConditionExpression: "attribute_not_exists(userId)"
  }

  docClient.put(params, (err, data) => {
    if (err) {
      if (err.message === "ConditionalCheckFailedException")
        res.status(500).send(JSON.stringify({code: 500, message: "User already exists"}))
      console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2))
      res.status(500).send("Unable to add item. Error JSON:" + JSON.stringify(err, null, 2))
    } else {
      console.log("Added item:", JSON.stringify(data, null, 2))
      res.set(200).send("Added new user")
    }
  })
}