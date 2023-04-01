const express = require("express");
const { getUsers, signUp, signIn, verifyUser } = require("../controllers/user.controller");
const { changeRole, removeUser } = require("../controllers/user.controller");
const { verify } = require("../middleware/verify");
const userRouter = express.Router();

userRouter
  .get("/users",verify, getUsers)
  .post("/signup", signUp)
  .post("/signin", signIn)
  .delete("/delete/:id",verify, removeUser)
  .put("/changerole/:id",verify, changeRole)
  .put("/verifyuser/:code", verifyUser);

module.exports = userRouter;
