import { gql } from '@apollo/client';

export default gql`
    query login($login: LoginInput!) {
        login(loginInput: $login) {
            userId
            username
            token
            tokenExpiration
        }
    }
`;
