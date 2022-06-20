import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import AddEvent from './components/AddEvent/AddEvent';
import Calendar from './components/Calendar/Calendar';
import MyEvents from './components/MyAccount/MyEvents/MyEvents';
import MyProfile from './components/MyAccount/MyProfile/MyProfile';
import MySettings from './components/MyAccount/MySettings/MySettings';
import Navbar from './components/Navbar/Navbar';
import PageNotFound from './components/PageNotFound/PageNotFound';
import SearchBox from './components/SearchBox/SearchBox';
import SharedEvent from './components/SharedEvent/SharedEvent';

const NavbarWrapper = styled.div({
  paddingBottom: 20,
});

const AppRoutes: FC = () => (
  <BrowserRouter>
    <NavbarWrapper>
      <Navbar />
    </NavbarWrapper>

    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/" element={<SearchBox />} />
      <Route path="/searchEvents" element={<SearchBox />} />
      <Route path="/addEvent" element={<AddEvent />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/sharedEvent/:id" element={<SharedEvent />} />
      <Route path="/user/:id/profile" element={<MyProfile />} />
      <Route path="/user/:id/events" element={<MyEvents />} />
      <Route path="/user/:id/settings" element={<MySettings />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
