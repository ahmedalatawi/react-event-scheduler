import { useState, Fragment, useContext, useEffect, FC } from 'react';
import { Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { FaUser, FaUserEdit } from 'react-icons/fa';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { MdEventNote } from 'react-icons/md';
import AuthContext from '../../store/auth-context';
import LoginContainer from '../LoginContainer/LoginContainer';

import navbarStyles from './Navbar.module.css';

const MainNavbar: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [view, setView] = useState<string>('Login');

  const authCtx = useContext(AuthContext);

  console.log('Navbar...');

  useEffect(() => setLoggedIn(!!authCtx.getAuth()), [authCtx]);

  const handleLoginBtnClick = () => {
    setView('Login');
    setShowModal(true);
  };

  const handleSignupBtnClick = () => {
    setView('Signup');
    setShowModal(true);
  };

  const handleLogoutBtnClick = () => {
    authCtx.removeAuth();
    setLoggedIn(false);
  };

  const isActiveStyle = {
    textDecoration: 'none',
    fontWeight: 600,
    color: 'black',
  };

  return (
    <Fragment>
      {showModal && (
        <LoginContainer
          view={view}
          onClose={() => setShowModal(false)}
          onSuccess={() => setLoggedIn(true)}
        />
      )}
      <Navbar bg="light" expand="lg" sticky="top">
        <Container fluid>
          <NavLink
            className="navbar-brand"
            to="/"
            style={({ isActive }) => (isActive ? isActiveStyle : {})}
          >
            Event Scheduler
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink
                className="nav-link"
                style={({ isActive }) => (isActive ? isActiveStyle : {})}
                to="/searchEvents"
              >
                Search events
              </NavLink>

              <NavLink
                className="nav-link"
                style={({ isActive }) => (isActive ? isActiveStyle : {})}
                to="/addEvent"
              >
                Add event
              </NavLink>

              <NavLink
                className="nav-link"
                style={({ isActive }) => (isActive ? isActiveStyle : {})}
                to="/calendar"
              >
                Calendar
              </NavLink>
            </Nav>
            <Form className="d-flex">
              {!loggedIn ? (
                <Fragment>
                  <button
                    className="btn btn me-2"
                    type="button"
                    onClick={handleLoginBtnClick}
                  >
                    Login
                  </button>
                  <button
                    className="btn btn-outline-dark"
                    type="button"
                    onClick={handleSignupBtnClick}
                  >
                    Sign up
                  </button>
                </Fragment>
              ) : (
                <Fragment>
                  <span className="nav-link text-secondary">
                    Welcome, <b>{authCtx.auth?.username}</b>
                  </span>
                  {/* <button
                    className="btn btn-outline-dark me-2"
                    type="button"
                    onClick={handleLogoutBtnClick}
                  >
                    Logout
                  </button> */}
                  <NavDropdown
                    title={<FaUser className="text-secondary" />}
                    className={[
                      navbarStyles.dropdown,
                      navbarStyles['dropdown-menu'],
                    ].join(' , ')}
                  >
                    <NavDropdown.Item
                      as={Link}
                      to={`/user/${authCtx.auth?.userId}/profile`}
                    >
                      My profile <FaUserEdit />
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to={`/user/${authCtx.auth?.userId}/events`}
                    >
                      My events <MdEventNote />
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to={`/user/${authCtx.auth?.userId}/settings`}
                    >
                      Settings <FiSettings />
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogoutBtnClick}>
                      Logout <FiLogOut />
                    </NavDropdown.Item>
                  </NavDropdown>
                </Fragment>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default MainNavbar;
