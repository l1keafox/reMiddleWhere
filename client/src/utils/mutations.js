import { gql } from "@apollo/client";

export const ADD_USER = gql`
	mutation Mutation($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			token
			user {
				_id
				username
				email
			}
		}
	}
`;
export const AUTH_USER_SESSION = gql`
	mutation authUserSession($sessionId: ID!) {
		authUserSession(sessionId: $sessionId) {
			_id
		}
	}
`;
export const LOGIN_USER = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

