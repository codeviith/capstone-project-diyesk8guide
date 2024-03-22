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
            resetInactivityTimer(); // Call resetInactivityTimer on any activity
        };

        // Attach event listeners for user activity
        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown', handleActivity);

        // Initialize the timer once on component mount
        resetInactivityTimer();

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
            clearTimeout(inactivityTimer);
        };
    }, []);

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
            intervalId = setInterval(checkLoginStatus, 300000); // Code to check session at a set interval
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
                setShowInactivityModal(false);
                resetInactivityTimer();  // Reset the timer after keeping session alive
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
                setShowInactivityModal(false);  // code to hide the modal
                clearTimeout(inactivityTimer);  // code to clear the inactivity timer so as to prevent reappearing.
                history.push('/login'); // code to redirect user to login page, which is the exclude endpoint from session check
            } else {
                console.error('Failed to log out');  // code to log any errors
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    const resetInactivityTimer = () => {
        clearTimeout(inactivityTimer);
        const newTimer = setTimeout(() => {
            setShowInactivityModal(true);
        }, 120000); ///////!!!!!!! replace 120000 with: 13 * 60 * 1000!!!!!!///////
        setInactivityTimer(newTimer);
    };


    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
            {showInactivityModal && (
                <div className="session-expiry-modal">
                    <p className="session-expiry-text">Your session is about to expire due to inactivity.</p>
                    <div className='buttons-container'>
                        <button className='keep-session-alive-button'
                            onClick={keepSessionAlive}>
                            Keep Me Logged In
                        </button>
                        <button className='session-logout-button'
                            onClick={logMeOut}>
                            Log Me Out
                        </button>
                    </div>
                </div>
            )}
        </AuthContext.Provider>
    );
};
