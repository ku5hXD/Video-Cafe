const express = require("express");
const User = require("../models/Users");

const cors = require("cors");
const route = express.Router();

route.post("/signup", async (req, res) => {
  console.log(req.body)
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

route.post("/login", async (req, res) => {
  console.log(req.body)
  try {
    const user = await User.findByCrendentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();

    res.send({ user, token }); // here user call toJSON method automatically
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = route;
