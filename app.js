'use strict';

const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const dynamo = new AWS.DynamoDB.DocumentClient();

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const DynamoSessionStore = require('connect-dynamodb')({session: session});

const app = express();

const sessionStore = session({
  store: new DynamoSessionStore({
    readCapacityUnits: 2,
    writeCapacityUnits: 2
  }), 
  unset: "destroy",
  secret: 'public_equity_38_90',
  resave: false,
  saveUninitialized: false,
  proxy: true
});

app.use(sessionStore);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// const routes = {
//   campaign: require("./routes/campaign"),
//   login:    require("./routes/login")
// }

/* Static Assets */
app.use('/assets', express.static('assets'));

/* Publicly Accessible Pages */
app.get('/', (req, res) => res.render("home"));
// app.get('/campaign/:id', routes.campaign);

/* Authentication based routes */
app.get('/login', (req, res) => res.render('login'));
// app.post('/login', routes.login);

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.all('*', (req, res) => res.render('404', {page: "404", user: req.session.user}));

module.exports = app;
