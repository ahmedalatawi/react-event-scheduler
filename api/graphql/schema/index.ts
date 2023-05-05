import { gql } from 'graphql-tag'

export const typeDefs = gql`
  type Event {
    id: ID!
  }

  type User {
    _id: String!
    username: String!
  }

  type UserFull {
    _id: ID!
    username: String!
    firstName: String
    lastName: String
    email: String
    phoneNumber: String
    bio: String
    createdAt: Float
    updatedAt: Float
  }

  type EventFull {
    id: ID!
    title: String!
    start: String!
    end: String!
    url: String
    isPrivate: Boolean!
    description: String!
    createdBy: User
    createdAt: Float
    updatedAt: Float
  }

  type Events {
    totalCount: Int
    events: [EventFull!]!
  }

  type Auth {
    userId: ID!
    username: String!
    token: String!
    tokenExpiration: Int!
  }

  input UserInput {
    username: String!
    password: String!
    confirmPassword: String!
  }

  input UserInputFull {
    _id: String!
    username: String!
    firstName: String
    lastName: String
    email: String
    phoneNumber: String
    bio: String
  }

  input LoginInput {
    username: String!
    password: String!
  }

  input EventInput {
    id: String!
    title: String!
    start: String!
    end: String!
    isPrivate: Boolean!
    description: String!
  }

  input FilterInput {
    searchText: String
    startDate: String
    endDate: String
    pageNumber: Int
    pageSize: Int
    expiredCheck: Boolean
    currentCheck: Boolean
  }

  input PaginationFilter {
    searchText: String
    pageNumber: Int
    pageSize: Int
  }

  type Query {
    getUser(id: ID!): UserFull!
    getUserEvents(id: ID!, paginationFilter: PaginationFilter): Events!
    eventsData(filterInput: FilterInput): Events!
    login(loginInput: LoginInput!): Auth!
  }

  type Mutation {
    signup(userInput: UserInput!): Auth!
    saveUser(user: UserInputFull!): UserFull!
    saveEvent(event: EventInput!): EventFull!
    getEvent(id: ID!): EventFull!
    deleteEvent(id: ID!): Boolean!
  }
`
