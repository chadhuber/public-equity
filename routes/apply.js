'use strict';

const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const dynamo = new AWS.DynamoDB.DocumentClient();

const moment = require("moment-timezone");

module.exports = (req, res) => {
  console.log("here");
  var params = {
    TableName: "pe_loan_requests",
    Item: req.body
  };

  const now = moment()

  params.Item.created = now.unix()
  params.Item.deadline = now.add(30, 'days').unix()
  params.Item.slug = encodeURI(req.body.business_name.replace(/ /g, "-").toLowerCase())
  params.Item.verified = "f"
  params.Item.repayment_schedule = "Monthly"
  params.Item.amount_raised = 0
  params.Item.recipient_location = "Saint Louis"
  
  dynamo.put(params, function(err, data) {
    if (err) {
      res.sendStatus(404)
      console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      res.sendStatus(200)
      console.log("Added item:", JSON.stringify(data, null, 2));
    }
  });
}
