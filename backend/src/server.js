const express = require("express");
const cors = require("cors");
const connect = require("./db.js");
require("dotenv").config();

const app = express();
const port = process.env.port;

app.use(cors());
app.use(express.json({ limit: "2MB" }));

connect();

app.listen(port, () => {
  console.log(`Server is listening on localhost:${port}.`);
});
