import React, { useState } from 'react';

function Guru() {
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

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
        <p>Hello, I am the one and only Esk8 Guru. What question do you have for me?</p>

        {/* Form for user input */}
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask me anything..."
            />
            <button type="submit">Ask</button>
        </form>

        {/* Display loading or response */}
        {loading ? (
            <div className="loading-container">Loading...</div>
        ) : (
            response && (
            <div className="response-container">
                <p>Answer: {response}</p>
            </div>
            )
        )}
        </div>
    );
};

export default Guru;

