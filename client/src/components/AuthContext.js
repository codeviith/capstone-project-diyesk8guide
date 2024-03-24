/////////// updated code to handle user inactivity and timer reset w/o useCallback /////////////

import React, { createContext, useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

export const AuthContext = createContext();

const INACTIVITY_TIMEOUT_VALUE = 3 * 60 * 1000;

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showInactivityModal, setShowInactivityModal] = useState(false);
    
    const history = useHistory();
    const inactivityTimerRef = useRef(null);  // code to use useRef to hold timer reference
    
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:5555';


    const keepSessionAlive = async () => {
        const response = await fetch(`${backendUrl}/keep_session_alive`, {
            method: 'POST',
            credentials: 'include',
        });
        if (response.ok) {
            setShowInactivityModal(false);
            resetInactivityTimer();
        }
    };

    const logMeOut = async () => {
        const response = await fetch(`${backendUrl}/logout`, {
            method: 'POST',
            credentials: 'include',
        });
        if (response.ok) {
            setIsLoggedIn(false);
            setShowInactivityModal(false);
            clearTimeout(inactivityTimerRef.current);
            history.push('/login');
        }
    };

    function resetInactivityTimer() {
        clearTimeout(inactivityTimerRef.current);
        inactivityTimerRef.current = setTimeout(() => {
            if (isLoggedIn) {
                setShowInactivityModal(true);
            }
        }, INACTIVITY_TIMEOUT_VALUE);
    }

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await fetch(`${backendUrl}/check_session`, {
                    credentials: 'include',
                });
                const data = await response.json();
                setIsLoggedIn(data.logged_in);
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        };

        checkLoginStatus();
    }, [backendUrl]);

    useEffect(() => {
        const handleUserActivity = () => resetInactivityTimer();

        window.addEventListener('mousemove', handleUserActivity);
        window.addEventListener('mousedown', handleUserActivity);
        window.addEventListener('keypress', handleUserActivity);
        window.addEventListener('scroll', handleUserActivity);
        resetInactivityTimer();  // code to initialize the timer

        return () => {  // code to cleanup event listeners
            window.removeEventListener('mousemove', handleUserActivity);
            window.removeEventListener('mousedown', handleUserActivity);
            window.removeEventListener('keypress', handleUserActivity);
            window.removeEventListener('scroll', handleUserActivity);
            clearTimeout(inactivityTimerRef.current);
        };
    }, [isLoggedIn]); // code for isLoggedIn dependency to add/remove event listeners based on login status

    useEffect(() => {  // code to ensure timer is cleared on component unmount
        return () => clearTimeout(inactivityTimerRef.current);
    }, []);


    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
            {showInactivityModal && (
                <div className="session-expiry-modal">
                    <p className="session-expiry-text">Your session is about to expire due to inactivity.</p>
                    <div className='buttons-container'>
                        <button className='keep-session-alive-button'
                        onClick={keepSessionAlive}
                        >
                            Keep Me Logged In
                        </button>
                        <button className='session-logout-button'
                        onClick={logMeOut}
                        >
                            Log Me Out
                        </button>
                    </div>
                </div>
            )}
        </AuthContext.Provider>
    );
};
















/////////// without using useCallback /////////////

// import React, { createContext, useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

// export const AuthContext = createContext();

// const INACTIVITY_TIMEOUT_VALUE = 180000;

// export const AuthProvider = ({ children }) => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [showInactivityModal, setShowInactivityModal] = useState(false);
//     const history = useHistory();
//     const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:5555';

//     let inactivityTimer = null;

//     const keepSessionAlive = async () => {
//         const response = await fetch(`${backendUrl}/keep_session_alive`, {
//             method: 'POST',
//             credentials: 'include',
//         });

//         if (response.ok) {
//             setShowInactivityModal(false);
//             resetInactivityTimer();
//         }
//     };

//     const logMeOut = async () => {
//         const response = await fetch(`${backendUrl}/logout`, {
//             method: 'POST',
//             credentials: 'include',
//         });

//         if (response.ok) {
//             setIsLoggedIn(false);
//             setShowInactivityModal(false);
//             clearTimeout(inactivityTimer);
//             history.push('/login');
//         }
//     };

//     function resetInactivityTimer() {
//         if (isLoggedIn) {
//             clearTimeout(inactivityTimer);
//             inactivityTimer = setTimeout(() => {
//                 setShowInactivityModal(true);
//             }, INACTIVITY_TIMEOUT_VALUE);
//         }
//     }

//     useEffect(() => {
//         const checkLoginStatus = async () => {
//             try {
//                 const response = await fetch(`${backendUrl}/check_session`, {
//                     credentials: 'include',
//                 });
//                 const data = await response.json();
//                 setIsLoggedIn(data.logged_in);
//             } catch (error) {
//                 console.error('Error checking login status:', error);
//             }
//         };

//         checkLoginStatus();
//     }, [backendUrl]);

//     useEffect(() => {
//         if (isLoggedIn) {
//             const handleActivity = () => {
//                 resetInactivityTimer();
//             };

//             window.addEventListener('mousemove', handleActivity);
//             window.addEventListener('keydown', handleActivity);

//             resetInactivityTimer();  // code to initialize the timer

//             return () => {  // code to cleanup event listeners
//                 window.removeEventListener('mousemove', handleActivity);
//                 window.removeEventListener('keydown', handleActivity);
//                 clearTimeout(inactivityTimer);
//             };
//         }
//     }, [isLoggedIn]);

//     useEffect(() => {
//         return () => clearTimeout(inactivityTimer);
//     }, []);


//     return (
//         <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
//             {children}
//             {showInactivityModal && (
//                 <div className="session-expiry-modal">
//                     <p className="session-expiry-text">Your session is about to expire due to inactivity.</p>
//                     <div className='buttons-container'>
//                         <button className='keep-session-alive-button'
//                             onClick={keepSessionAlive}>
//                             Keep Me Logged In
//                         </button>
//                         <button className='session-logout-button'
//                             onClick={logMeOut}>
//                             Log Me Out
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </AuthContext.Provider>
//     );
// };
















/////////////// original w/o check session ///////////////

// import React, { createContext, useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

// /// Create the Authcontext Istance:
// export const AuthContext = createContext();

// // const CHECK_SESSION_TIMEOUT_VALUE = 120000;
// const INACTIVITY_TIMEOUT_VALUE = 60000; 

// /// AuthProvider Component:
// export const AuthProvider = ({ children }) => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [showInactivityModal, setShowInactivityModal] = useState(false);
//     const [inactivityTimer, setInactivityTimer] = useState(null);
    
//     /// Code to initialize useHistory hook for navigation
//     const history = useHistory();

//     const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:5555';


    // useEffect(() => {
    //     const handleActivity = () => {
    //         resetInactivityTimer(); // code to resetInactivityTimer on any activity
    //     };

    //     window.addEventListener('mousemove', handleActivity);
    //     window.addEventListener('keydown', handleActivity);

    //     resetInactivityTimer();  // code to initialize the timer

    //     return () => {  // code to cleanup event listeners
    //         window.removeEventListener('mousemove', handleActivity);
    //         window.removeEventListener('keydown', handleActivity);
    //         clearTimeout(inactivityTimer);
    //     };
    // }, []);

//     useEffect(() => {
//         const checkLoginStatus = async () => {
//             try {
//                 const response = await fetch(`${backendUrl}/check_session`, {
//                     credentials: 'include', // Code to include credentials for cookies
//                 });
//                 const data = await response.json();
//                 if (!data.logged_in && isLoggedIn) {
//                     alert("Your session has expired. Please log in again.");
//                     setIsLoggedIn(false);
//                     history.push('/login');  // Code to redirect to login page after session expires
//                 } else if (data.logged_in) {
//                     setIsLoggedIn(true);
//                 }
//             } catch (error) {
//                 console.error('Error checking login status:', error);
//             }
//         };

//         checkLoginStatus();
//         let intervalId;

//         if (isLoggedIn) {
//             intervalId = setInterval(checkLoginStatus, 300000); // Code to check session at a set interval
//         }

//         return () => {
//             if (intervalId) {
//                 clearInterval(intervalId); // Code to clear the check interval for cleanup
//             }
//         };
//     }, [isLoggedIn, history]);

//     const keepSessionAlive = async () => {
//         try {
//             const response = await fetch(`${backendUrl}/keep_session_alive`, {
//                 method: 'POST',
//                 credentials: 'include',
//             });

//             if (response.ok) {
//                 setShowInactivityModal(false);
//                 resetInactivityTimer();  // code to reset timer after keeping session alive
//             } else {
//                 console.log("session not refreshed") // code to handle session could not be refreshed, to log the user out
//             }
//         } catch (error) {
//             console.error('Error keeping session alive:', error);
//         }
//     };

//     const logMeOut = async () => {
//         try {
//             const response = await fetch(`${backendUrl}/logout`, {
//                 method: 'POST',
//                 credentials: 'include',
//             });
//             if (response.ok) {
//                 setIsLoggedIn(false); // code to update state after logging out
//                 setShowInactivityModal(false);  // code to hide the modal
//                 clearTimeout(inactivityTimer);  // code to clear the inactivity timer so as to prevent reappearing.
//                 history.push('/login'); // code to redirect user to login page, which is the exclude endpoint from session check
//             } else {
//                 console.error('Failed to log out');  // code to log any errors
//             }
//         } catch (error) {
//             console.error('Error logging out:', error);
//         }
//     }

//     const resetInactivityTimer = () => {
//         setInactivityTimer((currentTimer) => {
//             clearTimeout(currentTimer);
//             return null; // code to clear current timer
//         });

//         const newTimer = setTimeout(() => {  // code to set new timer
//             setShowInactivityModal(true);
//         }, INACTIVITY_TIMEOUT_VALUE);

//         setInactivityTimer(newTimer);
//     };


//     return (
        // <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        //     {children}
        //     {showInactivityModal && (
        //         <div className="session-expiry-modal">
        //             <p className="session-expiry-text">Your session is about to expire due to inactivity.</p>
        //             <div className='buttons-container'>
        //                 <button className='keep-session-alive-button'
        //                     onClick={keepSessionAlive}>
        //                     Keep Me Logged In
        //                 </button>
        //                 <button className='session-logout-button'
        //                     onClick={logMeOut}>
        //                     Log Me Out
        //                 </button>
        //             </div>
        //         </div>
        //     )}
        // </AuthContext.Provider>
//     );
// };
