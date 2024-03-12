import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Logout = () => {
    const { setIsLoggedIn } = useContext(AuthContext);

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:5555';

    // Code to initialize useHistory hook for navigation
    const history = useHistory();

    useEffect(() => {
        const logoutUser = async () => {
            try {
                const response = await fetch(`${backendUrl}/logout`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    setIsLoggedIn(false);
                    history.push('/login'); // Redirect to login page after logout
                } else {
                    console.error('Logout failed');
                }
            } catch (error) {
                console.error('Error during logout:', error);
            }
        };

        logoutUser();
    }, [setIsLoggedIn, history]);

    return <div>Logging out...</div>;
};

export default Logout;

