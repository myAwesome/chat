const { stats, strictEqual, throws, offTests } = require("./util");
// offTests();
const { Participant } = require("../model/Participant");
const { Room } = require("../model/Room");
const {
  joinChat,
  sendMessage,
  createDirectChat,
  leaveChat,
} = require("../service/helper");

const elon = new Participant("Elon M.");
const steve = new Participant("Steve J.");
const startups = new Room("Startups");
const tesla = new Room("Tesla");
const spaceX = new Room("SpaceX");

joinChat(elon, startups);
strictEqual(elon.hasChat(startups), true);

joinChat(steve, startups);

strictEqual(startups.participants.length, 2);
sendMessage(elon, startups, "Hi, there!");
sendMessage(steve, startups, "Hello!");
strictEqual(startups.messages.length, 2);

joinChat(elon, tesla);
joinChat(elon, spaceX);
strictEqual(elon.chats.length, 3);

leaveChat(elon, tesla);
strictEqual(tesla.hasParticipant(elon), false);
strictEqual(elon.hasChat(tesla), false);

const elonSteveDirectConversation = createDirectChat(elon, steve);

throws(() => {
  const mark = new Participant("Mark Z.");
  elonSteveDirectConversation.addParticipant(mark);
});

stats();
