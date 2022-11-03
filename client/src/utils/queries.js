import { gql } from "@apollo/client";


export const QUERY_ME = gql`
  query Me {
    me {
      groups {
        name
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
