import { gql } from '@apollo/client';

export default gql`
  mutation saveEvent($event: EventInput!) {
    saveEvent(event: $event) {
      id
    }
  }
`;
