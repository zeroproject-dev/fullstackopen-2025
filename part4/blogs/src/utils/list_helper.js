const _ = require("lodash");

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map((blog) => blog.likes));
  return blogs.find((blog) => blog.likes === maxLikes);
};

const mostBlogs = (blogs) => {
  const authorWithMostBlogs = _.chain(blogs)
    .countBy("author")
    .map((blogs, author) => ({ author, blogs }))
    .maxBy("blogs")
    .value();

  return authorWithMostBlogs;
};

const mostLikes = (blogs) => {
  const authorWithMostLikes = _.chain(blogs)
    .groupBy("author")
    .map((blogs, author) => ({ author, likes: totalLikes(blogs) }))
    .maxBy("likes")
    .value();

  return authorWithMostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
