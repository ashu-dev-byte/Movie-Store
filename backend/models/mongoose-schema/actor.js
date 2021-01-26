const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  country: String,
});

module.exports = mongoose.model("Actor", actorSchema);
