const { stats, strictEqual, throws, offTests } = require("./util");
// offTests();
const { Participant } = require("../model/Participant");
const { Room } = require("../model/Room");
const helper = require("../service/helper");

const elon = new Participant("Elon M.");
const steve = new Participant("Steve J.");
const mark = new Participant("Mark Z.");

const startups = new Room("Startups");
const tesla = new Room("Tesla");
const spaceX = new Room("SpaceX");

helper.joinChat(elon, startups);
strictEqual(elon.hasChat(startups), true);
helper.joinChat(steve, startups);
strictEqual(startups.participants.length, 2);
helper.sendMessage(elon, startups, "Hi, there!");
helper.sendMessage(steve, startups, "Hello!");
throws(() => {
  helper.sendMessage(mark, startups, "Hola!");
});
strictEqual(startups.messages.length, 2);
helper.joinChat(elon, tesla);
helper.joinChat(elon, spaceX);
strictEqual(elon.chats.length, 3);
helper.leaveChat(elon, tesla);
strictEqual(tesla.hasParticipant(elon), false);
strictEqual(elon.hasChat(tesla), false);
const elonSteveDirectConversation = helper.createDirectChat(elon, steve);
throws(() => {
  elonSteveDirectConversation.addParticipant(mark);
});

stats();
