// import React, {useState, useEffect} from "react";
// import { Link, Switch, Route, BrowserRouter } from "react-router-dom";
// import About from "./About";
// import NavBar from "./NavBar";


// function Generate() {
//   const [eboards, setEboards] = useState([])
//   const [query, setQuery] = useState("")




//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Generate




import React, {useState, useEffect} from "react";


const Generate = () => {
  const [boardData, setBoardData] = useState(null);

  const handleGenerate = () => {
    fetch('flask-endpoint/boards')
      .then(response => response.json())
      .then(data => setBoardData(data))
      .catch(error => console.error('Error fetching board data:', error));
  };

  return (
    <div>
      <h2>Generate Component</h2>
      
      <button onClick={handleGenerate}>Generate</button>

      <div>
        <h3>Picture Container (To be added later)</h3>
        {/* Placeholder for picture container */}
      </div>

      <div>
        <h3>Data Container</h3>
        {boardData ? (
          <ul>
            {boardData.map(board => (
              <li key={board.id}>
                <strong>{board.name}</strong> - {board.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No data generated yet. Click "Generate" to fetch data.</p>
        )}
      </div>
    </div>
  );
};

export default Generate;
