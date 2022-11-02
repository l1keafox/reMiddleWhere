const { gql } = require("apollo-server-express");
const { User, Channel, GameCard, Settings } = require("./../models");

const typeDefs = gql`
	scalar Date
	type User {
		_id: ID
		username: String
		email: String
		friends: [User]
	}

	type Auth {
		token: ID!
		user: User
	}

	type Query {
		users: [User]
		user(userId: ID!): User
		me: User
	}
	type Mutation {
		addUser(username: String!, email: String!, password: String!): Auth
		login(username: String!, password: String!): Auth
		removeUser: User
	}
`;
module.exports = typeDefs;
