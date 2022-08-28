const test = require("./util");
// test.offTests();
const facade = require("../service/facade");

const elon = facade.createParticipant("Elon M.");
const steve = facade.createParticipant("Steve J.");
const mark = facade.createParticipant("Mark Z.");

const startups = facade.createGroupChat("Startups");
const tesla = facade.createGroupChat("Tesla");
const spaceX = facade.createGroupChat("SpaceX");

facade.joinChat(elon, startups);
test.strictEqual(elon.hasChat(startups), true);
facade.joinChat(steve, startups);
test.strictEqual(startups.participants.length, 2);
facade.sendMessage(elon, startups, "Hi, there!");
facade.sendMessage(steve, startups, "Hello!");

test.throws(() => {
  facade.sendMessage(mark, startups, "Hola!");
});
test.strictEqual(startups.messages.length, 2);
facade.joinChat(elon, tesla);
facade.joinChat(elon, spaceX);
test.strictEqual(elon.chats.length, 3);
facade.leaveChat(elon, tesla);
test.strictEqual(tesla.hasParticipant(elon), false);
test.strictEqual(elon.hasChat(tesla), false);
const elonSteveDC = facade.getDirectChat(elon, steve);

test.throws(() => {
  elonSteveDC.addParticipant(mark);
});

const steveEloneDC = facade.getDirectChat(elon, steve);
test.strictEqual(elonSteveDC.id, steveEloneDC.id);

test.stats();
