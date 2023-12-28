import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Logout = () => {
    const { setIsLoggedIn } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        const logoutUser = async () => {
            try {
                const response = await fetch('/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // If you're using cookies
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

