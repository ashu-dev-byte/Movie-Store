const graphql = require("graphql");
const Content = require("./mongoose-schema/content");
const Director = require("./mongoose-schema/director");
const Actor = require("./mongoose-schema/actor");
const Studio = require("./mongoose-schema/studio");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLID,
} = graphql;

const ContentType = new GraphQLObjectType({
  name: "Content",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    contentCategory: { type: GraphQLString },
    yearOfRelease: { type: GraphQLInt },
    country: { type: GraphQLString },
    budget: { type: GraphQLFloat },
    boxOfficeCollection: { type: GraphQLFloat },
    boxOfficeStatus: { type: GraphQLString },
    genre: { type: new GraphQLList(GraphQLString) },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        return Director.findOne({ _id: parent.directorId });
      },
    },
    studio: {
      type: StudioType,
      resolve(parent, args) {
        return Studio.findOne({ _id: parent.studioId });
      },
    },
    actors: {
      type: new GraphQLList(ActorType),
      resolve(parent, args) {
        // return actors.filter((actor) => parent.castId.includes(actor.id));
        return Actor.find({ _id: { $in: parent.castId } });
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
    country: { type: GraphQLString },
    contents: {
      type: new GraphQLList(ContentType),
      resolve(parent, args) {
        //  return contents.filter((content) => content.castId.includes(parent.id));
        return Content.find({ castId: { $in: parent._id } });
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
    country: { type: GraphQLString },
    contents: {
      type: new GraphQLList(ContentType),
      resolve(parent, args) {
        return Content.find({ directorId: parent._id });
      },
    },
  }),
});

const StudioType = new GraphQLObjectType({
  name: "Studio",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    country: { type: GraphQLString },
    contents: {
      type: new GraphQLList(ContentType),
      resolve(parent, args) {
        return Content.find({ studioId: parent._id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    content: {
      type: ContentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Content.findOne({ _id: args._id });
      },
    },

    contents: {
      type: new GraphQLList(ContentType),
      resolve(parent, args) {
        return Content.find({});
      },
    },

    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Director.findOne({ _id: args._id });
      },
    },

    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        return Director.find({});
      },
    },

    studio: {
      type: StudioType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Studio.findOne({ _id: args._id });
      },
    },

    studios: {
      type: new GraphQLList(StudioType),
      resolve(parent, args) {
        return Studio.find({});
      },
    },

    actor: {
      type: ActorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Actor.findOne({ _id: args._id });
      },
    },

    actors: {
      type: new GraphQLList(ActorType),
      resolve(parent, args) {
        return Actor.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addContent: {
      type: ContentType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        contentCategory: { type: new GraphQLNonNull(GraphQLString) },
        yearOfRelease: { type: new GraphQLNonNull(GraphQLInt) },
        country: { type: new GraphQLNonNull(GraphQLString) },
        budget: { type: new GraphQLNonNull(GraphQLFloat) },
        boxOfficeCollection: { type: new GraphQLNonNull(GraphQLFloat) },
        boxOfficeStatus: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
        castId: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
        directorId: { type: new GraphQLNonNull(GraphQLString) },
        studioId: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let newContent = new Content({
          name: args.name,
          contentCategory: args.contentCategory,
          yearOfRelease: args.yearOfRelease,
          country: args.country,
          budget: args.budget,
          boxOfficeCollection: args.boxOfficeCollection,
          boxOfficeStatus: args.boxOfficeStatus,
          genre: args.genre,
          castId: args.castId,
          directorId: args.directorId,
          studioId: args.studioId,
        });
        return newContent.save();
      },
    },

    addActor: {
      type: ActorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        gender: { type: new GraphQLNonNull(GraphQLString) },
        country: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let newActor = new Actor({
          name: args.name,
          age: args.age,
          gender: args.gender,
          country: args.country,
        });
        return newActor.save();
      },
    },

    addDirector: {
      type: DirectorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        gender: { type: new GraphQLNonNull(GraphQLString) },
        country: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let newDirector = new Director({
          name: args.name,
          age: args.age,
          gender: args.gender,
          country: args.country,
        });
        return newDirector.save();
      },
    },

    addStudio: {
      type: StudioType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        country: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let newStudio = new Studio({
          name: args.name,
          country: args.country,
        });
        return newStudio.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
