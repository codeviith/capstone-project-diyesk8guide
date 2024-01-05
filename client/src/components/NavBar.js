import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import Header from "./Header";

function NavBar() {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <nav>
            <div className="nav-links-left"> {/* Container for left-hand side links */}
                <Header />
                <NavLink to="/guide">Guide</NavLink>
                <NavLink to="/generate">Generate</NavLink>
                <NavLink to="/guru">Guru</NavLink>
                {/* <NavLink to="/qna">Q&A</NavLink> */}
                <NavLink to="/gallery">Gallery</NavLink>
            </div>
            <div className="nav-links-right"> {/* Container for right-hand side links */}
                {isLoggedIn ? (
                    <>
                        <NavLink to="/account" className="account-link">Account</NavLink>
                        <NavLink to="/logout" className="logout-link">Logout</NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to="/login" className="login-link">Log In</NavLink>
                        <NavLink to="/signup" className="signup-link">Sign Up</NavLink>
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavBar;

