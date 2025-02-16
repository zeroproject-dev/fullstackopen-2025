const { test, after, beforeEach, describe } = require("node:test");
const listHelper = require("../src/utils/list_helper");
const assert = require("node:assert");
const app = require("../src/app");
const mongoose = require("mongoose");

const supertest = require("supertest");
const api = supertest(app);

const Blog = require("../src/models/blog");
const User = require("../src/models/user");
const userUtils = require("../src/utils/user");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(listHelper.initialBlogs);
  await User.deleteMany({});
  await User.insertMany(userUtils.initialUsers);
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

test("a valid blog can not be added without token", async () => {
  const newBlog = {
    title: "Test 2 blog",
    likes: 3,
    author: "zeroproject",
    url: "https://zeroproject.dev",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(401)
    .expect("Content-Type", /application\/json/);
});

test("a valid blog can be added with token", async () => {
  const newBlog = {
    title: "Test 2 blog",
    likes: 3,
    author: "zeroproject",
    url: "https://zeroproject.dev",
  };

  const loginResponse = await api
    .post("/api/auth/login")
    .send({
      username: "admin",
      password: "admin",
    })
    .expect(200);

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${loginResponse.body.token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogs = await Blog.find({});

  assert(blogs.length === listHelper.initialBlogs.length + 1);
});

test("a blog without likes field will default to 0", async () => {
  const newBlog = {
    title: "Test blog without likes",
    author: "zeroproject",
    url: "https://zeroproject.dev",
  };

  const loginResponse = await api
    .post("/api/auth/login")
    .send({
      username: "admin",
      password: "admin",
    })
    .expect(200);

  const response = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${loginResponse.body.token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.likes, 0);
});

test("a blog without title and url will return 400", async () => {
  const newBlog = {
    author: "zeroproject",
  };

  const loginResponse = await api
    .post("/api/auth/login")
    .send({
      username: "admin",
      password: "admin",
    })
    .expect(200);

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${loginResponse.body.token}`)
    .send(newBlog)
    .expect(400);
});

describe("test delete endpoint", () => {
  let token = null;

  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});
    await User.insertMany(userUtils.initialUsers);

    const loginResponse = await api
      .post("/api/auth/login")
      .send({
        username: "admin",
        password: "admin",
      })
      .expect(200);
    token = loginResponse.body.token;
    const jwt = require("jsonwebtoken");
    require("dotenv").config();
    const config = require("../src/utils/config");
    const tokenPayload = jwt.verify(token, config.jwtSecret);

    await Blog.insertMany(
      listHelper.initialBlogs.map((blog) => ({
        ...blog,
        user: tokenPayload.id,
      })),
    );
  });

  test("delete a blog with the id", async () => {
    let blogs = await Blog.find({});
    const blogId = blogs[0]._id.toString();

    await api
      .delete(`/api/blogs/${blogId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    blogs = await Blog.find({});

    assert.strictEqual(blogs.length, 0);
  });
});

describe("test update endpoint", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(listHelper.initialBlogs);
  });

  test("update a blog with the id", async () => {
    let blogs = (await api.get("/api/blogs")).body;
    const prevBlog = blogs[0];

    prevBlog.likes += 1;

    const response = await api
      .put(`/api/blogs/${prevBlog.id}`)
      .send(prevBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.deepStrictEqual(response.body, prevBlog);
  });
});

after(() => {
  mongoose.connection.close();
});
