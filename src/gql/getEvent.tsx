import { gql } from '@apollo/client';

export default gql`
  mutation getEvent($id: ID!) {
    getEvent(id: $id) {
      title
      start
      end
      description
      createdAt
      updatedAt
      createdBy {
        username
      }
    }
  }
`;
