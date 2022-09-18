const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  dotenv = require("dotenv");
dotenv.config();

const { logRequest } = require("../domain/tests/util");

const { Login } = require("./login");
const { Controller } = require("./controller");
const { StorageInPostgreSql } = require("../domain/service/storagePg");

dotenv.config();
app.use(bodyParser.json());
app.use(logRequest);

new Login(app, new StorageInPostgreSql());
new Controller(app, new StorageInPostgreSql());
app.listen(8090, () => console.log("app is running on port " + 8090));
