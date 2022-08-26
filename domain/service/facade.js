const { Message } = require("../model/Message");
const { Room } = require("../model/Room");
const { Participant } = require("../model/Participant");

const joinChat = (participant, chat) => {
  if (chat.hasParticipant(participant)) {
    throw new Error("Already participant");
  }
  participant.addChat(chat);
  chat.addParticipant(participant);
};

const leaveChat = (participant, chat) => {
  if (!chat.hasParticipant(participant)) {
    throw new Error("Not a participant");
  }
  participant.removeChat(chat);
  chat.removeParticipant(participant);
};

const sendMessage = (participant, chat, text) => {
  if (!chat.hasParticipant(participant)) {
    throw new Error("Only participants can send a message");
  }
  const message = new Message(participant, text);
  chat.addMessage(message);
};

const createDirectChat = (p1, p2) => {
  // todo: check if exist
  const room = new Room(null);
  room.addParticipant(p1);
  room.addParticipant(p2);
  room.isDirect = true;
  return room;
};

const createParticipant = (name) => {
  return new Participant(name);
};

const createGroupChat = (name) => {
  return new Room(name);
};

module.exports = {
  createParticipant,
  joinChat,
  leaveChat,
  createDirectChat,
  createGroupChat,
  sendMessage,
};
