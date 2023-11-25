// import React, { useState } from 'react';

// function Guru() {
//     const [query, setQuery] = useState("");
//     const [error, setError] = useState("");
//     const [user_input, setUser_input] = useState("");
//     const [answer, setAnswer] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [results, setResults] = useState([]);
//     const [answerId, setAnswerId] = useState(null)
//     const [isAnswerSaved, setIsAnswerSaved] = useState(false);
//     const [isAnswerPresent, setIsAnswerPresent] = useState(false);

//     const API_URL = 'API url';

//     async function handleSubmit(e) {
//         e.preventDefault()

//         if (user_input.length < 15) {
//             setError("Question must be at least 15 characters long")
//             return
//         }

//         setLoading(true)

//         try {
//             const response = await fetch('/guru_assistant', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     user_input,
//                 })
//             });

//             if (!response.ok) {
//                 throw new Error(`Failed to generate answer: ${response.status}`);
//             }

//             const data = await response.json();
//             setIsAnswerPresent(true);

//         } catch (error) {
//             setError(error.message);
//         } finally {
//             setLoading(false);
//         }
//     }

//     async function handleSave() {
//         try {
//             const saveResponse = await fetch('/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     question: user_input,
//                     content: answer,
//                 }),
//             });
    
//             if (!saveResponse.ok) {
//                 throw new Error(`Failed to save answer: ${saveResponse.status}`);
//             }
    
//             const data = await saveResponse.json();
//             setAnswerId(data.id)
//             setIsAnswerSaved(true);
//         } catch (error) {
//             setError(error.message);
//         }
//     }


//     return (
//         <div>
//             <div>
//                 <form onSubmit={handleSubmit} className="submit">
//                     <label> 
//                         Hello, I am the one and only Esk8 Guru. What questions do you have for me?
//                     </label>
//                     <textarea type="text" value={user_input} onChange={(e) => setUser_input(e.target.value)}/>
//                         <div style={{ display: 'flex' }}>
//                             <button type="submit">{isAnswerPresent ? 'Ask another question' : 'Ask'}</button>
//                             {isAnswerPresent && <button type="button" onClick={handleSave}>Save Answer</button>}
//                         </div>
//                 </form>

//             </div>
//         </div>
//     )
// };

// export default Guru;




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




// import React, { useState } from 'react';

// const Guru = () => {
//   const [userInput, setUserInput] = useState('');
//   const [response, setResponse] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Set loading state to true while waiting for the response
//     setLoading(true);

//     // Send user input to Flask backend
//     fetch('/guru_assistant', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ user_input: userInput }),
//     })
//     .then(response => response.json())
//     .then(data => {
//       // Update the state with the response
//       setResponse(data.content);
//     })
//     .catch(error => {
//       console.error('Error fetching data from server:', error);
//     })
//     .finally(() => {
//       // Set loading state to false when the response is received
//       setLoading(false);
//     });
//   };

//   return (
//     <div className="guru-container">
//       <p>Hello, I am the one and only Esk8 Guru. What question do you have for me?</p>

//       {/* Form for user input */}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//           placeholder="Ask me anything..."
//         />
//         <button type="submit">Ask</button>
//       </form>

//       {/* Display loading or response */}
//       {loading ? (
//         <div className="loading-container">Loading...</div>
//       ) : (
//         response && (
//           <div className="response-container">
//             <p>Answer: {response}</p>
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// export default Guru;




















/////////// BACKUP COPY /////////////
// import React, { useState } from 'react';

// const Guru = () => {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);
//   const API_URL = 'API url';

//   const handleSearch = async () => {
//     try {
//       const response = await fetch(`${API_URL}?query=${query}`);
//       const data = await response.json();
//       setResults(data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   return (
//     <div>
//       <div>
//         <input
//           type="text"
//           placeholder="Ask me anything related to electric skateboards"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <button onClick={handleSearch}>Search</button>
//       </div>
//       <div>
//         {results.map((result) => (
//           <div key={result.id}>{result.title}</div>
//           // Replace "title" with the key you want to display from the API response
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Guru;

