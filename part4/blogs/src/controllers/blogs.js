const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const config = require("../utils/config");
const jwt = require("jsonwebtoken");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });

  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const tokenPayload = jwt.verify(request.token, config.jwtSecret);

  const user = await User.findById(tokenPayload.id);

  if (!user)
    return response.status(401).json({ error: "Token missing or invalid" });

  request.body.user = user;

  const blog = new Blog(request.body);

  const result = await blog.save();

  user.blogs = user.blogs.concat(result._id);
  await user.save();

  response.status(201).json(result);
});

blogRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;

  await Blog.findByIdAndDelete(id);

  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const blog = request.body;

  const result = await Blog.findByIdAndUpdate(id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  });

  response.json(result);
});

module.exports = blogRouter;
