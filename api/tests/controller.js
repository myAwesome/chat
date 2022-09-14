const test = require("../../domain/tests/util");
const axios = require("axios");

test.offLogs();
require("../app");

const createRoom = async (name) => {
  await axios.post("http://localhost:8090/room", { name });
};

const getRooms = async () => {
  return await axios.get("http://localhost:8090/rooms");
};

const updateRoom = async () => {
  await axios.put("http://localhost:8090/room/1", { name: "Island TV" });
};
const getRoom = async () => {
  return await axios.get("http://localhost:8090/room/1");
};
const deleteRoom = async () => {
  await axios.delete("http://localhost:8090/room/1");
};

const apiTest = async () => {
  await createRoom("Island");
  const rooms = await getRooms();
  test.strictEqual(rooms.data.length, 1);
  test.strictEqual(rooms.data[0].id, 1);
  test.strictEqual(rooms.data[0].name, "Island");
  await updateRoom();
  const room = await getRoom();
  test.strictEqual(room.data.name, "Island TV");
  await deleteRoom();
  const rooms2 = await getRooms();
  test.strictEqual(rooms2.data.length, 0);
  test.stats();
  process.exit(0);
};

apiTest();
