import { Fragment, useContext, useState } from 'react'
import { NavDropdown } from 'react-bootstrap'
import { FaUser, FaUserEdit } from 'react-icons/fa'
import { FiLogOut, FiSettings } from 'react-icons/fi'
import { MdEventNote } from 'react-icons/md'
import { Link } from 'react-router-dom'
import AuthContext from '@/store/auth-context'
import { BiSolidChevronDown } from 'react-icons/bi'
import './styles.css'

import { Popover } from '@atawi/react-popover'
import '@atawi/react-popover/dist/style.css'

type Props = {
  onLogout: () => void
  onSelect: () => void
}

const MyAccount = ({ onLogout, onSelect }: Props) => {
  const [openPopover, setOpenPopover] = useState(false)
  const { auth } = useContext(AuthContext)

  if (!auth) {
    return null
  }

  const { username, userId } = auth

  const handleOnSelect = () => {
    setOpenPopover(false)
    onSelect()
  }

  return (
    <Fragment>
      <span className='nav-link text-secondary'>
        Welcome, <b>{username}</b>
      </span>
      <Popover
        trigger={
          <div
            className='profile-popover-trigger'
            onClick={() => setOpenPopover(!openPopover)}
          >
            <FaUser className='text-secondary' />
            <BiSolidChevronDown />
          </div>
        }
        content={
          <div className='profile-links-container'>
            <NavDropdown.Item
              onClick={handleOnSelect}
              as={Link}
              to={`/user/${userId}/profile`}
            >
              <FaUserEdit /> My profile
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={handleOnSelect}
              as={Link}
              to={`/user/${userId}/events`}
            >
              <MdEventNote /> My events
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={handleOnSelect}
              as={Link}
              to={`/user/${userId}/settings`}
            >
              <FiSettings /> Settings
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              onClick={() => {
                onLogout()
                setOpenPopover(false)
              }}
            >
              Logout <FiLogOut />
            </NavDropdown.Item>
          </div>
        }
        className='profile-popover'
        placement='bottom-end'
        autoPlacement
        animated
        closeOnResize
        open={openPopover}
        onOpenChange={(open) => setOpenPopover(open)}
      />
      {/* <StyledNavDropdown title={<FaUser className='text-secondary' />}>
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
      </StyledNavDropdown> */}
    </Fragment>
  )
}

export default MyAccount
