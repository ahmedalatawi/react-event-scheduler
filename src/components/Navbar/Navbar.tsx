import { useState, Fragment, useContext, FC } from 'react'
import { Container, Form, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import AuthContext from '../../store/auth-context'
import LoginContainer from '../../pages/user/LoginContainer/LoginContainer'
import MyAccount from '../../pages/user/MyAccount/MyAccount'
import { Switch, useDarkreader } from 'react-darkreader'

const MainNavbar: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [view, setView] = useState<string>('Login')
  const [isDark, { toggle }] = useDarkreader(
    localStorage.getItem('react-event-scheduler-theme') === 'dark',
  )

  const { auth, removeAuth } = useContext(AuthContext)

  const handleLoginBtnClick = () => {
    setView('Login')
    setShowModal(true)
    setIsExpanded(false)
  }

  const handleSignupBtnClick = () => {
    setView('Signup')
    setShowModal(true)
    setIsExpanded(false)
  }

  const isActiveStyle = {
    textDecoration: 'none',
    fontWeight: 600,
    color: 'black',
  }

  const handleStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? isActiveStyle : {}

  const onToggleHandler = (expanded: boolean) => {
    setIsExpanded(expanded)
  }

  const onSelectNavLinkHandler = () => {
    setIsExpanded(false)
  }

  const handleLogoutBtnClick = () => {
    removeAuth()
    onSelectNavLinkHandler()
  }

  return (
    <Fragment>
      {showModal && (
        <LoginContainer view={view} onClose={() => setShowModal(false)} />
      )}
      <Navbar
        bg='light'
        expand='lg'
        fixed='top'
        expanded={isExpanded}
        onToggle={onToggleHandler}
      >
        <Container fluid>
          <NavLink
            className='navbar-brand'
            to='/'
            onClick={onSelectNavLinkHandler}
            style={handleStyle}
          >
            Event Scheduler
          </NavLink>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <NavLink
                className='nav-link'
                style={handleStyle}
                to='/searchEvents'
                onClick={onSelectNavLinkHandler}
              >
                Search events
              </NavLink>

              <NavLink
                className='nav-link'
                style={handleStyle}
                to='/addEvent'
                onClick={onSelectNavLinkHandler}
              >
                Add event
              </NavLink>

              <NavLink
                className='nav-link'
                style={handleStyle}
                to='/calendar'
                onClick={onSelectNavLinkHandler}
              >
                Calendar
              </NavLink>
            </Nav>
            <div className='me-4'>
              <Switch
                checked={isDark}
                onChange={(isDark) => {
                  localStorage.setItem(
                    'react-event-scheduler-theme',
                    isDark ? 'dark' : 'light',
                  )
                  toggle()
                }}
              />
            </div>
            <Form className='d-flex'>
              {!auth ? (
                <Fragment>
                  <button
                    className='btn btn-light me-2'
                    type='button'
                    onClick={handleLoginBtnClick}
                  >
                    Login
                  </button>
                  <button
                    className='btn btn-primary'
                    type='button'
                    onClick={handleSignupBtnClick}
                  >
                    Sign up
                  </button>
                </Fragment>
              ) : (
                <MyAccount
                  onSelect={onSelectNavLinkHandler}
                  onLogout={handleLogoutBtnClick}
                />
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  )
}

export default MainNavbar
