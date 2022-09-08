const test = require("./util");
// test.offTests();
const facade = require("../service/facade");

const elon = facade.createParticipant("Elon M.");
const steve = facade.createParticipant("Steve J.");
const mark = facade.createParticipant("Mark Z.");

const startups = facade.createGroupRoom("Startups");
const tesla = facade.createGroupRoom("Tesla");
const spaceX = facade.createGroupRoom("SpaceX");

facade.joinRoom(elon, startups);
test.strictEqual(elon.hasRoom(startups), true);
facade.joinRoom(steve, startups);
test.strictEqual(startups.participants.length, 2);
facade.createMessage(elon, startups, "Hi, there!");
facade.createMessage(steve, startups, "Hello!");

test.throws(() => {
  facade.createMessage(mark, startups, "Hola!");
});
test.strictEqual(startups.messages.length, 2);
facade.joinRoom(elon, tesla);
facade.joinRoom(elon, spaceX);
test.strictEqual(elon.rooms.length, 3);
facade.leaveRoom(elon, tesla);
test.strictEqual(tesla.hasParticipant(elon), false);
test.strictEqual(elon.hasRoom(tesla), false);
const elonSteveDC = facade.getDirectRoom(elon, steve);

test.throws(() => {
  elonSteveDC.addParticipant(mark);
});

const steveEloneDC = facade.getDirectRoom(elon, steve);
test.strictEqual(elonSteveDC.id, steveEloneDC.id);

test.stats();
