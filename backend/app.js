const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
  })
);

app.listen(4001, () => {
  console.log("Server started at port 4001.");
});
