const bcrypt = require("bcrypt");
const router = require("express").Router();
const User = require("../models/user");
const utilUser = require("../utils/user");

router.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

router.post("/", async (request, response) => {
  const userError = utilUser.validateUser(request.body);

  if (userError !== null) return response.status(400).json(userError);

  const password = bcrypt.hashSync(request.body.password, 10);

  const user = new User({ ...request.body, password });

  const result = await user.save();
  response.status(201).json(result);
});

module.exports = router;
