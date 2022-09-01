const test = require("./util");
// test.offTests();
const facade = require("../service/facade");
const { StorageInMemory } = require("../service/storage");
const storageService = new StorageInMemory();
const elon = facade.createParticipant("Elon M.");
storageService.createParticipant(elon);
test.strictEqual(storageService.getParticipant(elon.id).id, elon.id);

const startups = facade.createGroupRoom("Startups");
storageService.createRoom(startups);
test.strictEqual(storageService.getRoom(startups.id).id, startups.id);

test.stats();
