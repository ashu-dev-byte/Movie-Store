const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./models/schema");
require("dotenv").config();
const app = express();

// =========== Mongoose Configuration ==================
mongoose.connect(process.env.HOSTED_DBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection.once("open", () => {
  console.log("Successfully conneted to cloud database.");
});
// =========== Mongoose Configuration End ==============

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4001, () => {
  console.log("Server started at port 4001.");
});
