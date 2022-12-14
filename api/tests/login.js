const test = require("../../domain/tests/util");
const axios = require("axios");

test.offLogs();

process.env.TEST_MODE = true;
require("../app");

const signUp = async (body) => {
  const resp = await axios.post("http://localhost:8090/sign-up", body);
  return resp.data;
};

const signIn = async (body) => {
  const resp = await axios.post("http://localhost:8090/sign-in", body);
  return resp.data;
};

const signOut = async (body) => {
  const resp = await axios.post("http://localhost:8090/sign-out", body);
  return resp.data;
};

const apiTest = async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  await sleep(500);

  const r1 = await signUp({
    name: "Donald",
    email: "trump@gmail.com",
    password: "111",
  });
  test.strictEqual(r1.success, false);
  const r2 = await signUp({
    name: "donald trump",
    email: "dt@gmail.com",
    password: "111",
  });
  test.strictEqual(r2.success, true);
  const r3 = await signIn({
    email: "duck@gmail.com",
    password: "111",
  });

  test.strictEqual(r3.id, 3);
  const r4 = await signOut({ token: 100500 });
  test.strictEqual(r4.success, true);
  test.stats();
  process.exit(0);
};

apiTest();
