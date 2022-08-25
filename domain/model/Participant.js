class Participant {
  name;
  chats;
  constructor(name) {
    this.name = name;
    this.chats = [];
  }

  addChat = (chat) => {
    this.chats.push(chat);
  };

  removeChat = (chat) => {
    this.chats = this.chats.filter((c) => c !== chat);
  };

  hasChat = (chat) => {
    return this.chats.includes(chat);
  };
}

module.exports = { Participant };
