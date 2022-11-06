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
