const { stats, strictEqual } = require("./util");
const { Participant } = require("../model/Participant");
const { Room } = require("../model/Room");
const { Message } = require("../model/Message");

const elon = new Participant("Elon Musk");
const steve = new Participant("Steve Jobs");
const startups = new Room("Startups");
startups.addParticipant(elon);
startups.addParticipant(steve);
strictEqual(startups.participants.length, 2);
startups.addMessage(new Message(elon, "Hi, there!"));
startups.addMessage(new Message(steve, "Hello!"));
strictEqual(startups.messages.length, 2);
console.log(startups);
stats();
