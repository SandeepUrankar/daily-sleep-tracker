const mongoose = require("mongoose");
function connectDB() {
  const MONGO_URI = process.env.MONGO_URI;
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log("Connected to DB."))
    .catch((e) => console.log(`Error in connecting to DB...`, e.message));
}
module.exports = { connectDB };
