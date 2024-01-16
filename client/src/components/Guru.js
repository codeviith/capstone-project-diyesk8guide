import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

function Guru() {
    const [userInput, setUserInput] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const { isLoggedIn } = useContext(AuthContext); // Using useContext to access isLoggedIn

    const formatResponse = (response) => {
        const lines = response.split('\n');

        return lines.map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    }

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

    const responseStyle = {
        textAlign: 'justify',
        textJustify: 'inter-word'
    };

    return (
        <div>
            {isLoggedIn ? (
                <>
                    {/* Form for user input */}
                    <form className="guru-form" onSubmit={handleSubmit}>
                        <strong className='guru-prompt'> Hello, I am your Esk8 Guru. What question do you have for me? </strong>
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Ask me anything about electric skateboards..."
                        />
                        <button className='guru-button' type="guru-submit">Ask</button>
                    </form>

                    {/* Display loading or response */}
                    {loading ? (
                        <div className="loading-container">Thinking... Please Wait</div>
                    ) : (
                        response && (
                            <div className="response-container" style={responseStyle}>
                                <p><strong className='guru-answer'> Answer: </strong></p>
                                {formatResponse(response)}
                            </div>
                        )
                    )}
                </>
            ) : (
                <p className='login-request'>Please log in to ask a question.</p>
            )}
        </div>
    );
};

export default Guru;

