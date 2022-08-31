class Message {
  id;
  text;
  time;
  author;
  room;
  constructor(author, text, room) {
    this.author = author;
    this.room = room;
    this.text = text;
    this.time = new Date();
  }
}

module.exports = { Message };
