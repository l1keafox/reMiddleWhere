import { gql } from "@apollo/client";


export const QUERY_ME = gql`
  query Me {
    me {
      groups {
        name
        _id
        users {
          username
        }
      }
      friends {
        username
      }
    }
  }
`;

export const QUERY_GROUP = gql`
query Query($groupId: ID!) {
  group(groupId: $groupId) {
    name
    users {
      username
    }
    _id
  }
}
`;