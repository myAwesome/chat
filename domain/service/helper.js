const { Message } = require("../model/Message");
const { Room } = require("../model/Room");

const joinChat = (participant, chat) => {
  participant.addChat(chat);
  chat.addParticipant(participant);
};

const leaveChat = (participant, chat) => {
  participant.removeChat(chat);
  chat.removeParticipant(participant);
};

const sendMessage = (participant, chat, text) => {
  const message = new Message(participant, text);
  chat.addMessage(message);
};

const createDirectChat = (p1, p2) => {
  const room = new Room(null);
  room.addParticipant(p1);
  room.addParticipant(p2);
  room.isDirect = true;
  return room;
};

module.exports = {
  joinChat,
  leaveChat,
  sendMessage,
  createDirectChat,
};
