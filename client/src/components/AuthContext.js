import React, { createContext, useState, useEffect } from 'react';


// Create the context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await fetch('/check_session', {
                    credentials: 'include', // Include credentials for cookies
                });
                const data = await response.json();
                setIsLoggedIn(data.logged_in);
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        };
        checkLoginStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};


