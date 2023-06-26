const bcrypt = require("bcrypt");
const router = require("express").Router();
const _ = require("lodash");
const { User } = require("../models/user");
router.post("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res
      .status(401)
      .send(`User with email "${req.body.email}" already exists`);
  }

  user = await User.findOne({ username: req.body.username });
  if (user) {
    return res
      .status(401)
      .send(`Username "${req.body.username}" already used, try other.`);
  }

  // const salt = await bcrypt.genSalt(10);
  const salt = await bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    hash(body.pass, salt, (err, hash) => {
      if (err) throw err;
      body.pass = hash;
    })
  });
  user = User({
    username: req.body.username,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, salt),
  });

  await user.save();

  res.send({
    message: "User created successfully",
    data: _.pick(user, ["_id", "username"]),
  });
});

module.exports = router;
