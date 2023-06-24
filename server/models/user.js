const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const userSchema = mongoose.Schema({
  username: {
    type: String,
    min: 5,
    max: 50,
    required: true,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    min: 5,
  },
  password: {
    type: String,
    max: 1024,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, username: this.username, isAdmin: this.isAdmin || false },
    JWT_SECRET,
    {
      expiresIn: "30 days",
    }
  );
  return token;
};

const User = new mongoose.model("User", userSchema);

module.exports = { User };
