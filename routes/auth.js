const express = require("express");
const User = require("../models/user");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

authRouter.post("/signup", (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, existingUser) => {
    if (err) {
      res.status(500).json(err.message);
    } else if (existingUser !== null) {
      res.status(400).json("That username already exists!");
    }
    const newUser = new User(req.body);
    newUser.save((err, user) => {
      if (err) return res.status(500).send({ success: false, err });
      const token = jwt.sign(user.withoutPassword(), process.env.SECRET);
      return res.status(201).send({ user: user.withoutPassword(), token });
    });
  });
});

authRouter.post("/login", (req, res, next) => {
  User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
    if (err) {
      res.status(500).json(err.message);
    } else if (!user) {
      res.status(403).json("Username or password are incorrect");
    }
    user.checkPassword(req.body.password, (err, match) => {
      if (err) return res.status(500).json(err);
      if (!match)
        return res
          .status(401)
          .json({ message: "Username or password are incorrect" });
      const token = jwt.sign(user.withoutPassword(), process.env.SECRET);
      return res.json({ user: user.withoutPassword(), token });
    });
  });
});

module.exports = authRouter;
