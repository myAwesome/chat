class Message {
  id;
  text;
  time;
  author;
  room;
  static nextId = 0;
  constructor(author, text, room) {
    this.id = ++Message.nextId;
    this.author = author;
    this.room = room;
    this.text = text;
    this.time = new Date();
  }

  toJSON = () => {
    return {
      id: this.id,
      text: this.text,
      time: this.time,
      author: {
        id: this.author.id,
        name: this.author.name,
      },
    };
  };

  toDb = () => {
    return {
      text: this.text,
      time: this.time,
    };
  };
}

module.exports = { Message };
