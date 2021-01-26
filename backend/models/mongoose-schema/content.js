const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  name: String,
  yearOfRelease: Number,
  contentCategory: String,
  genre: [String],
  country: String,
  budget: Number,
  boxOfficeCollection: Number,
  boxOfficeStatus: String,
  directorId: String,
  studioId: String,
  castId: [String],
});

module.exports = mongoose.model("Content", contentSchema);
