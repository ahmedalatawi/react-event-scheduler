import './App.css';

import { ApolloProvider } from '@apollo/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Calendar from './components/Calendar/Calendar';
import client from './apollo';
import SearchBox from './components/SearchBox/SearchBox';
import AddEvent from './components/AddEvent/AddEvent';
import PageNotFound from './components/PageNotFound/PageNotFound';
import UserIdleTimer from './components/UserIdleTimer/UserIdleTimer';
import { useContext, useEffect, useState } from 'react';
import AuthContext from './store/auth-context';
import SharedEvent from './components/SharedEvent/SharedEvent';
import MyProfile from './components/MyProfile/MyProfile';

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const authCtx = useContext(AuthContext);

  useEffect(() => setLoggedIn(!!authCtx.getAuth()), [authCtx]);

  return (
    <div className="container">
      {loggedIn && <UserIdleTimer onLogout={authCtx.removeAuth} />}

      <ApolloProvider client={client}>
        <BrowserRouter>
          <div className="navbar-custom">
            <Navbar />
          </div>

          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<SearchBox />} />
            <Route path="/searchEvents" element={<SearchBox />} />
            <Route path="/addEvent" element={<AddEvent />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/sharedEvent/:id" element={<SharedEvent />} />
            <Route path="/user/:id/profile" element={<MyProfile />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </div>
  );
}

export default App;
