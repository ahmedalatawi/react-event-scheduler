import type { GraphQLResolveInfo } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Auth = {
  __typename?: 'Auth';
  token: Scalars['String']['output'];
  tokenExpiration: Scalars['Int']['output'];
  userId: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type Event = {
  __typename?: 'Event';
  id: Scalars['ID']['output'];
};

export type EventFull = {
  __typename?: 'EventFull';
  createdAt?: Maybe<Scalars['Float']['output']>;
  createdBy?: Maybe<User>;
  description: Scalars['String']['output'];
  end: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isPrivate: Scalars['Boolean']['output'];
  start: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['Float']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type EventInput = {
  description: Scalars['String']['input'];
  end: Scalars['String']['input'];
  id: Scalars['String']['input'];
  isPrivate: Scalars['Boolean']['input'];
  start: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type Events = {
  __typename?: 'Events';
  events: Array<EventFull>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type FilterInput = {
  currentCheck?: InputMaybe<Scalars['Boolean']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  expiredCheck?: InputMaybe<Scalars['Boolean']['input']>;
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  searchText?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};

export type LoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteEvent: Scalars['Boolean']['output'];
  getEvent: EventFull;
  saveEvent: EventFull;
  saveUser: UserFull;
  signup: Auth;
};


export type MutationDeleteEventArgs = {
  id: Scalars['ID']['input'];
};


export type MutationGetEventArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSaveEventArgs = {
  event: EventInput;
};


export type MutationSaveUserArgs = {
  user: UserInputFull;
};


export type MutationSignupArgs = {
  userInput: UserInput;
};

export type PaginationFilter = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  searchText?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  eventsData: Events;
  getUser: UserFull;
  getUserEvents: Events;
  login: Auth;
};


export type QueryEventsDataArgs = {
  filterInput?: InputMaybe<FilterInput>;
};


export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserEventsArgs = {
  id: Scalars['ID']['input'];
  paginationFilter?: InputMaybe<PaginationFilter>;
};


export type QueryLoginArgs = {
  loginInput: LoginInput;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UserFull = {
  __typename?: 'UserFull';
  _id: Scalars['ID']['output'];
  bio?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Float']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Float']['output']>;
  username: Scalars['String']['output'];
};

export type UserInput = {
  confirmPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type UserInputFull = {
  _id: Scalars['String']['input'];
  bio?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};

export type UserFullFragment = { __typename?: 'UserFull', _id: string, username: string, firstName?: string | null, lastName?: string | null, email?: string | null, phoneNumber?: string | null, bio?: string | null, createdAt?: number | null, updatedAt?: number | null };

export type EventFullFragment = { __typename?: 'EventFull', id: string, title: string, start: string, end: string, url?: string | null, isPrivate: boolean, description: string, createdAt?: number | null, updatedAt?: number | null, createdBy?: { __typename?: 'User', _id: string, username: string } | null };

export type EventsFragment = { __typename?: 'Events', totalCount?: number | null, events: Array<{ __typename?: 'EventFull', id: string, title: string, start: string, end: string, url?: string | null, isPrivate: boolean, description: string, createdAt?: number | null, updatedAt?: number | null, createdBy?: { __typename?: 'User', _id: string, username: string } | null }> };

export type SaveEventMutationVariables = Exact<{
  event: EventInput;
}>;


export type SaveEventMutation = { __typename?: 'Mutation', saveEvent: { __typename?: 'EventFull', id: string, title: string, start: string, end: string, url?: string | null, isPrivate: boolean, description: string, createdAt?: number | null, updatedAt?: number | null, createdBy?: { __typename?: 'User', _id: string, username: string } | null } };

export type SaveUserMutationVariables = Exact<{
  user: UserInputFull;
}>;


export type SaveUserMutation = { __typename?: 'Mutation', saveUser: { __typename?: 'UserFull', _id: string, username: string, firstName?: string | null, lastName?: string | null, email?: string | null, phoneNumber?: string | null, bio?: string | null, createdAt?: number | null, updatedAt?: number | null } };

export type SignupMutationVariables = Exact<{
  signup: UserInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'Auth', userId: string, username: string, token: string, tokenExpiration: number } };

export type DeleteEventMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteEventMutation = { __typename?: 'Mutation', deleteEvent: boolean };

export type GetEventMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetEventMutation = { __typename?: 'Mutation', getEvent: { __typename?: 'EventFull', title: string, start: string, end: string, description: string, createdAt?: number | null, updatedAt?: number | null, createdBy?: { __typename?: 'User', username: string } | null } };

export type GetEventsQueryVariables = Exact<{
  filter?: InputMaybe<FilterInput>;
}>;


export type GetEventsQuery = { __typename?: 'Query', eventsData: { __typename?: 'Events', totalCount?: number | null, events: Array<{ __typename?: 'EventFull', id: string, title: string, start: string, end: string, url?: string | null, isPrivate: boolean, description: string, createdAt?: number | null, updatedAt?: number | null, createdBy?: { __typename?: 'User', _id: string, username: string } | null }> } };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'UserFull', _id: string, username: string, firstName?: string | null, lastName?: string | null, email?: string | null, phoneNumber?: string | null, bio?: string | null, createdAt?: number | null, updatedAt?: number | null } };

export type GetUserEventsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  filter?: InputMaybe<PaginationFilter>;
}>;


export type GetUserEventsQuery = { __typename?: 'Query', getUserEvents: { __typename?: 'Events', totalCount?: number | null, events: Array<{ __typename?: 'EventFull', id: string, title: string, start: string, end: string, url?: string | null, isPrivate: boolean, description: string, createdAt?: number | null, updatedAt?: number | null, createdBy?: { __typename?: 'User', _id: string, username: string } | null }> } };

export type LoginQueryVariables = Exact<{
  login: LoginInput;
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'Auth', userId: string, username: string, token: string, tokenExpiration: number } };



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Auth: ResolverTypeWrapper<Auth>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Event: ResolverTypeWrapper<Event>;
  EventFull: ResolverTypeWrapper<EventFull>;
  EventInput: EventInput;
  Events: ResolverTypeWrapper<Events>;
  FilterInput: FilterInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LoginInput: LoginInput;
  Mutation: ResolverTypeWrapper<{}>;
  PaginationFilter: PaginationFilter;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  UserFull: ResolverTypeWrapper<UserFull>;
  UserInput: UserInput;
  UserInputFull: UserInputFull;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Auth: Auth;
  Boolean: Scalars['Boolean']['output'];
  Event: Event;
  EventFull: EventFull;
  EventInput: EventInput;
  Events: Events;
  FilterInput: FilterInput;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  LoginInput: LoginInput;
  Mutation: {};
  PaginationFilter: PaginationFilter;
  Query: {};
  String: Scalars['String']['output'];
  User: User;
  UserFull: UserFull;
  UserInput: UserInput;
  UserInputFull: UserInputFull;
};

export type AuthResolvers<ContextType = any, ParentType extends ResolversParentTypes['Auth'] = ResolversParentTypes['Auth']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tokenExpiration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventResolvers<ContextType = any, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventFullResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventFull'] = ResolversParentTypes['EventFull']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  end?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isPrivate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  start?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Events'] = ResolversParentTypes['Events']> = {
  events?: Resolver<Array<ResolversTypes['EventFull']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  deleteEvent?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteEventArgs, 'id'>>;
  getEvent?: Resolver<ResolversTypes['EventFull'], ParentType, ContextType, RequireFields<MutationGetEventArgs, 'id'>>;
  saveEvent?: Resolver<ResolversTypes['EventFull'], ParentType, ContextType, RequireFields<MutationSaveEventArgs, 'event'>>;
  saveUser?: Resolver<ResolversTypes['UserFull'], ParentType, ContextType, RequireFields<MutationSaveUserArgs, 'user'>>;
  signup?: Resolver<ResolversTypes['Auth'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'userInput'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  eventsData?: Resolver<ResolversTypes['Events'], ParentType, ContextType, Partial<QueryEventsDataArgs>>;
  getUser?: Resolver<ResolversTypes['UserFull'], ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>;
  getUserEvents?: Resolver<ResolversTypes['Events'], ParentType, ContextType, RequireFields<QueryGetUserEventsArgs, 'id'>>;
  login?: Resolver<ResolversTypes['Auth'], ParentType, ContextType, RequireFields<QueryLoginArgs, 'loginInput'>>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserFullResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserFull'] = ResolversParentTypes['UserFull']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Auth?: AuthResolvers<ContextType>;
  Event?: EventResolvers<ContextType>;
  EventFull?: EventFullResolvers<ContextType>;
  Events?: EventsResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserFull?: UserFullResolvers<ContextType>;
};


export const UserFullFragmentDoc = gql`
    fragment UserFull on UserFull {
  _id
  username
  firstName
  lastName
  email
  phoneNumber
  bio
  createdAt
  updatedAt
}
    `;
export const EventFullFragmentDoc = gql`
    fragment EventFull on EventFull {
  id
  title
  start
  end
  url
  isPrivate
  description
  createdAt
  updatedAt
  createdBy {
    _id
    username
  }
}
    `;
export const EventsFragmentDoc = gql`
    fragment Events on Events {
  totalCount
  events {
    ...EventFull
  }
}
    ${EventFullFragmentDoc}`;
export const SaveEventDocument = gql`
    mutation saveEvent($event: EventInput!) {
  saveEvent(event: $event) {
    ...EventFull
  }
}
    ${EventFullFragmentDoc}`;
export type SaveEventMutationFn = Apollo.MutationFunction<SaveEventMutation, SaveEventMutationVariables>;

/**
 * __useSaveEventMutation__
 *
 * To run a mutation, you first call `useSaveEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveEventMutation, { data, loading, error }] = useSaveEventMutation({
 *   variables: {
 *      event: // value for 'event'
 *   },
 * });
 */
export function useSaveEventMutation(baseOptions?: Apollo.MutationHookOptions<SaveEventMutation, SaveEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveEventMutation, SaveEventMutationVariables>(SaveEventDocument, options);
      }
export type SaveEventMutationHookResult = ReturnType<typeof useSaveEventMutation>;
export type SaveEventMutationResult = Apollo.MutationResult<SaveEventMutation>;
export type SaveEventMutationOptions = Apollo.BaseMutationOptions<SaveEventMutation, SaveEventMutationVariables>;
export const SaveUserDocument = gql`
    mutation saveUser($user: UserInputFull!) {
  saveUser(user: $user) {
    ...UserFull
  }
}
    ${UserFullFragmentDoc}`;
export type SaveUserMutationFn = Apollo.MutationFunction<SaveUserMutation, SaveUserMutationVariables>;

/**
 * __useSaveUserMutation__
 *
 * To run a mutation, you first call `useSaveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveUserMutation, { data, loading, error }] = useSaveUserMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useSaveUserMutation(baseOptions?: Apollo.MutationHookOptions<SaveUserMutation, SaveUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveUserMutation, SaveUserMutationVariables>(SaveUserDocument, options);
      }
export type SaveUserMutationHookResult = ReturnType<typeof useSaveUserMutation>;
export type SaveUserMutationResult = Apollo.MutationResult<SaveUserMutation>;
export type SaveUserMutationOptions = Apollo.BaseMutationOptions<SaveUserMutation, SaveUserMutationVariables>;
export const SignupDocument = gql`
    mutation signup($signup: UserInput!) {
  signup(userInput: $signup) {
    userId
    username
    token
    tokenExpiration
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      signup: // value for 'signup'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const DeleteEventDocument = gql`
    mutation deleteEvent($id: ID!) {
  deleteEvent(id: $id)
}
    `;
export type DeleteEventMutationFn = Apollo.MutationFunction<DeleteEventMutation, DeleteEventMutationVariables>;

/**
 * __useDeleteEventMutation__
 *
 * To run a mutation, you first call `useDeleteEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEventMutation, { data, loading, error }] = useDeleteEventMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEventMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEventMutation, DeleteEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEventMutation, DeleteEventMutationVariables>(DeleteEventDocument, options);
      }
export type DeleteEventMutationHookResult = ReturnType<typeof useDeleteEventMutation>;
export type DeleteEventMutationResult = Apollo.MutationResult<DeleteEventMutation>;
export type DeleteEventMutationOptions = Apollo.BaseMutationOptions<DeleteEventMutation, DeleteEventMutationVariables>;
export const GetEventDocument = gql`
    mutation getEvent($id: ID!) {
  getEvent(id: $id) {
    title
    start
    end
    description
    createdAt
    updatedAt
    createdBy {
      username
    }
  }
}
    `;
export type GetEventMutationFn = Apollo.MutationFunction<GetEventMutation, GetEventMutationVariables>;

/**
 * __useGetEventMutation__
 *
 * To run a mutation, you first call `useGetEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getEventMutation, { data, loading, error }] = useGetEventMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetEventMutation(baseOptions?: Apollo.MutationHookOptions<GetEventMutation, GetEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetEventMutation, GetEventMutationVariables>(GetEventDocument, options);
      }
export type GetEventMutationHookResult = ReturnType<typeof useGetEventMutation>;
export type GetEventMutationResult = Apollo.MutationResult<GetEventMutation>;
export type GetEventMutationOptions = Apollo.BaseMutationOptions<GetEventMutation, GetEventMutationVariables>;
export const GetEventsDocument = gql`
    query getEvents($filter: FilterInput) {
  eventsData(filterInput: $filter) {
    ...Events
  }
}
    ${EventsFragmentDoc}`;

/**
 * __useGetEventsQuery__
 *
 * To run a query within a React component, call `useGetEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetEventsQuery(baseOptions?: Apollo.QueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
      }
export function useGetEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
        }
export function useGetEventsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
        }
export type GetEventsQueryHookResult = ReturnType<typeof useGetEventsQuery>;
export type GetEventsLazyQueryHookResult = ReturnType<typeof useGetEventsLazyQuery>;
export type GetEventsSuspenseQueryHookResult = ReturnType<typeof useGetEventsSuspenseQuery>;
export type GetEventsQueryResult = Apollo.QueryResult<GetEventsQuery, GetEventsQueryVariables>;
export const GetUserDocument = gql`
    query getUser($id: ID!) {
  getUser(id: $id) {
    ...UserFull
  }
}
    ${UserFullFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables> & ({ variables: GetUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetUserEventsDocument = gql`
    query getUserEvents($id: ID!, $filter: PaginationFilter) {
  getUserEvents(id: $id, paginationFilter: $filter) {
    ...Events
  }
}
    ${EventsFragmentDoc}`;

/**
 * __useGetUserEventsQuery__
 *
 * To run a query within a React component, call `useGetUserEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserEventsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetUserEventsQuery(baseOptions: Apollo.QueryHookOptions<GetUserEventsQuery, GetUserEventsQueryVariables> & ({ variables: GetUserEventsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserEventsQuery, GetUserEventsQueryVariables>(GetUserEventsDocument, options);
      }
export function useGetUserEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserEventsQuery, GetUserEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserEventsQuery, GetUserEventsQueryVariables>(GetUserEventsDocument, options);
        }
export function useGetUserEventsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserEventsQuery, GetUserEventsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserEventsQuery, GetUserEventsQueryVariables>(GetUserEventsDocument, options);
        }
export type GetUserEventsQueryHookResult = ReturnType<typeof useGetUserEventsQuery>;
export type GetUserEventsLazyQueryHookResult = ReturnType<typeof useGetUserEventsLazyQuery>;
export type GetUserEventsSuspenseQueryHookResult = ReturnType<typeof useGetUserEventsSuspenseQuery>;
export type GetUserEventsQueryResult = Apollo.QueryResult<GetUserEventsQuery, GetUserEventsQueryVariables>;
export const LoginDocument = gql`
    query login($login: LoginInput!) {
  login(loginInput: $login) {
    userId
    username
    token
    tokenExpiration
  }
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      login: // value for 'login'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables> & ({ variables: LoginQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export function useLoginSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginSuspenseQueryHookResult = ReturnType<typeof useLoginSuspenseQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;