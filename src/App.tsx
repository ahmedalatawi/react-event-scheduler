import { ApolloProvider } from '@apollo/client'
import client from './apollo'
import UserIdleTimer from './components/UserIdleTimer/UserIdleTimer'
import { useContext } from 'react'
import AuthContext from './store/auth-context'
import AppRoutes from './Routes'
import { Container } from 'react-bootstrap'
import Footer from './components/Footer/Footer'

import './App.css'
import { Toaster } from 'react-hot-toast'
import styled from 'styled-components'
import { useMatch } from 'react-router-dom'

const RoutesContainer = styled(Container)`
  min-height: calc(100vh - 85px);
`

function App() {
  const { auth, removeAuth } = useContext(AuthContext)
  const welcomePagePath = useMatch('/')

  return (
    <>
      <RoutesContainer>
        {auth && <UserIdleTimer onLogout={removeAuth} />}

        <ApolloProvider client={client}>
          <AppRoutes />
        </ApolloProvider>
      </RoutesContainer>
      {!welcomePagePath && <Footer />}
      <Toaster />
    </>
  )
}

export default App
