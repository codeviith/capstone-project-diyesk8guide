import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

function Guru() {
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const { isLoggedIn } = useContext(AuthContext); // Using useContext to access isLoggedIn

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLoggedIn) {
            alert('Please log in to ask a question.');
            return;
        }

        try {
            // Set loading state to true while waiting for the response
            setLoading(true);

            // Send user input to Flask backend
            const response = await fetch('/guru_assistant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_input: userInput }),
            });

            // Parse the response from the backend
            const data = await response.json();

            // Update the state with the response
            setResponse(data.content);
        } catch (error) {
            console.error('Error fetching data from server:', error);
        } finally {
            // Set loading state to false when the response is received
            setLoading(false);
        }
    };


    return (
        <div className="guru-container">
            {isLoggedIn ? (
                // Render the form and other content for logged-in users
                <>
                    <strong className='guru_prompt'> Hello, I am your Esk8 Guru. What question do you have for me? </strong>

                    {/* Form for user input */}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Ask me anything about electric skateboards..."
                        />
                        <button type="guru_submit">Ask</button>
                    </form>

                    {/* Display loading or response */}
                    {loading ? (
                        <div className="loading-container">Thinking... Please Wait</div>
                    ) : (
                        response && (
                            <div className="response-container">
                                <p><strong className='guru_answer'> Answer: </strong> {response}</p>
                            </div>
                        )
                    )}
                </>
            ) : (
                // Render a message or a login prompt for non-logged-in users
                <p className='login_request'>Please log in to ask a question.</p>
            )}
        </div>
    );
};

export default Guru;


