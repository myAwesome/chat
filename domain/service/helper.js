const { Message } = require("../model/Message");
const { Room } = require("../model/Room");

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

module.exports = {
  joinChat,
  leaveChat,
  sendMessage,
  createDirectChat,
};
