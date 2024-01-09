import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import Header from "./Header";
import MenuIcon from './MenuIcon';

function NavBar() {
    const { isLoggedIn } = useContext(AuthContext);
    const [showMenu, setShowMenu] = useState(false); // State to handle dropdown visibility

    useEffect(() => {
        const closeMenu = (e) => {
            if (!e.target.closest('.menu-item')) {
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

    const toggleMenu = () => {
        setShowMenu(!showMenu);
        console.log("Menu toggled", !showMenu);
    };

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
                {/* Menu Item to toggle dropdown */}
                <div className="menu-item" onClick={toggleMenu}>
                    <MenuIcon />

                    {/* Dropdown Menu */}
                    {showMenu && (
                        <div className={`dropdown-menu ${showMenu ? 'show-dropdown' : ''}`}>
                            {isLoggedIn && <NavLink to="/account">Account</NavLink>}
                            <NavLink to="/">Home</NavLink>
                            <NavLink to="/about">About</NavLink>
                            <NavLink to="/contactus">Contact Us</NavLink>
                        </div>
                    )}
                </div>
                {isLoggedIn ? (
                    <>
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

