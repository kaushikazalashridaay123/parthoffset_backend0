const express = require("express");
const authRouter = express.Router();
const { login, logout,currentUser } = require("../controllers/auth.controller");

authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/currentUser",currentUser);

module.exports = authRouter;
