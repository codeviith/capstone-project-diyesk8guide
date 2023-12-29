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
                <NavLink to="/about">About</NavLink>
                <NavLink to="/guide">Guide</NavLink>
                <NavLink to="/generate">Generate</NavLink>
                <NavLink to="/guru">Guru</NavLink>
                <NavLink to="/qna">Q&A</NavLink>
            </div>
            <div className="nav-links-right"> {/* Container for right-hand side links */}
                {isLoggedIn ? (
                    <>
                        <NavLink to="/account">Account</NavLink>
                        <NavLink to="/logout">Logout</NavLink>
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































// import React, { useContext } from 'react';
// import { NavLink } from 'react-router-dom';
// import { AuthContext } from './AuthContext';
// import Header from "./Header";

// function NavBar() {
//     const { isLoggedIn } = useContext(AuthContext);

//     return (
//         <nav>
//             <Header />
//             <div className="nav-links"> {/* Add this div to group the NavLinks */}
//                 <NavLink to="/">About</NavLink>
//                 <NavLink to="/home">Home</NavLink>
//                 <NavLink to="/guide">Guide</NavLink>
//                 <NavLink to="/generate">Generate</NavLink>
//                 <NavLink to="/guru">Guru</NavLink>
//                 <NavLink to="/qna">Q&A</NavLink>
//                 {isLoggedIn ? (
//                     <NavLink to="/account">Profile</NavLink>
//                 ) : (
//                     <NavLink to="/login">Log In</NavLink>
//                 )}
//                 {isLoggedIn ? (
//                     <NavLink to="/logout">Logout</NavLink>
//                 ) : (
//                     <NavLink to="/signup">Sign Up</NavLink>
//                 )}
//             </div>
//         </nav>
//     );
// }

// export default NavBar;

