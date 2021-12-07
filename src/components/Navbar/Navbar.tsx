import { NavLink } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {

    console.log('Navbar ...');

    return <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
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
                    <button className="btn btn me-2" type="button">Login</button>
                    <button className="btn btn-outline-dark" type="button">Sign up</button>
                </form>
            </div>
        </div>
    </nav>
};

export default Navbar;