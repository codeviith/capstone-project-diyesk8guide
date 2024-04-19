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
    const toggleMenu = () => setShowMenu(prev => !prev)  // func to toggle state of menu visibility
    const closeMenu = () => setShowMenu(false);  // func to close the menu

    useEffect(() => {
        const handleOutsideClick = (e) => {  // code to close the menu if clicked outside of the menu
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                closeMenu();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
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
                            <NavLink to="/" onClick={closeMenu}>Home</NavLink>
                            <NavLink to="/guide" onClick={closeMenu}>Guide</NavLink>
                            <NavLink to="/generate" onClick={closeMenu}>Generate</NavLink>
                            <NavLink to="/guru" onClick={closeMenu}>Guru</NavLink>
                            <NavLink to="/gallery" onClick={closeMenu}>Gallery</NavLink>
                            <NavLink to="/about" onClick={closeMenu}>About</NavLink>
                            <NavLink to="/donations" onClick={closeMenu}>Donations</NavLink>
                            <NavLink to="/disclaimers" onClick={closeMenu}>Disclaimers</NavLink>
                            <NavLink to="/rules-and-policies" onClick={closeMenu}>Rules & Policies</NavLink>
                            <NavLink to="/contact-us" onClick={closeMenu}>Contact Us</NavLink>
                            <div className='mobile-only'>
                                <button className="close-menu-button" onClick={closeMenu}>Close</button>
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
