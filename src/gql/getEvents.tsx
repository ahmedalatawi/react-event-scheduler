import { gql } from '@apollo/client';

export default gql`
  query getEvents($filter: FilterInput) {
    eventsData(filterInput: $filter) {
      totalCount
      events {
        id
        title
        start
        end
        isPrivate
        description
        createdBy {
          _id
        }
      }
    }
  }
`;
