// import React, { useState } from 'react';

// function Guru() {
//     const [query, setQuery] = useState('');
//     const [user_input, setUser_input] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [results, setResults] = useState([]);
//     const [isAnswerSaved, setIsAnswerSaved] = useState(false);
//     const [isAnswerPresent, setIsAnswerPresent] = useState(false);

// //   const API_URL = 'API url';

//     async function handleSubmit(e) {
//         e.preDefault()

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



// //   const handleSearch = async () => {
// //     try {
// //       const response = await fetch(`${API_URL}?query=${query}`);
// //       const data = await response.json();
// //       setResults(data);
// //     } catch (error) {
// //       console.error('Error fetching data:', error);
// //     }
// //   };

//     return (
//         <div>
//             <div>
//                 <input
//                     type="text"
//                     placeholder="Ask me anything related to electric skateboards"
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                 />
//                 <button onClick={handleSearch}>Search</button>
//             </div>
//             <div>
//                 {results.map((result) => (
//                     <div key={result.id}>{result.title}</div>
//                     // Replace "title" with the key you want to display from the API response
//                 ))}
//             </div>
//         </div>
//     )
// };

// export default Guru;















/////////// BACKUP COPY /////////////
import React, { useState } from 'react';

const Guru = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const API_URL = 'API url';

  const handleSearch = async () => {
    try {
      const response = await fetch(`${API_URL}?query=${query}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Ask me anything related to electric skateboards"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        {results.map((result) => (
          <div key={result.id}>{result.title}</div>
          // Replace "title" with the key you want to display from the API response
        ))}
      </div>
    </div>
  );
};

export default Guru;

