import { gql } from '@apollo/client';

export default gql`
  query getUserEvents($id: ID!) {
    getUserEvents(id: $id) {
      totalCount
      events {
        id
        title
        start
        end
        url
        isPrivate
        description
        createdAt
        updatedAt
        createdBy {
          _id
          username
        }
      }
    }
  }
`;
