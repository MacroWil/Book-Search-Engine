import { gql } from "@apollo/client";

export const USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      savedBooks {
        _id
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;
