const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 3000;
const app = express();

const user = require(`./routes/user.routes`);

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", user);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

module.exports = app;
