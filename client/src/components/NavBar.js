import React, { useState, useEffect, useContext, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import Header from "./Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
// import MenuIcon from './MenuIcon';

function NavBar() {
    const { isLoggedIn } = useContext(AuthContext);
    const [showMenu, setShowMenu] = useState(false); // State to handle dropdown visibility

    const menuRef = useRef(null);
    const toggleMenu = () => setShowMenu(prev => !prev)

    useEffect(() => {
        const closeMenu = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', closeMenu);
        return () => {
            document.removeEventListener('mousedown', closeMenu);
        };
    }, []);


    return (
        <nav>
            <div className="nav-links-left"> {/* Container for left-hand side links */}
                <Header />
                {/* <NavLink to="/guide">Guide</NavLink> */}
                {/* <NavLink to="/generate">Generate</NavLink> */}
                {/* <NavLink to="/guru">Guru</NavLink> */}
                {/* <NavLink to="/qna">Q&A</NavLink> */}
                {/* <NavLink to="/gallery">Gallery</NavLink> */}
            </div>
            <div className="nav-links-right"> {/* Container for right-hand side links */}
                {/* Menu Item to toggle dropdown */}
                <div className="menu-item" onClick={toggleMenu}>☰ Menu
                    {/* <MenuIcon /> */}
                    {/* Dropdown Menu */}
                    {showMenu && (
                        <div className={`dropdown-menu ${showMenu ? 'show-dropdown' : ''}`} ref={menuRef}>
                            {/* {isLoggedIn && <NavLink to="/profile"><FontAwesomeIcon icon={faUser} /></NavLink>} */}
                            {/* <NavLink to="/">Home</NavLink> */}
                            <NavLink to="/guide"
                                onClick={() => setShowMenu(false)}
                            >Guide</NavLink>
                            <NavLink to="/generate"
                                onClick={() => setShowMenu(false)}
                            >Generate</NavLink>
                            <NavLink to="/guru"
                                onClick={() => setShowMenu(false)}
                            >Guru</NavLink>
                            <NavLink to="/gallery"
                                onClick={() => setShowMenu(false)}
                            >Gallery</NavLink>
                            {/* <NavLink to="/about"
                                onClick={() => setShowMenu(false)}
                            >About</NavLink> */}
                            {/* <NavLink to="/donations"
                                onClick={() => setShowMenu(false)}
                            >Donations</NavLink> */}
                            {/* <NavLink to="/disclaimers"
                                onClick={() => setShowMenu(false)}
                            >Disclaimers</NavLink> */}
                            {/* <NavLink to="/rules-and-policies"
                                onClick={() => setShowMenu(false)}
                            >Rules & Policies</NavLink> */}
                            {/* <NavLink to="/contact-us"
                                onClick={() => setShowMenu(false)}
                            >Contact Us</NavLink> */}
                            <button className="close-menu-button" onClick={() => setShowMenu(false)}>Close</button>
                        </div>
                    )}
                </div>
                {isLoggedIn ? (
                    <>
                        <NavLink to="/profile"><FontAwesomeIcon icon={faUser} /></NavLink>
                        <NavLink to="/logout" className="logout-link"
                            title="Profile">
                            Logout
                        </NavLink>
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
