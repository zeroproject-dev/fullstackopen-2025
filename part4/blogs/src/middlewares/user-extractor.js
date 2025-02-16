const config = require("../utils/config");
const jwt = require("jsonwebtoken");

const userExtractor = async (req, res, next) => {
  if (req.token) {
    req.user = jwt.verify(req.token, config.jwtSecret);
  } else {
    return res.status(401).json({ error: "Token missing or invalid" }).end();
  }

  next();
};

module.exports = userExtractor;
