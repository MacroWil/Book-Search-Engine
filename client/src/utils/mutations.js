import { gql } from "@apollo/client";

export const NEW_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
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

export const ADD_BOOK = gql`
  mutation saveBook(
    $userId: ID!
    $authors: [String]
    $description: String!
    $bookId: String!
    $image: String
    $link: String
    $title: String!
  ) {
    saveBook(
      userId: $userId
      authors: $authors
      description: $description
      bookId: $bookId
      image: $image
      link: $link
      title: $title
    ) {
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

export const DELETE_BOOK = gql`
  mutation deleteBook($userId: ID!, $bookId: String!) {
    deleteBook(userId: $userId, bookId: $bookId) {
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

export const LOGIN = gql`
  mutation login($email: String, $username: String, $password: String!) {
    login(email: $email, username: $username, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;
