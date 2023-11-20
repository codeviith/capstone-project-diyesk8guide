
import React, { useState, useEffect } from 'react';

const Generate = () => {
  const [boardsData, setBoardsData] = useState([]);
  const [riderStyle, setRiderStyle] = useState('');
  const [terrainType, setTerrainType] = useState('');
  const [rangeType, setRangeType] = useState('');

  useEffect(() => {
    // Fetch data for initial dropdown options or other data if needed
    // ...

    // For demonstration purposes, using a placeholder array for board data
    setBoardsData([
      { id: 1, name: 'All Around Cruiser', specs: 'Specs for {boardsData.name}' }
      // Add more board data as needed
    ]);
  }, []);

  const handleGenerateBoard = () => {
    // Fetch data from 'Boards' model in Flask
    fetch('/boards')
      .then(response => response.json())
      .then(data => setBoardsData(data))
      .catch(error => console.error('Error fetching board data:', error));
  };
  

  const renderImageContainer = () => (
    <div>
      <h2>Image goes here</h2>
      {/* Logic for image with matching specs goes here */}
    </div>
  );


  const renderBoardSpecs = () => (
    <div>
      <h2>Sample Board Specs</h2>
      {boardsData.length > 0 ? (
        <ul>
          {boardsData.map(board => (
            <li key={board.id}>
              <strong>{board.name}</strong>
              <ul>{board.specs} </ul> 
            </li>
          ))}
        </ul>
      ) : (
        <p>No board data available. Click "Generate Board" to fetch data.</p>
      )}
    </div>
  );


  return (
    <div>
      <h2>Sample Build Generator</h2>

      {/* Dropdowns */}
      <label>
        Rider Style:
        <select value={riderStyle} onChange={(e) => setRiderStyle(e.target.value)}>
          <option value="">Select Rider Style</option>
          <option value="Drag Racing">Drag Racing</option>
          <option value="Carving">Carving</option>
          <option value="Casual Cruiser">Casual Cruiser</option>
          <option value="Hill Climber">Hill Climber</option>
        </select>
      </label>
      <br />

      <label>
        Terrain Type:
        <select value={terrainType} onChange={(e) => setTerrainType(e.target.value)}>
          <option value="">Select Terrain Type</option>
          <option value="Street">Street</option>
          <option value="All Terrain">All Terrain</option>
        </select>
      </label>
      <br />

      <label>
        Range Type:
        <select value={rangeType} onChange={(e) => setRangeType(e.target.value)}>
          <option value="">Select Range Type</option>
          <option value="Casual">Casual</option>
          <option value="Extended">Extended</option>
        </select>
      </label>
      <br />

      {/* Generate Board Button */}
      <button onClick={handleGenerateBoard}>Generate Board</button>

      {/* Display Images (To be added later) */}
      {renderImageContainer()}

      {/* Display Board Specs */}
      {renderBoardSpecs()}

    </div>
  );
};

export default Generate;