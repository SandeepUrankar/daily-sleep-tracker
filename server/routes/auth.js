const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const { responseGenerator } = require("../utils/response-generator");
const router = require("express").Router();
const Joi = require("joi");

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error)
    return res
      .status(400)
      .send(responseGenerator("failed", error.details[0].message));

  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res
      .status(401)
      .send(
        responseGenerator(
          "failed",
          `Username "${req.body.username}" doesn't exists.`
        )
      );
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword)
    return res
      .status(401)
      .send(responseGenerator("failed", `Invalid password.`));

  const token = user.generateAuthToken();
  res.send(responseGenerator("success", "Login Success.", token));
});

function validateUser(user) {
  const userValidator = Joi.object().keys({
    username: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(6).max(1024).required(),
  });

  const result = userValidator.validate(user);
  return result;
}

module.exports = router;
