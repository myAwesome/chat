const test = require("../../domain/tests/util");
const axios = require("axios");

test.offLogs();
process.env.TEST_MODE = true;
require("../app");

const createRoom = async (data, config) => {
  return await axios.post("http://localhost:8090/room", data, config);
};

const getRooms = async (config) => {
  return await axios.get("http://localhost:8090/rooms", config);
};

const updateRoom = async () => {
  await axios.put("http://localhost:8090/room/1", { name: "Island TV" });
};
const getRoom = async () => {
  return await axios.get("http://localhost:8090/room/1");
};
const deleteRoom = async () => {
  await axios.delete("http://localhost:8090/room/2");
};

const createParticipant = async (name) => {
  await axios.post("http://localhost:8090/participant", { name });
};

const getParticipants = async () => {
  return await axios.get(`http://localhost:8090/participants`);
};

const updateParticipant = async (id, name) => {
  await axios.put(`http://localhost:8090/participant/${id}`, { name });
};
const getParticipant = async (id) => {
  return await axios.get(`http://localhost:8090/participant/${id}`);
};
const deleteParticipant = async (id) => {
  await axios.delete(`http://localhost:8090/participant/${id}`);
};

const joinRoom = async (r, p) => {
  await axios.put(`http://localhost:8090/room/${r}/participant/${p}`);
};
const leaveRoom = async (r, p) => {
  await axios.delete(`http://localhost:8090/room/${r}/participant/${p}`);
};

const getMessages = async () => {
  return await axios.get("http://localhost:8090/messages");
};

const getMessage = async (id) => {
  return await axios.get(`http://localhost:8090/message/${id}`);
};

const createMessage = async (data) => {
  return await axios.post(`http://localhost:8090/message`, data);
};

const updateMessage = async (id, data) => {
  return await axios.put(`http://localhost:8090/message/${id}`, data);
};

const deleteMessage = async (id) => {
  return await axios.delete(`http://localhost:8090/message/${id}`);
};

const apiTest = async () => {
  const config = {headers:{token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImR1Y2tAZ21haWwuY29tIiwiaWF0IjoxNjY3MjgyMDgwLCJleHAiOjE2Njc4ODY4ODB9.9oz0fqIrLqUFSCv84X7m5L8Ly_aYfnVoi_EcP9plqJI'}};
  const isl = await createRoom({name:"Island"}, config);
  console.log(isl.data)
  // await createRoom({name:"Zakrutka"}, config);

  // const rooms = await getRooms(config);
  //
  // test.strictEqual(rooms.data.length, 2);
  // test.strictEqual(rooms.data[0].id, 1);
  // test.strictEqual(rooms.data[0].name, "Island");
  // await updateRoom();
  // const island_tv = await getRoom();
  // test.strictEqual(island_tv.data.name, "Island TV");
  // await deleteRoom();
  // const rooms2 = await getRooms();
  // test.strictEqual(rooms2.data.length, 1);
  // console.log("----");
  // await createParticipant("Petrov");
  // await createParticipant("Ivanov");
  // await createParticipant("Grishin");
  // await createParticipant("Senkiv");
  // await createParticipant("Skripin");
  // const participants4 = await getParticipants();
  // test.strictEqual(participants4.data.length, 5);
  // test.strictEqual(participants4.data[0].id, 1);
  // test.strictEqual(participants4.data[0].name, "Petrov");
  // await updateParticipant(1, "Vova Petrov");
  // const petrov = await getParticipant(1);
  // test.strictEqual(petrov.data.name, "Vova Petrov");
  // await deleteParticipant(4);
  // const participants = await getParticipants();
  // test.strictEqual(participants.data.length, 4);
  // console.log("----");
  // await joinRoom(1, 1);
  // await joinRoom(1, 2);
  // await joinRoom(1, 3);
  // await joinRoom(1, 5);
  // test.strictEqual((await getRooms()).data[0].participants.length, 4);
  // await leaveRoom(1, 5);
  // test.strictEqual((await getRooms()).data[0].participants.length, 3);
  //
  // await createMessage({ room: 1, participant: 1, text: "Hello" });
  // await createMessage({ room: 1, participant: 2, text: "Dobrogo dnya" });
  // await createMessage({ room: 1, participant: 3, text: "buenos dias" });
  // test.strictEqual((await getMessages()).data.length, 3);

  test.stats();
  process.exit(0);
};

apiTest();
