import { gql } from '@apollo/client';

export default gql`
    {
        events {
            id
            title
            start
            end
            description
        }
    }
`;