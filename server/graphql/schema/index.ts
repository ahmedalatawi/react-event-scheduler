import { gql } from "apollo-server-express";

export const typeDefs = gql`

input EventInput {
        id: String!
        title: String!
        start: String!
        end: String!
        description: String!
 }

type Event {
      id: ID!
}

type EventFull {
      id: ID!
      title: String!
      start: String!
      end: String!
      description: String!
}


type Query {
    events: [EventFull!]!
  }

type Mutation {
    saveEvent(event: EventInput!): Event
    deleteEvent(id: ID!): Boolean!
}
        
`;
