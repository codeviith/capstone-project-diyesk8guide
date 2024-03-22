import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

/// Create Authcontext Istance:
export const AuthContext = createContext();

/// AuthProvider Component:
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showInactivityModal, setShowInactivityModal] = useState(false);
    const [inactivityTimer, setInactivityTimer] = useState(null);

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:5555';

    /// Code to initialize useHistory hook for navigation
    const history = useHistory();


    useEffect(() => {
        const handleActivity = () => {
            clearTimeout(inactivityTimer);
            setInactivityTimer(setTimeout(() => {
                setShowInactivityModal(true);
            }, 120000));  ///////!!!!!!! replace 120000 with: 13 * 60 * 1000!!!!!!///////      // ### code to show warning at 14 min of inactivity
        };

        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown', handleActivity);

        handleActivity();

        return () => {
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
            clearTimeout(inactivityTimer);
        };
    }, [inactivityTimer]);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await fetch(`${backendUrl}/check_session`, {
                    credentials: 'include', // Code to include credentials for cookies
                });
                const data = await response.json();
                if (!data.logged_in && isLoggedIn) {
                    alert("Your session has expired. Please log in again.");
                    setIsLoggedIn(false);
                    history.push('/login');  // Code to redirect to login page after session expires
                } else if (data.logged_in) {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        };

        checkLoginStatus();
        let intervalId;

        if (isLoggedIn) {
            intervalId = setInterval(checkLoginStatus, 60000); // Code to check session at a set interval
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId); // Code to clear the check interval for cleanup
            }
        };
    }, [isLoggedIn, history]);

    const keepSessionAlive = async () => {
        try {
            const response = await fetch(`${backendUrl}/keep_session_alive`, {
                method: 'POST',
                credentials: 'include',
            });
            if (response.ok) {
                setShowInactivityModal(false); // code to hide the modal
                clearTimeout(inactivityTimer); // code to clear the existing inactivity timer
                setInactivityTimer(setTimeout(() => { // code to restart the inactivity timer
                    setShowInactivityModal(true);
                }, 120000)); ///////!!!!!!! replace 120000 with: 13 * 60 * 1000!!!!!!///////     code to reset/restart timer for another 14 minutes
            } else {
                console.log("session not refreshed") // code to handle session could not be refreshed, to log the user out
            }
        } catch (error) {
            console.error('Error keeping session alive:', error);
        }
    };

    const logMeOut = async () => {
        try {
            const response = await fetch(`${backendUrl}/logout`, {
                method: 'POST',
                credentials: 'include',
            });
            if (response.ok) {
                setIsLoggedIn(false); // code to update state after logging out
                history.push('/login'); // code to redirect user to login page
            } else {
                console.error('Failed to log out');  // code to log any errors
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }


    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
            {showInactivityModal && (
                <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: 100 }}>
                    <p>Your session is about to expire due to inactivity.</p>
                    <button className='keep-session-alive-button'
                        onClick={keepSessionAlive}>
                        Keep Me Logged In
                    </button>
                    <button className='session-logout-button'
                        onClick={logMeOut}>
                        Log Me Out
                    </button>
                </div>
            )}
        </AuthContext.Provider>
    );
};
