const graphql = require("graphql");
const _ = require("lodash");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
} = graphql;

// dummy data
const movies = [
  {
    name: "The Lord of the Rings",
    genre: ["Fantasy", "Sci-fi"],
    id: "1",
    directorId: "4",
    studioId: "2",
    castId: ["1", "2"],
  },
  {
    name: "The Old Gaurd",
    genre: ["Fantasy"],
    id: "2",
    directorId: "2",
    studioId: "1",
    castId: ["2", "4"],
  },
  {
    name: "Ready Player One",
    genre: ["Sci-Fi"],
    id: "3",
    directorId: "1",
    studioId: "1",
    castId: ["2", "3"],
  },
  {
    name: "Thw Shape of Water",
    genre: ["Fantasy"],
    id: "4",
    directorId: "3",
    studioId: "2",
    castId: ["3", "4"],
  },
  {
    name: "War",
    genre: ["Action", "Drama"],
    id: "5",
    directorId: "1",
    studioId: "1",
    castId: ["1", "4"],
  },
  {
    name: "Cargo",
    genre: ["Sci-Fi", "Drama"],
    id: "6",
    directorId: "1",
    studioId: "1",
    castId: ["1", "3"],
  },
];

const directors = [
  { name: "Siddharth Anand", age: 44, id: "1" },
  { name: "Anurag Kashyap", age: 42, id: "2" },
  { name: "Sanjay Leela Bhansali", age: 66, id: "3" },
  { name: "Vishal Bhardwaj", age: 52, id: "4" },
];

const studios = [
  { name: "Red Chillies Ent.", id: "1" },
  { name: "Dharma Productions", id: "2" },
];

const actors = [
  { name: "ShahRukh Khan", gender: "Male", age: 56, id: "1" },
  { name: "Salman Khan", gender: "Male", age: 55, id: "2" },
  { name: "Katrina Kaif", gender: "Female", age: 34, id: "3" },
  { name: "Alia Bhatt", gender: "Female", age: 29, id: "4" },
];

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    yearOfRelease: { type: GraphQLInt },
    budget: { type: GraphQLInt },
    collection: { type: GraphQLInt },
    status: { type: GraphQLBoolean },
    genre: { type: new GraphQLList(GraphQLString) },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        return _.find(directors, { id: parent.directorId });
      },
    },
    studio: {
      type: StudioType,
      resolve(parent, args) {
        return _.find(studios, { id: parent.studioId });
      },
    },
    actors: {
      type: new GraphQLList(ActorType),
      resolve(parent, args) {
        return actors.filter((actor) => parent.castId.includes(actor.id));
      },
    },
  }),
});

const ActorType = new GraphQLObjectType({
  name: "Actor",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    gender: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return movies.filter((movie) => movie.castId.includes(parent.id));
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    gender: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return _.filter(movies, { directorId: parent.id });
      },
    },
  }),
});

const StudioType = new GraphQLObjectType({
  name: "Studio",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return _.filter(movies, { studioId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(movies, { id: args.id });
      },
    },

    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return movies;
      },
    },

    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(directors, { id: args.id });
      },
    },

    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        return directors;
      },
    },

    studio: {
      type: StudioType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(studios, { id: args.id });
      },
    },

    studios: {
      type: new GraphQLList(StudioType),
      resolve(parent, args) {
        return studios;
      },
    },

    actor: {
      type: ActorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(actors, { id: args.id });
      },
    },

    actors: {
      type: new GraphQLList(ActorType),
      resolve(parent, args) {
        return actors;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
