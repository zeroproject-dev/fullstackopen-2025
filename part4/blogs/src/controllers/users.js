const bcrypt = require("bcrypt");
const router = require("express").Router();
const User = require("../models/user");

router.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

router.post("/", async (request, response) => {
  const plainPassword = request.body?.password;

  if (!plainPassword || plainPassword.length < 3) {
    return response.status(400).json({
      error: "Password is required and must be at least 3 characters long",
    });
  }

  const password = bcrypt.hashSync(plainPassword, 10);

  const user = new User({ ...request.body, password });

  const result = await user.save();
  response.status(201).json(result);
});

module.exports = router;
