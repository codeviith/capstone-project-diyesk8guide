import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function Logout() {
    const { setIsLoggedIn } = useContext(AuthContext);
    const history = useHistory();

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:5555';


    useEffect(() => {
        const logoutUser = async () => {
            try {
                const response = await fetch(`${backendUrl}/logout`, {
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
    }, [setIsLoggedIn, history, backendUrl]);

    return <div>Logging out...</div>;
};

export default Logout;
