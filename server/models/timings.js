const mongoose = require("mongoose");

const timingsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  timings: [
    {
      date: { type: String, required: true },
      sleeptime: { type: String, required: true },
      waketime: { type: String, required: true },
      duration: { type: String, required: true },
    },
  ],
});

const Timings = mongoose.model("Timings", timingsSchema);

module.exports = { Timings };
