import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

/// Create Authcontext Istance:
export const AuthContext = createContext();

/// AuthProvider Component:
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:5555';

    /// Code to initialize useHistory hook for navigation
    const history = useHistory();

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

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
