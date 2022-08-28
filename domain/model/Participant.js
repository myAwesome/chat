class Participant {
  id;
  name;
  chats;
  directChats;
  static nextId = 0;
  constructor(name) {
    this.id = ++Participant.nextId;
    this.name = name;
    this.chats = [];
    this.directChats = new Map();
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

  addDirectChat = (chat, p2) => {
    this.directChats.set(p2.id, chat);
    this.addChat(chat);
  };

  removeDirectChat = (chat, p2) => {
    this.directChats.delete(p2.id);
    this.removeChat(chat);
  };

  getDirectChat = (p2) => {
    return this.directChats.get(p2.id);
  };
}

module.exports = { Participant };
