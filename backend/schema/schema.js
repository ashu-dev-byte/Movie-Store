const graphql = require("graphql");
const { GraphQLObjectType, GraphQLSchema, GraphQLString } = graphql;

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    Movie: {
      type: MovieType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // code
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
