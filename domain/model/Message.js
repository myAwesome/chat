class Message {
  text;
  time;
  author;
  constructor(author, text) {
    this.author = author;
    this.text = text;
    this.time = new Date();
  }
}

module.exports = { Message };
