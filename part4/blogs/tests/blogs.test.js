const { test, after, beforeEach } = require("node:test");
const listHelper = require("../src/utils/list_helper");
const assert = require("node:assert");
const app = require("../src/app");
const mongoose = require("mongoose");

const supertest = require("supertest");
const api = supertest(app);

const Blog = require("../src/models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(listHelper.initialBlogs);
});

test.only("blogs are returned as json array", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert(response.body.length === listHelper.initialBlogs.length);
});

test.only("blogs id field is named id", async () => {
  const response = await api.get("/api/blogs");
  response.body.forEach((blog) => {
    assert(!!blog.id);
    assert(!blog._id);
  });
});

after(() => {
  mongoose.connection.close();
});
