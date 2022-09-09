const kenx = require("knex");
const db = kenx({
  client: "pg",
  connection: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_SCHEME}`,
});

class StorageInPostgreSql {
  constructor() {
    this.participants = new Map();
    this.messages = new Map();
  }

  createRoom = async (room) => {
    await db("room").insert(room.toDb(), ["id"]);
    return room;
  };

  updateRoom = async (room) => {
    console.log(room);
    await db("room").where({ id: room.id }).update(room.toDb());
    return room;
  };

  getRooms = async () => {
    return db("room").select();
  };

  getRoom = async (id) => {
    return db("room").select().where({ id });
  };

  deleteRoom = async (id) => {
    return db("room").where({ id }).del();
  };

  //
  //

  createMessage = (message) => {
    this.messages.set(message.id, message);
    return message;
  };

  updateMessage = (message) => {
    this.messages.set(message.id, message);
    return message;
  };

  getMessage = (id) => {
    return this.messages.get(id);
  };

  getMessages = () => {
    return this.messages;
  };

  deleteMessage = (id) => {
    this.messages.delete(id);
    return id;
  };

  createParticipant = (participant) => {
    this.participants.set(participant.id, participant);
    return participant;
  };

  updateParticipant = (participant) => {
    this.participants.set(participant.id, participant);
    return participant;
  };

  getParticipant = (id) => {
    return this.participants.get(id);
  };

  getParticipants = () => {
    return this.participants;
  };

  deleteParticipant = (id) => {
    this.participants.delete(id);
    return id;
  };
}

module.exports = {
  StorageInPostgreSql,
};
