'use strict';

const aws = require('aws-sdk');
const ses = new aws.SES({region: 'us-east-1', apiVersion: '2010-12-01'});
const ejs = require('ejs');

module.exports.sendEmail = ({to, bcc, from_name = "Public Equity", subject, html, text}) => {
  return new Promise((resolve, reject) => {

    const sendObj = { 
      Source: from_name+'<notifications@publicequity.us>', 
      Destination: { ToAddresses: to },
      Message: {
        Subject: { Data: subject },
        Body: {
          Html: { Data: html },
          Text: { Data: text }
        }
      }
    }

    if (bcc) {
      sendObj.ReplyToAddresses = to;
      sendObj.Destination.BccAddresses = bcc;
    }
    
    ses.sendEmail(sendObj, (err, data) => { 
      if (err) {
        throw err;
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

module.exports.generateEmail = (template, data) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile("./views/emails/"+template+".html", data, (err, str) => {
      if (err) {
        console.log({err});
        throw err;
        reject(err);
      } else
        resolve(str);
    });
  });
}
