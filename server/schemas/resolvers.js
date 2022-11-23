const { AuthenticationError } = require("apollo-server-express");
const { User, Group } = require("../models");
const { GraphQLScalarType, Kind } = require("graphql");
const { signToken } = require("../utils/auth");
const { GraphQLJSONObject } = require("graphql-type-json");
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
  JSONObject: GraphQLJSONObject,
  Query: {
    //Gets user by id
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("groups");
    },
    groups: async () => {
      return Group.find();
    },
    group: async (parent, { groupId }) => {
      let retn = await Group.findById({ _id: groupId })
        .populate("users")
        .populate("userLocations");
      return retn;
    },

   

    //returns the current user id, must be logged in for it to work.
    //userId is passed from JWT - look at ProfilePage.js
    me: async (parent, {userId}, context) => {
      //userId will return if user is logged in
      if (userId) {
        const user = await User.findOne({ _id: userId}).populate(
          "groups"
        );
        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    //query specifically to return all the user locations in a group to be used in calculations
    allGroupUserLocations: async (parent, { groupId }) => {
      //retrieving all of the group's data
      const groupData = await Group.findById({ _id: groupId }).populate(
        "userLocations"
      );
      //returning just the user locations array
      const userLocations = groupData.userLocations;

      return { userLocations, groupId };
    },
  },

  //NEXT: add mutation to update / add user location in the group -- will need to update groupId location array in User model, and update the locationId in userLocations in the group model

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
      const group = await Group.findOne({ name });
      if (!group) {
        throw new AuthenticationError("No Group by that name!");
      }
      const user = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { groups: group._id } }
      );
      await Group.findOneAndUpdate(
        { _id: group._id },
        { $addToSet: { users: user._id } }
      );

      const token = signToken(group);
      return { user, token, group };
    },
    createGroup: async (parent, { name }, context) => {
      console.log("creating group by:", name, "By user: ", context.user);
      if (context.user) {
        console.log("creating group");
        const group = await Group.create({ name });

        console.log("Adding group to user ID", group.name);
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { groups: group._id } }
        );
        console.log("Adding User to Group ID");

        await Group.findOneAndUpdate(
          { _id: group._id },
          { $addToSet: { users: user._id } }
        );

        const token = signToken(group);
        return { user, token, group };
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    leaveGroup: async (parent, { groupId }, context) => {
      console.log("LEAVE GROUP?? WORKING?", context.user);
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
    addUserLocationToGroup: async (
      parent,
      { userId, groupId, latitude, longitude },
      context
    ) => {
      console.log("DOES IT EVEN COME HERE FOR ERROR? 400?", context.user);
      if (context.user) {
        const user = User.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: {
              location: context.user.location,
            },
          }
        );
        const group = Group.findOneAndUpdate(
          { _id: groupId },
          {
            $addToSet: {
              location: context.user.location,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        return { user, group };
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    //updating the center location for a group
    updateCenterPoint: async (
      parent,
      { groupId, centerLatitude, centerLongitude }
    ) => {
      //deleting the existing center location
      const group = await Group.findOneAndUpdate(
        {
          _id: groupId,
        },
        {
          $set: {
            centerLatitude: centerLatitude,
            centerLongitude: centerLongitude,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      return group;
    },
  },
};
module.exports = resolvers;
