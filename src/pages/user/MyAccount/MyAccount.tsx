import { FC, Fragment, useContext } from 'react'
import { NavDropdown } from 'react-bootstrap'
import { FaUser, FaUserEdit } from 'react-icons/fa'
import { FiLogOut, FiSettings } from 'react-icons/fi'
import { MdEventNote } from 'react-icons/md'
import { Link } from 'react-router-dom'
import AuthContext from '../../../store/auth-context'
import { StyledNavDropdown } from './styles'

type Props = {
  onLogout: () => void
  onSelect: () => void
}

const MyAccount: FC<Props> = ({ onLogout, onSelect }) => {
  const { auth } = useContext(AuthContext)

  if (!auth) {
    return null
  }

  const { username, userId } = auth

  return (
    <Fragment>
      <span className='nav-link text-secondary'>
        Welcome, <b>{username}</b>
      </span>
      <StyledNavDropdown title={<FaUser className='text-secondary' />}>
        <NavDropdown.Item
          onClick={onSelect}
          as={Link}
          to={`/user/${userId}/profile`}
        >
          <FaUserEdit /> My profile
        </NavDropdown.Item>
        <NavDropdown.Item
          onClick={onSelect}
          as={Link}
          to={`/user/${userId}/events`}
        >
          <MdEventNote /> My events
        </NavDropdown.Item>
        <NavDropdown.Item
          onClick={onSelect}
          as={Link}
          to={`/user/${userId}/settings`}
        >
          <FiSettings /> Settings
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={onLogout}>
          Logout <FiLogOut />
        </NavDropdown.Item>
      </StyledNavDropdown>
    </Fragment>
  )
}

export default MyAccount
