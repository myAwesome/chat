const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  dotenv = require("dotenv");
dotenv.config();
app.use(bodyParser.json());

const domainFacade = require("../domain/service/facade");
const { Storage } = require("../domain/service/storage");
const storage = new Storage();

app.get(`/rooms`, async (req, res) => {
  res.json(Array.from(storage.getRooms().values()));
});

app.get(`/room/:id`, async (req, res) => {
  const room = storage.getRoom(+req.params.id);
  res.json(room);
});

app.post(`/room`, async (req, res) => {
  const room = domainFacade.createGroupChat(req.body.name);
  res.status(201).json(storage.createRoom(room));
});

app.put(`/room/:id`, async (req, res) => {
  const room = storage.getRoom(+req.params.id);
  room.name = req.body.name;
  res.status(201).json(storage.updateRoom(+req.params.id, room));
});

app.delete(`/room/:id`, async (req, res) => {
  storage.deleteRoom(+req.params.id);
  res.status(204).json();
});

app.listen(8090, () => console.log("app is running on port " + 8090));
