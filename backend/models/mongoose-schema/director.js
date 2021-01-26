const mongoose = require("mongoose");

const directorSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  country: String,
});

module.exports = mongoose.model("Director", directorSchema);
