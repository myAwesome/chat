class Room {
  name;
  messages;
  participants;
  lastMessageTime;
  isDirect;
  constructor(name) {
    this.name = name;
    this.isDirect = false;
    this.messages = [];
    this.participants = [];
  }

  addParticipant = (participant) => {
    if (this.isDirect && this.participants.length === 2) {
      throw new Error("cant add new participants to direct chat");
    }
    this.participants.push(participant);
  };

  removeParticipant = (participant) => {
    this.participants = this.participants.filter((p) => p !== participant);
  };

  hasParticipant = (participant) => {
    return this.participants.includes(participant);
  };

  addMessage = (message) => {
    this.messages.push(message);
    this.lastMessageTime = message.time;
  };
}
module.exports = { Room };
