const express = require("express");
const User = require("../models/Users");
const Auth = require("../middleware/Auth");
const route = express.Router();

route.post("/signup", async (req, res) => {
  console.log(req.body)
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();

    // cookie code
    res.cookie('token', token, { httpOnly: true });

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
    console.log(user)
    const token = await user.generateAuthToken();

    // cookie code
    res.cookie('token', token, { httpOnly: true });

    res.status(200).send({ user, token }); // here user call toJSON method automatically
  } catch (e) {
    res.status(400).send(e);
  }
});



module.exports = route;
