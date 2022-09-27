const kenx = require("knex");
// if (process.env.TEST_MODE) {
//   process.env.DB_SCHEME = `${process.env.DB_SCHEME}_test`;
// }
const db = kenx({
  client: "pg",
  connection: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_SCHEME}`,
});

class StorageInPostgreSql {
  createRoom = async (room) => {
    await db("room").insert(room.toDb(), ["id"]);
    return room;
  };

  updateRoom = async (room) => {
    await db("room").where({ id: room.id }).update(room.toDb());
    return room;
  };

  getRooms = async () => {
    return db("room").select();
  };

  getRoom = async (room) => {
    return db("room").select().where(room).first();
  };

  deleteRoom = async (id) => {
    return db("room").where({ id }).del();
  };

  createMessage = async (message) => {
    await db("message").insert(message.toDb(), ["id"]);
    return message;
  };

  updateMessage = async (message) => {
    await db("message").where({ id: message.id }).update(message.toDb());
    return message;
  };

  getMessage = async (message) => {
    return db("message").select(message).first();
  };

  getMessages = async () => {
    return db("message").select();
  };

  deleteMessage = async (id) => {
    return db("message").where({ id }).del();
  };

  createParticipant = async (participant) => {
    await db("participant").insert(participant.toDb(), ["id"]);
    return participant;
  };

  updateParticipant = async (participant) => {
    console.log(participant.id, participant.toDb());
    await db("participant")
      .where({ id: participant.id })
      .update(participant.toDb());
    return participant;
  };

  getParticipant = async (participant) => {
    return db("participant").select().where(participant).first();
  };

  getParticipants = async () => {
    return db("participant").select();
  };

  deleteParticipant = async (id) => {
    return db("participant").where({ id }).del();
  };
}

module.exports = {
  StorageInPostgreSql,
};
