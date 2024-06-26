import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from "react-router-dom";
import { responseStyle } from './CommonStyles'
import { formatResponse } from './CommonFunctions'
import { AuthContext } from './AuthContext';

function Guru() {
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { isLoggedIn } = useContext(AuthContext); // Using useContext to access isLoggedIn

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:5555';


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLoggedIn) {
            alert('Please log in to ask a question.');
            return;
        }

        if (!userInput.trim()) {
            setError('Question cannot be empty.');
            return;  // Empty return to prevent submission on empty input
        } else {
            setError(''); // Code to reset the error message if the above check/validation passes
        }

        try {
            setLoading(true);
            setError('');  // code to ensure error message is cleared
            setResponse('');  // code to ensure previous response is cleared to prevent it from being shown along with an error message

            const response = await fetch(`${backendUrl}/guru_assistant`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_input: userInput }),
            });

            if (response.ok) {
                const data = await response.json();

                if (data.content !== undefined) {
                    const fullResponse = `Question: ${userInput}\n\nAnswer: ${data.content}`;
                    setResponse(fullResponse);
                    setUserInput(''); // Code to reset the user input after submission
                } else {
                    setError('An unexpected error occurred. Please try again.');
                }
            } else if (response.status === 408) {
                setError('Response timed out, this could be due to an unstable internet connection or an invalid question. Please try asking your question again.');
            } else {
                setError('An error occurred. Please try again.');
            }
        } catch (error) {
            console.error('Error fetching data from server:', error);
            setError('Failed to connect to the server. Please check your internet connection and try again.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            {isLoggedIn ? (
                <>
                    {/* Form for user input */}
                    <form className="guru-form" onSubmit={handleSubmit}>
                        <strong className='guru-prompt'> Hello, I am your Esk8 Guru. What question do you have for me?</strong>
                        <div className='guru-note'>(Note: Please be as clear and specific as possible and avoid using abbreviations for the best results.)</div>
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Ask me anything about electric skateboards..."
                        />
                        {error && <div className='guru-error-message'>{error}</div>}
                        <button className='guru-button' type="guru-submit">Ask</button>
                    </form>

                    {/* Display loading or response */}
                    {loading ? (
                        <div className="loading-container">Thinking... This will take time, please be patient.</div>
                    ) : (
                        response && (
                            <div className="response-container" style={responseStyle}>
                                <p><strong className='guru-answer'> Response: </strong></p>
                                {formatResponse(response)}
                            </div>
                        )
                    )}
                </>
            ) : (
                <p className='login-request'>Please <NavLink className="login-href" to="/login">log in</NavLink> to ask a question.</p>
            )}
        </div>
    );
};

export default Guru;
