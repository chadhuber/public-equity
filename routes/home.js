'use strict';

const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports = (req, res) => {
  var params = {
    TableName : "pe_loan_requests",
    IndexName: "verified-created-index",
    KeyConditionExpression: "verified = :verified and created > :created",
    ScanIndexForward: false,
    ExpressionAttributeValues: {
      ":verified": "t",
      ":created": 0
    },
    Limit: 24
  };

  dynamo.query(params, (err, data) => {
    console.log({err});
    console.log({data});

    if (err || !data) {
      res.render("home", {campaigns: []});
    }
    else {
      res.render("home", {campaigns: data.Items});
    }
  });
}


// module.exports = (req, res) => {

//   campaigns = [
//   {
//     id: req.params.id,
//     name: "A Taste of Africa",
//     short_description: "An upstart African food catering business is looking to expand with their first food truck",
//     recipient_name: "Blessing W.",
//     recipient_location: "Saint Louis",
//     recipient_origin: "Nigeria",
//     photo_url: "https://s3.amazonaws.com/public-equity/blessing.png",
//     amount_raised: 400,
//     amount_goal: 500,
//     loan_period_in_days: 365,
//     loan_period_in_months: 12,
//     repayment_schedule: "Monthly",
//     partner: "International Institute of St Louis",
//     partner_verified: true,
//     business_type: "Food or Restaurant",
//     story: "<p>Blessing is the owner of <strong>A Taste of Africa</strong>, an African food catering business. She also has a small clothing business where she shares clothing styles from her country. She has been a member of Public Equity since 2014.</p><p>Blessing has been in the St. Louis area since 1998 and has recently started working on her business full-time. She has Masters degree in counseling from Lindenwood and has a passion for helping people. Her other passions are sharing her culture’s food and style with St. Louis. She has been catering events and utilizing social media to promote her business to start her funding her business through her own efforts.</p><p>A loan for Blessing would pay for a downpayment for a food truck so that she can expand her business and share her food with more residents of St. Louis. </p>"
//   },
//   {
//     id: req.params.id,
//     name: "A Taste of Africa",
//     short_description: "An upstart African food catering business is looking to expand with their first food truck",
//     recipient_name: "Blessing W.",
//     recipient_location: "Saint Louis",
//     recipient_origin: "Nigeria",
//     photo_url: "https://s3.amazonaws.com/public-equity/blessing.png",
//     amount_raised: 400,
//     amount_goal: 500,
//     loan_period_in_days: 365,
//     loan_period_in_months: 12,
//     repayment_schedule: "Monthly",
//     partner: "International Institute of St Louis",
//     partner_verified: true,
//     business_type: "Food or Restaurant",
//     story: "<p>Blessing is the owner of <strong>A Taste of Africa</strong>, an African food catering business. She also has a small clothing business where she shares clothing styles from her country. She has been a member of Public Equity since 2014.</p><p>Blessing has been in the St. Louis area since 1998 and has recently started working on her business full-time. She has Masters degree in counseling from Lindenwood and has a passion for helping people. Her other passions are sharing her culture’s food and style with St. Louis. She has been catering events and utilizing social media to promote her business to start her funding her business through her own efforts.</p><p>A loan for Blessing would pay for a downpayment for a food truck so that she can expand her business and share her food with more residents of St. Louis. </p>"
//   },
//   {
//     id: req.params.id,
//     name: "A Taste of Africa",
//     short_description: "An upstart African food catering business is looking to expand with their first food truck",
//     recipient_name: "Blessing W.",
//     recipient_location: "Saint Louis",
//     recipient_origin: "Nigeria",
//     photo_url: "https://s3.amazonaws.com/public-equity/blessing.png",
//     amount_raised: 400,
//     amount_goal: 500,
//     loan_period_in_days: 365,
//     loan_period_in_months: 12,
//     repayment_schedule: "Monthly",
//     partner: "International Institute of St Louis",
//     partner_verified: true,
//     business_type: "Food or Restaurant",
//     story: "<p>Blessing is the owner of <strong>A Taste of Africa</strong>, an African food catering business. She also has a small clothing business where she shares clothing styles from her country. She has been a member of Public Equity since 2014.</p><p>Blessing has been in the St. Louis area since 1998 and has recently started working on her business full-time. She has Masters degree in counseling from Lindenwood and has a passion for helping people. Her other passions are sharing her culture’s food and style with St. Louis. She has been catering events and utilizing social media to promote her business to start her funding her business through her own efforts.</p><p>A loan for Blessing would pay for a downpayment for a food truck so that she can expand her business and share her food with more residents of St. Louis. </p>"
//   },
//   {
//     id: req.params.id,
//     name: "A Taste of Africa",
//     short_description: "An upstart African food catering business is looking to expand with their first food truck",
//     recipient_name: "Blessing W.",
//     recipient_location: "Saint Louis",
//     recipient_origin: "Nigeria",
//     photo_url: "https://s3.amazonaws.com/public-equity/blessing.png",
//     amount_raised: 400,
//     amount_goal: 500,
//     loan_period_in_days: 365,
//     loan_period_in_months: 12,
//     repayment_schedule: "Monthly",
//     partner: "International Institute of St Louis",
//     partner_verified: true,
//     business_type: "Food or Restaurant",
//     story: "<p>Blessing is the owner of <strong>A Taste of Africa</strong>, an African food catering business. She also has a small clothing business where she shares clothing styles from her country. She has been a member of Public Equity since 2014.</p><p>Blessing has been in the St. Louis area since 1998 and has recently started working on her business full-time. She has Masters degree in counseling from Lindenwood and has a passion for helping people. Her other passions are sharing her culture’s food and style with St. Louis. She has been catering events and utilizing social media to promote her business to start her funding her business through her own efforts.</p><p>A loan for Blessing would pay for a downpayment for a food truck so that she can expand her business and share her food with more residents of St. Louis. </p>"
//   },
//   {
//     id: req.params.id,
//     name: "A Taste of Africa",
//     short_description: "An upstart African food catering business is looking to expand with their first food truck",
//     recipient_name: "Blessing W.",
//     recipient_location: "Saint Louis",
//     recipient_origin: "Nigeria",
//     photo_url: "https://s3.amazonaws.com/public-equity/blessing.png",
//     amount_raised: 400,
//     amount_goal: 500,
//     loan_period_in_days: 365,
//     loan_period_in_months: 12,
//     repayment_schedule: "Monthly",
//     partner: "International Institute of St Louis",
//     partner_verified: true,
//     business_type: "Food or Restaurant",
//     story: "<p>Blessing is the owner of <strong>A Taste of Africa</strong>, an African food catering business. She also has a small clothing business where she shares clothing styles from her country. She has been a member of Public Equity since 2014.</p><p>Blessing has been in the St. Louis area since 1998 and has recently started working on her business full-time. She has Masters degree in counseling from Lindenwood and has a passion for helping people. Her other passions are sharing her culture’s food and style with St. Louis. She has been catering events and utilizing social media to promote her business to start her funding her business through her own efforts.</p><p>A loan for Blessing would pay for a downpayment for a food truck so that she can expand her business and share her food with more residents of St. Louis. </p>"
//   }];

//   res.render("home", campaigns);
// }
