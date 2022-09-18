const test = require("../../domain/tests/util");
const axios = require("axios");

test.offLogs();

process.env.TEST_MODE = true;
require("../app");

const signUp = async (body) => {
  await axios.post("http://localhost:8090/sign-up", body);
};

const signIn = async (body) => {
  return await axios.post("http://localhost:8090/sign-in", body);
};

const signOut = async (body) => {
  await axios.post("http://localhost:8090/sign-out", body);
};

const apiTest = async () => {
  await signUp({
    name: "donald trump",
    email: "dt@gmail.com",
    password: "111",
  });
  await signIn({ email: "dt@gmail.com", password: "111" });
  await signOut({ token: "token.data[0].token" });

  //
  // test.strictEqual(rooms.data.length, 2);
  // test.strictEqual(rooms.data[0].id, 1);
  // test.strictEqual(rooms.data[0].name, "Island");

  test.stats();
  process.exit(0);
};

apiTest();
