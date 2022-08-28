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

const getDirectChat = (p1, p2) => {
  let room = p1.getDirectChat(p2);
  if (p1.getDirectChat(p2)) {
    return room;
  }
  room = new Room(null);
  room.isDirect = true;

  room.addParticipant(p1);
  room.addParticipant(p2);

  p1.addDirectChat(room, p2);
  p2.addDirectChat(room, p1);

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
  getDirectChat,
  createGroupChat,
  sendMessage,
};
