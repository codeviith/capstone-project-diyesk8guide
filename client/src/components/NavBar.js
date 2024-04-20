import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import Header from "./Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faL, faUser } from '@fortawesome/free-solid-svg-icons';
// import MenuIcon from './MenuIcon';

function NavBar() {
    const { isLoggedIn } = useContext(AuthContext);
    const [showMenu, setShowMenu] = useState(false); // State to handle dropdown visibility
    const closeMenuButton = () => setShowMenu(false);

    useEffect(() => {
        const closeMenu = (e) => {
            if (!e.target.closest('.menu-item') && !e.target.closest('.dropdown-menu')) {
                setShowMenu(false);
            }
        };

        if (showMenu) {
            // document.body.style.overflow = 'hidden';  // code to disable scrolling when the dropdown menu is open
            document.addEventListener('click', closeMenu);
        } else {
            // document.body.style.overflow = '';  // code to re-enable scrolling when the dropdown menu is closed
        }

        return () => {
            document.removeEventListener('click', closeMenu);
            // document.body.style.overflow = '';  // code to clean up to prevent memory leak
        };
    }, [showMenu]);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
        // console.log("Menu toggled", !showMenu);
    };

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
                        <div className={`dropdown-menu ${showMenu ? 'show-dropdown' : ''}`}>
                            <NavLink to="/">Home</NavLink>
                            <NavLink to="/guide">Guide</NavLink>
                            <NavLink to="/generate">Generate</NavLink>
                            <NavLink to="/guru">Guru</NavLink>
                            <NavLink to="/gallery">Gallery</NavLink>
                            <NavLink to="/about">About</NavLink>
                            <NavLink to="/donations">Donations</NavLink>
                            <NavLink to="/disclaimers">Disclaimers</NavLink>
                            <NavLink to="/rules-and-policies">Rules & Policies</NavLink>
                            <NavLink to="/contact-us">Contact Us</NavLink>
                            <div className='mobile-only'>
                                <button className="close-menu-button" onClick={closeMenuButton}>Close</button>
                            </div>
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
