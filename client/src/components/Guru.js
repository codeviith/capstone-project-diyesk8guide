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

