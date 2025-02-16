const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const app = require("../src/app");
const mongoose = require("mongoose");
const User = require("../src/models/user");
const userUtils = require("../src/utils/user");

const supertest = require("supertest");
const api = supertest(app);

describe("User Creations", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await User.insertMany(userUtils.initialUsers);
  });

  test("Post invalid user", async () => {
    let users = await User.find({});

    await api
      .post("/api/users")
      .send({
        name: "test",
      })
      .expect(400)
      .expect("Content-Type", /application\/json/);

    assert(users.length === userUtils.initialUsers.length);
  });

  test("Post valid user", async () => {
    const newUser = {
      name: "test",
      username: "test",
      password: "test",
    };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const users = await User.find({});

    assert.strictEqual(response.body.name, newUser.name);
    assert.strictEqual(response.body.username, newUser.username);
    assert.strictEqual(users.length, userUtils.initialUsers.length + 1);
  });
});
