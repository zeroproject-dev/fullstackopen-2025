const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const app = require("../src/app");
const mongoose = require("mongoose");

const supertest = require("supertest");
const api = supertest(app);

const Blog = require("../src/models/blog");

beforeEach(async () => {
  Blog.deleteMany({});
});

test.only("blogs are returned as json array", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert(response.body.length === 0);
});

after(() => {
  mongoose.connection.close();
});
