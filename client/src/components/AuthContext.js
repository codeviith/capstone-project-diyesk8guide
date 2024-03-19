import React, { createContext, useState, useEffect } from 'react';

/// Create Authcontext
export const AuthContext = createContext();

/// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:5555';

    /// Code to initialize useHistory hook for navigation
    // const history = useHistory();

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await fetch(`${backendUrl}/check_session`, {
                    credentials: 'include', // code to include credentials for cookies
                });
                const data = await response.json();
                setIsLoggedIn(data.logged_in);
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        };

        checkLoginStatus();

        const intervalId = setInterval(() => {
            checkLoginStatus().then(() => {
                if (!isLoggedIn) {
                    alert("Your session has expired. Please log in again.");
                    clearInterval(intervalId);  // code to clear the interval checks
                    window.location.href = '/login'; // code to redirect to login page
                    // history.push('/login'); // Code to redirect to login page
                }
            });
        }, 60000); // code to set the time interval

        return () => clearInterval(intervalId);
    }, [isLoggedIn]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
