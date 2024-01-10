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
            setLoading(true);

            const response = await fetch('/guru_assistant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_input: userInput }),
            });

            const data = await response.json();

            setResponse(data.content);
        } catch (error) {
            console.error('Error fetching data from server:', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="guru-container">
            {isLoggedIn ? (
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
                <p className='login_request'>Please log in to ask a question.</p>
            )}
        </div>
    );
};

export default Guru;


