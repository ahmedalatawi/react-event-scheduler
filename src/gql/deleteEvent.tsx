import { gql } from '@apollo/client';

export default gql`
    mutation deleteEvent($id: ID!) {
        deleteEvent(id: $id)
    }
`;
