import { ApolloProvider } from '@apollo/client';
import client from './apollo';
import UserIdleTimer from './components/UserIdleTimer/UserIdleTimer';
import { useContext, useEffect, useState } from 'react';
import AuthContext from './store/auth-context';
import AppRoutes from './Routes';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer/Footer';

import './App.css';

const AppContainer = styled(Container)({
  minHeight: '100vh',
});

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const authCtx = useContext(AuthContext);

  useEffect(() => setLoggedIn(!!authCtx.getAuth()), [authCtx]);

  return (
    <>
      <AppContainer>
        {loggedIn && <UserIdleTimer onLogout={authCtx.removeAuth} />}

        <ApolloProvider client={client}>
          <AppRoutes />
        </ApolloProvider>
      </AppContainer>
      <Footer />
    </>
  );
}

export default App;
