const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const router = require("express").Router();

router.post("/", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res
      .status(401)
      .send(`Username "${req.body.username}" doesn't exists.`);
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) return res.status(401).send(`Invalid password.`);

  const token = user.generateAuthToken();
  res.send({ token: token });
});

module.exports = router;
