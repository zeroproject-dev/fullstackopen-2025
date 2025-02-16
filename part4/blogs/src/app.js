const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const mongoUrl = config.mongoUrl;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());
app.use(require("./middlewares/token-extractor"));

app.use("/api/users", require("./controllers/users"));
app.use("/api/auth", require("./controllers/login"));
app.use("/api/blogs", require("./controllers/blogs"));

app.use(require("./middlewares/unknown-route"));
app.use(require("./middlewares/error"));

module.exports = app;
