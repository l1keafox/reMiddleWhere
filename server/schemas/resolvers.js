const { User, Channel } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { GraphQLScalarType, Kind } = require("graphql");
const { signToken } = require("../utils/auth");
//this is a custom decoding strategy for dealing with dates.
const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10));
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});

const resolvers = {
  //specifies that when "Date" is the datatype dateScalar should be used to resolve it.
  Date: dateScalar,
  Query: {
    //gets all users
    users: async () => {
      return User.find();
    },
    //Gets user by id
    user: async (parent, { userId }) => {
      return User.findById({ _id: userId });
    },

    //returns the current user id, must be logged in for it to work.
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    //creates a channel, only needs channel name
    //adds a single message to a channel by id

    //adds a user to the database, used on signup.
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      let channels = await Channel.find();
      //this wont scale. Need to write search for global, or better yet need to hard code single global channel with fixed id
      for (const channel of channels) {
        if (channel.channelName == "Global") {
          const task = await Channel.findOneAndUpdate(
            { _id: channel._id },
            { $addToSet: { participants: { _id: user._id } } },
            { runValidators: true, new: true }
          );
        }
      }

      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError("No profile with this username found!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }
      console.log(user, "token?");
      const token = signToken(user);
      return { token, user };
    },
    removeUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },

  },
};
module.exports = resolvers;
