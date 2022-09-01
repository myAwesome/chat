const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  dotenv = require("dotenv");
dotenv.config();
app.use(bodyParser.json());

const { Controller } = require("./controller");
new Controller(app);
app.listen(8090, () => console.log("app is running on port " + 8090));
