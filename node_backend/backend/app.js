const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');

const app = express();

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env;

//var mongoUrl = "mongodb://mongodatabase:27017/node-angular";
var mongoUrl = "mongodb://"+MONGO_HOSTNAME+":"+MONGO_PORT+"/"+MONGO_DB;
console.log("mongoUrl: "+mongoUrl)

//mongoose.connect("mongodb://localhost:27017/node-angular?gssapiServiceName=mongodb", { useNewUrlParser: true })
//mongoose.connect("mongodb://localhost:27017/node-angular", { useNewUrlParser: true })
mongoose.connect(mongoUrl, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection to DB failed!");
    return process.exit(22);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT");
  next();
});

app.use('/api/posts', postsRoutes);

module.exports = app;
