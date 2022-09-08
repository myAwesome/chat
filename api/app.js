const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  dotenv = require("dotenv");
const { logRequest } = require("../domain/tests/util");
const { Controller } = require("./controller");

dotenv.config();
app.use(bodyParser.json());
app.use(logRequest);
new Controller(app);
app.listen(8090, () => console.log("app is running on port " + 8090));
