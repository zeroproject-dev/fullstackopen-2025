const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const userExtractor = require("../middlewares/user-extractor");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });

  response.json(blogs);
});

blogRouter.post("/", userExtractor, async (request, response) => {
  const user = await User.findById(request.user.id);

  if (!user)
    return response.status(401).json({ error: "Token missing or invalid" });

  request.body.user = user;

  const blog = new Blog(request.body);

  const result = await blog.save();

  user.blogs = user.blogs.concat(result._id);
  await user.save();

  response.status(201).json(result);
});

blogRouter.delete("/:id", userExtractor, async (request, response) => {
  const id = request.params.id;

  const blog = await Blog.findById(id);

  if (blog.user?.toString() === request.user.id) {
    await Blog.findByIdAndDelete(id);
    return response.status(204).end();
  } else {
    return response.status(401).json({ error: "Token missing or invalid" });
  }
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
