const { gql } = require("apollo-server-express");
const { User, Group, Location } = require("./../models");

const typeDefs = gql`
  scalar Date
  scalar JSONObject
  type User {
    _id: ID
    username: String
    email: String
    friends: [User]
    groups: [Group]
    locations: [Location]
  }

  type Location {
    _id: ID
    latitude: Float!
    longitude: Float!
    locationName: String
  }

  type Group {
    _id: ID
    name: String
    users: [User]
    centerLatitude: Float
    centerLongitude: Float
    userLocations: [Location]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(userId: ID!): User
    groups: [Group]
    group(groupId: ID!): Group
    me(userId: ID!): User
    allGroupUserLocations(groupId: ID!): Group
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    joinGroup(name: String!): Group
    createGroup(name: String!): Group
    leaveGroup(groupId: ID!): Group
    addFriend(userId: ID!): User
    addUserLocationToGroup(
      userId: ID!
      groupId: ID!
      latitude: Float!
      longitude: Float!
    ): Group
    updateCenterPoint(
      groupId: ID!
      centerLatitude: Float!
      centerLongitude: Float!
    ): Group
  }
`;
module.exports = typeDefs;
