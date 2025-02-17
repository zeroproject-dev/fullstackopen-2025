require("dotenv").config();

const NODE_ENV = process.env.NODE_ENV || "development";
const MONGODB_URI =
  NODE_ENV === "test" ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI;
const PORT = process.env.PORT || 3003;
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  nodeEnv: NODE_ENV,
  mongoUrl: MONGODB_URI,
  port: PORT,
  jwtSecret: JWT_SECRET,
};
