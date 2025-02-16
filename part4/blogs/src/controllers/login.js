const router = require("express").Router();
const config = require("../utils/config");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async (request, response) => {
  const { body } = request;
  if (body.username === undefined || body.password === undefined) {
    return response.status(400).json({ error: "username or password missing" });
  }

  const user = await User.findOne({ username: body.username });

  if (!user) return response.status(401).json({ error: "invalid username" });

  const isValidPassword = await bcrypt.compare(body.password, user.password);

  if (!isValidPassword)
    return response.status(401).json({ error: "invalid password" });

  const tokenPayload = {
    username: user.username,
    name: user.name,
    id: user._id.toString(),
  };

  const token = jwt.sign(tokenPayload, config.jwtSecret);

  return response
    .status(200)
    .json({ token, username: tokenPayload.username, name: tokenPayload.name });
});

module.exports = router;
