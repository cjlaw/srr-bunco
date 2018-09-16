const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();

const apiRouter = require("./server/router");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set("useNewUrlParser", true);

mongoose.connect(process.env.MONGODB_URI).then(
  () => {
    console.log("Database is connected");
  },
  err => {
    console.log("Can not connect to the database" + err);
  }
);

const app = express();
app.use(bodyParser.json());

// Serve only the static files form the dist directory
app.use(express.static("./dist/bunco"));

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use(express.static(path.join(__dirname, "dist/bunco")));
app.use("/", express.static(path.join(__dirname, "dist/bunco")));
app.use("/admin", express.static(path.join(__dirname, "dist/bunco")));
app.use("/api", apiRouter);

let port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Express server listening on port ${port}!`);
});
