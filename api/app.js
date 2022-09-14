const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  dotenv = require("dotenv");
dotenv.config();

const { logRequest } = require("../domain/tests/util");
const { Controller } = require("./controller");
const { StorageInMemory } = require("../domain/service/storage");
// const { StorageInPostgreSql } = require("../domain/service/storagePg");

dotenv.config();
app.use(bodyParser.json());
app.use(logRequest);

new Controller(app, new StorageInMemory());
// new Controller(app, new StorageInPostgreSql());
app.listen(8090, () => console.log("app is running on port " + 8090));
