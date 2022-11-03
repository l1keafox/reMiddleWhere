const { gql } = require("apollo-server-express");
const { User, Group } = require("./../models");

const typeDefs = gql`
  scalar Date
  type User {
    _id: ID
    username: String
    email: String
    friends: [User]
    groups: [Group]
  }

  type Group {
    _id: ID
    name: String
    users: [User]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID!): User
    groups: [Group]
    group(groupId: ID!): Group
    me: User
  }
  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    joinGroup(groupId: ID!): Group
    leaveGroup(groupId: ID!): Group
  }
`;
module.exports = typeDefs;
