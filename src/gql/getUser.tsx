import { gql } from '@apollo/client';

export default gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      _id
      username
      firstName
      lastName
      email
      phoneNumber
      bio
      createdAt
      updatedAt
    }
  }
`;
