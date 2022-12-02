import { gql } from "@apollo/client";


export const QUERY_ME = gql`
query Me($userId: ID!) {
  me(userId: $userId) {
    username
    email
    groups {
      centerLatitude
      centerLongitude
      name
      _id
      users {
        username
      }
    }
  }
}`;

export const QUERY_LOCALES = gql`
query Query($latitude: Float!, $longitude: Float!) {
  getLocalPlaces(latitude: $latitude, longitude: $longitude)
}
`;

export const QUERY_GROUP = gql`
query Group($groupId: ID!) {
  group(groupId: $groupId) {
    _id
    name
    users {
      username
    }
    centerLatitude
    centerLongitude
    userLocations {
      latitude
      longitude
      locationName
    }
  }
}
`;