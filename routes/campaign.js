'use strict';

const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const dynamo = new AWS.DynamoDB.DocumentClient();

const moment = require("moment-timezone");

module.exports = (req, res) => {
  var params = {
    TableName : "pe_loan_requests",
    Key: { "slug": req.params.id },
  };

  dynamo.get(params, (err, data) => {
    console.log({err});
    console.log({data});

    if (err || !data)
      res.render("404");
    else {
      
      data.Item.name = data.Item.first_name + " " + data.Item.last_name[0] + ".";

      res.render("campaign", {campaign: data.Item, moment});
    }
  });
}
