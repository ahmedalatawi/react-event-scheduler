import { gql } from '@apollo/client';

export default gql`
  mutation saveUser($user: UserInputFull!) {
    saveUser(user: $user) {
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
