const { AuthenticationError } = require("apollo-server-express");
const { User, Group } = require("../models");
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
    //Gets user by id
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("groups");
    },
    groups: async () => {
      return Group.find();
    },
    group: async (parent, { groupId }) => {
      return Group.findById({ _id: groupId });
    },

    //returns the current user id, must be logged in for it to work.
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("groups");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
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
    //adds a user to the database, used on signup.
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });

      const token = signToken(user);
      return { token, user };
    },
    joinGroup: async (parent, { name }, context) => {
      if (group._id) {
        const group = group._id;
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { groups: group._id } }
        );

        return group;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    createGroup: async (parent, { name }, context) => {
      if (context.user) {
        const group = await Group.create({
          name,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { groups: group.name } }
        );

        return group;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    leaveGroup: async (parent, { groupId }, context) => {
      if (context.user) {
        const group = await Group.findOneAndDelete({
          _id: groupId,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { groups: group._id } }
        );

        return group;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addFriend: async (parent, { userId, username }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: {
              friends: { username: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};
module.exports = resolvers;
