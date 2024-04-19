import React, { useState, useEffect, useContext } from 'react';
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
    const toggleMenu = () => {
        setShowMenu(!showMenu);  // code to toggle menu visibility state
        // console.log("Menu toggled", !showMenu);
    };

    useEffect(() => {
        const closeMenu = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        if (showMenu) {
            document.addEventListener('click', closeMenu);
        }

        return () => {
            document.removeEventListener('click', closeMenu);
        };
    }, [showMenu]);


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
                            <button className="close-menu-button" onClick={() => setShowMenu(false)}>×</button>
                            {/* {isLoggedIn && <NavLink to="/profile"><FontAwesomeIcon icon={faUser} /></NavLink>} */}
                            {/* <NavLink to="/">Home</NavLink> */}
                            <NavLink to="/guide"
                                onClick={toggleMenu}
                            >Guide</NavLink>
                            <NavLink to="/generate"
                                onClick={toggleMenu}
                            >Generate</NavLink>
                            <NavLink to="/guru"
                                onClick={toggleMenu}
                            >Guru</NavLink>
                            <NavLink to="/gallery"
                                onClick={toggleMenu}
                            >Gallery</NavLink>
                            {/* <NavLink to="/about"
                                onClick={toggleMenu}
                            >About</NavLink> */}
                            {/* <NavLink to="/donations"
                                onClick={toggleMenu}
                            >Donations</NavLink> */}
                            {/* <NavLink to="/disclaimers"
                                onClick={toggleMenu}
                            >Disclaimers</NavLink> */}
                            {/* <NavLink to="/rules-and-policies"
                                onClick={toggleMenu}
                            >Rules & Policies</NavLink> */}
                            {/* <NavLink to="/contact-us"
                                onClick={toggleMenu}
                            >Contact Us</NavLink> */}
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
