import { ApolloProvider } from '@apollo/client'
import client from './apollo'
import UserIdleTimer from './components/UserIdleTimer/UserIdleTimer'
import { useContext } from 'react'
import AuthContext from './store/auth-context'
import AppRoutes from './Routes'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'
import Footer from './components/Footer/Footer'

import './App.css'
import { Toaster } from 'react-hot-toast'

const AppContainer = styled(Container)({
  minHeight: '100vh',
})

function App() {
  const { auth, removeAuth } = useContext(AuthContext)

  return (
    <>
      <AppContainer>
        {auth && <UserIdleTimer onLogout={removeAuth} />}

        <ApolloProvider client={client}>
          <AppRoutes />
        </ApolloProvider>
      </AppContainer>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
