import { gql } from '@apollo/client';

export default gql`
    mutation signup($signup: UserInput!) {
        signup(userInput: $signup) {
            userId
            username
            token
            tokenExpiration
        }
    }
`;
