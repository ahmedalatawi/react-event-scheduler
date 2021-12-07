import {
    ApolloClient,
    InMemoryCache,
    createHttpLink
} from "@apollo/client";

export const link = createHttpLink({
    uri: "/graphql"
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
});

export default client;