import './App.css';

import { ApolloProvider } from '@apollo/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Calendar from './components/Calendar/Calendar';
import client from './apollo';
import SearchBox from './components/SearchBox/SearchBox';
import AddEvent from './components/AddEvent/AddEvent';
import PageNotFound from './components/PageNotFound/PageNotFound';


function App() {
  return (
    <div className="container">
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div className="navbar-custom">
            <Navbar />
          </div>
          <Routes>

            <Route path="*" element={<PageNotFound />} />
            <Route path="/" element={<Calendar />} />
            <Route path="/searchEvents" element={<SearchBox />} />
            <Route path="/addEvent" element={<AddEvent />} />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </div>
  );
}

export default App;
