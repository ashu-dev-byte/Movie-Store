const mongoose = require("mongoose");

const studioSchema = new mongoose.Schema({
  name: String,
  country: String,
});

module.exports = mongoose.model("Studio", studioSchema);
