const { test, after, beforeEach, describe } = require("node:test");
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

test("blogs are returned as json array", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert(response.body.length === listHelper.initialBlogs.length);
});

test("blogs id field is named id", async () => {
  const response = await api.get("/api/blogs");
  response.body.forEach((blog) => {
    assert(!!blog.id);
    assert(!blog._id);
  });
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Test 2 blog",
    likes: 3,
    author: "zeroproject",
    url: "https://zeroproject.dev",
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.deepStrictEqual(response.body, { ...newBlog, id: response.body.id });

  const blogs = await Blog.find({});

  assert(blogs.length === listHelper.initialBlogs.length + 1);
});

test("a blog without likes field will default to 0", async () => {
  const newBlog = {
    title: "Test blog without likes",
    author: "zeroproject",
    url: "https://zeroproject.dev",
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.deepStrictEqual(response.body, {
    ...newBlog,
    likes: 0,
    id: response.body.id,
  });
});

test("a blog without title and url will return 400", async () => {
  const newBlog = {
    author: "zeroproject",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

describe("test delete endpoint", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(listHelper.initialBlogs);
  });

  test("delete a blog with the id", async () => {
    let blogs = await Blog.find({});
    const blogId = blogs[0]._id.toString();

    await api.delete(`/api/blogs/${blogId}`).expect(204);

    blogs = await Blog.find({});

    assert.strictEqual(blogs.length, 0);
  });
});

after(() => {
  mongoose.connection.close();
});
