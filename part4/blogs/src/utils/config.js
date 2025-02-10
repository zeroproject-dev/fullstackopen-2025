require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/bloglist";
const PORT = process.env.PORT || 3003;

module.exports = {
  mongoUrl: MONGODB_URI,
  port: PORT,
};
