import { gql } from '@apollo/client';

export default gql`
    {
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
`;