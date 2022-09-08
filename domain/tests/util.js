const assert = require("assert");

const colors = {
  red: "\x1b[31m%s\x1b[0m",
  green: "\x1b[32m%s\x1b[0m",
  yellow: "\x1b[33m%s\x1b[0m",
  blue: "\x1b[34m%s\x1b[0m",
  magenta: "\x1b[35m%s\x1b[0m",
};
let passed = 0;
let failed = 0;

let testMode = true;

const offTests = () => {
  testMode = false;
};

const strictEqual = (a, b) => {
  if (!testMode) return;
  try {
    assert.strictEqual(a, b);
    console.log(colors.green, `Passed: "${a}" strictEqual "${b}"`);
    passed++;
  } catch (e) {
    console.log(colors.red, `Failed: "${a}" is not strictEqual "${b}"`);
    failed++;
  }
};

const throws = (a) => {
  if (!testMode) return;

  try {
    assert.throws(a);
    console.log(colors.green, `Passed: throws red as expected"`);
    passed++;
  } catch (e) {
    console.log(colors.red, `Failed: doesnot throws red `);
    failed++;
  }
};

const stats = () => {
  if (!testMode) return;

  console.log("-------------------------");
  if (failed) {
    console.log(colors.red, `Failed: ${failed}`);
  }
  if (passed) {
    console.log(colors.green, `Passed: ${passed}`);
  }
};

const logRequest = (req, re, next) => {
  let color;
  switch (req.method) {
    case "GET":
      color = colors.green;
      break;
    case "PUT":
    case "POST":
      color = colors.yellow;
      break;
    case "DELETE":
      color = colors.red;
      break;
  }
  console.log(color, `${req.method} - ${req.url}`);
  next();
};

module.exports = { strictEqual, throws, stats, offTests, logRequest };
