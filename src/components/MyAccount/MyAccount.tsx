import { FC, Fragment, useContext } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { FaUser, FaUserEdit } from 'react-icons/fa';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { MdEventNote } from 'react-icons/md';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import myAccountStyles from './MyAccount.module.css';

type MyAccountProps = {
  onLogout: () => void;
};

const MyAccount: FC<MyAccountProps> = ({ onLogout }) => {
  const authCtx = useContext(AuthContext);

  return (
    <Fragment>
      <span className="nav-link text-secondary">
        Welcome, <b>{authCtx.auth?.username}</b>
      </span>
      <NavDropdown
        title={<FaUser className="text-secondary" />}
        className={[
          myAccountStyles.dropdown,
          myAccountStyles['dropdown-menu'],
        ].join(' , ')}
      >
        <NavDropdown.Item
          as={Link}
          to={`/user/${authCtx.auth?.userId}/profile`}
        >
          My profile <FaUserEdit />
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to={`/user/${authCtx.auth?.userId}/events`}>
          My events <MdEventNote />
        </NavDropdown.Item>
        <NavDropdown.Item
          as={Link}
          to={`/user/${authCtx.auth?.userId}/settings`}
        >
          Settings <FiSettings />
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={onLogout}>
          Logout <FiLogOut />
        </NavDropdown.Item>
      </NavDropdown>
    </Fragment>
  );
};

export default MyAccount;
