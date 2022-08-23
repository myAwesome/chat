class Room {
  name;
  messages;
  participants;
  lastMessageTime;

  constructor(name) {
    this.name = name;
    this.messages = [];
    this.participants = [];
  }

  addParticipant = (participant) => {
    this.participants.push(participant);
  };

  addMessage = (message) => {
    this.messages.push(message);
    this.lastMessageTime = message.time;
  };
}
module.exports = { Room };
