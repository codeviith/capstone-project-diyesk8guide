import React, { createContext, useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

export const AuthContext = createContext();

const INACTIVITY_TIMEOUT_VALUE = 15 * 60 * 1000;  // inactivity timeout value in milliseconds (production value = 15 * 60 * 1000)
const AUTO_LOGOUT_TIMEOUT_VALUE = 15.5 * 60 * 1000;  // autologout timeout value in milliseconds (production value = 15.5 * 60 * 1000)
const COUNTDOWN_TO_LOGOUT = 60;  // countdown start value in seconds (production value = 60)

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showInactivityModal, setShowInactivityModal] = useState(false);
    const [countdownTime, setCountdownTime] = useState(COUNTDOWN_TO_LOGOUT);

    const history = useHistory();
    const inactivityTimerRef = useRef(null);  // code for useRef to hold timer reference for inactivity
    const countdownIntervalRef = useRef(null);  // code for useRef to hold timer reference for countdown
    const autoLogoutTimerRef = useRef(null);  // code for useRef to hold timer reference for autoLogout

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:5555';


    const keepSessionAlive = async () => {
        const response = await fetch(`${backendUrl}/keep_session_alive`, {
            method: 'POST',
            credentials: 'include',
        });
        if (response.ok) {
            setShowInactivityModal(false);
            clearInterval(countdownIntervalRef.current);
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
            clearInterval(countdownIntervalRef.current);  // code to clear countdown
            clearTimeout(inactivityTimerRef.current);  // code to clear inactivity timer
            clearTimeout(autoLogoutTimerRef.current);  // code to clear autologout timer
            history.push({  // code to redirect to login page
                pathname: '/login',
                state: { loggedOutDueToInactivity: true }
            });
        }
    };

    const startCountdown = () => {
        setCountdownTime(COUNTDOWN_TO_LOGOUT);
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = setInterval(() => {
            setCountdownTime(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(countdownIntervalRef.current);
                    logMeOut(); // code to automatically log the user out once countdown reaches 0
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    };

    function resetInactivityTimer() {
        clearTimeout(inactivityTimerRef.current);
        clearTimeout(autoLogoutTimerRef.current);
        // clearInterval(countdownIntervalRef.current);

        inactivityTimerRef.current = setTimeout(() => {
            if (isLoggedIn) {
                setShowInactivityModal(true);
                startCountdown();  // code to start the countdown once modal has been shown to user
            }
        }, INACTIVITY_TIMEOUT_VALUE - 60000);  // value in milliseconds (production = INACTIVITY_TIMEOUT_VALUE - 60000)

        autoLogoutTimerRef.current = setTimeout(() => {  // code to set up automatic logout after x minutes of inactivity
            if (isLoggedIn) {
                logMeOut();  // code to call on the logout function to log the user out
            }
        }, AUTO_LOGOUT_TIMEOUT_VALUE);   // value in milliseconds
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
            clearTimeout(autoLogoutTimerRef.current);
            // clearInterval(countdownIntervalRef.current);
        };
    }, [isLoggedIn]); // code for isLoggedIn dependency to add/remove event listeners based on login status

    useEffect(() => {  // code to ensure timer is cleared on component unmount
        return () => {
            clearTimeout(inactivityTimerRef.current);
            clearTimeout(autoLogoutTimerRef.current);
            clearInterval(countdownIntervalRef.current);
        }
    }, []);

    useEffect(() => {
        const body = document.body;
        
        function disableBackgroundInteraction(e) {
            if (showInactivityModal && !document.querySelector('.session-expiry-modal-container').contains(e.target)) {  // code to check if the scroll event is outside of modal container
                e.preventDefault();
            }
        }
    
        if (showInactivityModal) {  // code to prevent any touch or scrolling
            body.classList.add('no-scroll');
            document.addEventListener('touchmove', disableBackgroundInteraction, { passive: false });
            document.addEventListener('touchstart', disableBackgroundInteraction, { passive: false });
            document.addEventListener('wheel', disableBackgroundInteraction, { passive: false });
        } else {  // code to re-enable touch or scrolling
            body.classList.remove('no-scroll');
            document.removeEventListener('touchmove', disableBackgroundInteraction);
            document.removeEventListener('touchstart', disableBackgroundInteraction);
            document.removeEventListener('wheel', disableBackgroundInteraction);
        }
    
        return () => {  // code to cleanup and remove all event listeners and classes
            body.classList.remove('no-scroll');
            document.removeEventListener('touchmove', disableBackgroundInteraction);
            document.removeEventListener('touchstart', disableBackgroundInteraction);
            document.removeEventListener('wheel', disableBackgroundInteraction);
        };
    }, [showInactivityModal]);


    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
            {showInactivityModal && (
                <div className="modal-backdrop">
                    <div className="session-expiry-modal-container">
                        <p className="session-expiry-text">Your session is about to expire from inactivity.</p>
                        <p className="session-expiry-text">Logging out in {countdownTime} seconds...</p>
                        <div className='buttons-container'>
                            <button className='keep-session-alive-button'
                                onClick={keepSessionAlive}
                            >
                                Stay Logged In
                            </button>
                            <button className='session-logout-button'
                                onClick={logMeOut}
                            >
                                Log Me Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthContext.Provider>
    );
};
