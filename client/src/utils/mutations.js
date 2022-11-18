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


export const CREATE_GROUP = gql`
mutation Mutation($name: String!) {
	createGroup(name: $name) {
	  name
	  _id
	}
  }
`;

export const JOIN_GROUP = gql`
mutation JoinGroup($name: String!) {
	joinGroup(name: $name) {
	  name
	}
  }
 `;

 export const ADD_LOCATION_TO_GROUP = gql`
 mutation Mutation($userId: ID!, $groupId: ID!, $latitude: Float!, $longitude: Float!) {
	addUserLocationToGroup(userId: $userId, groupId: $groupId, latitude: $latitude, longitude: $longitude) {
	  name
	  centerLongitude
	  centerLatitude
	}
  }  `;


  export const LEAVE_GROUP = gql`
  mutation Mutation($groupId: ID!) {
	leaveGroup(groupId: $groupId) {
	  name
	  users {
		username
	  }
	}
  } 
  `;