import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      )
      if (message === 'Unauthenticated') {
        Cookies.remove('auth')
        window.location.href = '/'
      }
    })
  if (networkError) {
    toast.error('Network error has ocurred! Please try again later.')
    console.log(`[Network error]: ${networkError}`)
  }
})

const httpLink = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin',
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, httpLink]),
})

export default client
