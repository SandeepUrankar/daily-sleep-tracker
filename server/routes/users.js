const bcrypt = require("bcrypt");
const router = require("express").Router();
const _ = require("lodash");
const { User, validateUser } = require("../models/user");
const { responseGenerator } = require("../utils/response-generator");
router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error)
    return res
      .status(400)
      .send(responseGenerator("failed", error.details[0].message));

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(401).send({
      status: "failed",
      message: `User with email "${req.body.email}" already exists`,
    });
  }

  user = await User.findOne({ username: req.body.username });
  if (user) {
    return res
      .status(401)
      .send(
        responseGenerator(
          "failed",
          `Username "${req.body.username}" already used, try other.`
        )
      );
  }

  // const salt = await bcrypt.genSalt(10);
  const salt = await bcrypt.genSalt(10);
  user = User({
    username: req.body.username,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, salt),
  });

  await user.save();

  res.send(
    responseGenerator(
      "success",
      "User created successfully",
      _.pick(user, ["_id", "username"])
    )
  );
});

module.exports = router;
