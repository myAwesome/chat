const test = require("./util");
// test.offTests();
const facade = require("../service/facade");
const { Storage } = require("../service/storage");
const storageService = new Storage();
const elon = facade.createParticipant("Elon M.");
storageService.saveParticipant(elon);
test.strictEqual(storageService.getParticipant(elon.id).id, elon.id);

const startups = facade.createGroupRoom("Startups");
storageService.createRoom(startups);
test.strictEqual(storageService.getRoom(startups.id).id, startups.id);

test.stats();
