const { Message } = require("../model/Message");
const { Room } = require("../model/Room");
const { Participant } = require("../model/Participant");

const joinRoom = (participant, room) => {
  if (room.hasParticipant(participant)) {
    throw new Error("Already participant");
  }
  participant.addRoom(room);
  room.addParticipant(participant);
};

const leaveRoom = (participant, room) => {
  if (!room.hasParticipant(participant)) {
    throw new Error("Not a participant");
  }
  participant.removeRoom(room);
  room.removeParticipant(participant);
};

const createMessage = (participant, room, text) => {
  if (!room.hasParticipant(participant)) {
    throw new Error("Only participants can send a message");
  }

  const message = new Message(participant, text);
  room.addMessage(message);
  return message;
};

const getDirectRoom = (p1, p2) => {
  let room = p1.getDirectRoom(p2);
  if (p1.getDirectRoom(p2)) {
    return room;
  }
  room = new Room(null);
  room.isDirect = true;

  room.addParticipant(p1);
  room.addParticipant(p2);

  p1.addDirectRoom(room, p2);
  p2.addDirectRoom(room, p1);

  return room;
};

const createParticipant = (obj) => {
  const participant = new Participant(obj.name);
  participant.email = obj.email;
  participant.password = obj.password;
  participant.token = obj.token;
  return participant;
};

const createGroupRoom = (name) => {
  return new Room(name);
};

module.exports = {
  createParticipant,
  joinRoom,
  leaveRoom,
  getDirectRoom,
  createGroupRoom,
  createMessage,
};
