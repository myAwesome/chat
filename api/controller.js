const domainFacade = require("../domain/service/facade");

class Controller {
  storage;
  constructor(app, storage) {
    this.storage = storage;
    this.defineRoutes(app);
  }
  defineRoutes = (app) => {
    const storage = this.storage;
    app.get(`/rooms`, async (req, res) => {
      const rooms = await storage.getRooms();
      res.json(Array.from(rooms));
    });

    app.get(`/room/:id`, async (req, res) => {
      const room = await storage.getRoom(+req.params.id);
      res.json(room);
    });

    app.post(`/room`, async (req, res) => {
      const room = domainFacade.createGroupRoom(req.body.name);
      res.status(201).json(await storage.createRoom(room));
    });

    app.put(`/room/:id`, async (req, res) => {
      const room = storage.getRoom(+req.params.id);
      room.name = req.body.name;
      res.status(201).json(storage.updateRoom(+req.params.id, room));
    });

    app.delete(`/room/:id`, async (req, res) => {
      await storage.deleteRoom(+req.params.id);
      res.status(204).json();
    });

    app.put(`/room/:id/participant/:pid`, async (req, res) => {
      const participant = storage.getParticipant(+req.params.pid);
      const room = storage.getRoom(+req.params.id);
      domainFacade.joinRoom(participant, room);
      res.status(201).json("joinRoom");
    });

    app.delete(`/room/:id/participant/:pid`, async (req, res) => {
      const participant = storage.getParticipant(+req.params.pid);
      const room = storage.getRoom(+req.params.id);
      domainFacade.leaveRoom(participant, room);
      res.status(204).json("leaveRoom");
    });

    app.get(`/participants`, async (req, res) => {
      res.json(Array.from(storage.getParticipants()));
    });

    app.get(`/participant/:id`, async (req, res) => {
      const participant = storage.getParticipant(+req.params.id);
      res.json(participant);
    });

    app.post(`/participant`, async (req, res) => {
      const participant = domainFacade.createParticipant(req.body.name);
      res.status(201).json(storage.createParticipant(participant));
    });

    app.put(`/participant/:id`, async (req, res) => {
      const participant = storage.getParticipant(+req.params.id);
      participant.name = req.body.name;
      res
        .status(201)
        .json(storage.updateParticipant(+req.params.id, participant));
    });

    app.delete(`/participant/:id`, async (req, res) => {
      await storage.deleteParticipant(+req.params.id);
      res.status(204).json();
    });

    // todo: TEST ...
    app.get(`/messages`, async (req, res) => {
      res.json(Array.from(storage.getMessages()));
    });

    app.get(`/message/:id`, async (req, res) => {
      const message = storage.getMessage(+req.params.id);
      res.json(message);
    });

    app.post(`/message`, async (req, res) => {
      const participant = storage.getParticipant(req.body.participant);
      const room = storage.getRoom(req.body.room);
      const message = domainFacade.createMessage(
        participant,
        room,
        req.body.text
      );
      res.status(201).json(storage.createMessage(message));
    });

    app.put(`/message/:id`, async (req, res) => {
      const message = storage.getMessage(+req.params.id);
      message.name = req.body.name;
      res.status(201).json(storage.updateMessage(+req.params.id, message));
    });

    app.delete(`/message/:id`, async (req, res) => {
      await storage.deleteMessage(+req.params.id);
      res.status(204).json();
    });
  };
}

module.exports = { Controller };
