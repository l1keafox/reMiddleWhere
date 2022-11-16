const { gql } = require("apollo-server-express");
const { User, Group } = require("./../models");

const typeDefs = gql`
  scalar Date
  scalar JSONObject
  type User {
    _id: ID
    username: String
    email: String
    friends: [User]
    groups: [Group]
    location: [location]
  }


  type Group {
    _id: ID
    name: String
    users: [User]
    location: [JSONObject]
    userLocations: [User.location]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(userId: ID!): User
    groups: [Group]
    group(groupId: ID!): Group
    me: User
    allGroupUserLocations(groupId: ID!): Group
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    joinGroup(name: String!): Group
    createGroup(name: String!): Group
    leaveGroup(groupId: ID!): Group
    addFriend(userId: ID!): User
    addUserLocationToGroup(userId: ID!, groupId: ID!, latitude: Int!, longitude:Int! ):Group
  }
`;
module.exports = typeDefs;
