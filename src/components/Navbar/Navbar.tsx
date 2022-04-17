import { useState, Fragment, useContext, useEffect, FC } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import LoginContainer from '../LoginContainer/LoginContainer';

import './Navbar.css';

const Navbar: FC = () => {
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

    return <Fragment>
        {showModal && <LoginContainer view={view} onClose={() => setShowModal(false)} onSuccess={() => setLoggedIn(true)} />}
        <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbar">
                    <NavLink className="navbar-brand" to="/">Event Scheduler</NavLink>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/searchEvents">Search events</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/addEvent">Add event</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/calendar">Calendar</NavLink>
                        </li>
                    </ul>

                    <form className="d-flex">
                        {!loggedIn ? <Fragment>
                            <button className="btn btn me-2" type="button" onClick={handleLoginBtnClick}>Login</button>
                            <button className="btn btn-outline-dark" type="button" onClick={handleSignupBtnClick}>Sign up</button>
                        </Fragment> : <Fragment>
                            <span className="nav-link">Hello {authCtx.auth?.username}</span>
                            <button className="btn btn-outline-dark me-2" type="button" onClick={handleLogoutBtnClick}>Logout</button>
                        </Fragment>}
                    </form>
                </div>
            </div>
        </nav>
    </Fragment>
};

export default Navbar;