import React, { useState, useEffect } from 'react';

// Import images
import st_img1 from './images/ID1.jpg';
import st_img2 from './images/ID2.jpeg';
import st_img3 from './images/ID5.jpeg';
import st_img4 from './images/ID6.jpeg';
import at_img1 from './images/ID7.jpg';
import at_img2 from './images/ID4.jpeg';
import at_img3 from './images/ID3.jpg';

// let street_images = [st_img1, st_img2, st_img3, st_img4];
// let all_terrain_images = [at_img1, at_img2, at_img3];


const Home = () => {
  const [boards, setBoards] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch data for boards
    fetch('/boards')
      .then(response => response.json())
      .then(data => setBoards(data));

    // Fetch data for questions
    fetch('/questions')
      .then(response => response.json())
      .then(data => setQuestions(data));

    // Fetch data for posts
    fetch('/posts')
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []); // Empty dependency array means this effect runs once after the initial render


  const handleDelete = (id) => {
    // fetch from flask models
    fetch(`/boards/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        // Handle success or show a message
        console.log(`Deleted board with ID ${id}`);
        // Update the state to reflect the changes (remove the deleted item)
        setBoards(prevBoards => prevBoards.filter(board => board.id !== id));
      })
      .catch(error => console.error(`Error deleting board:`, error));
  };



  const renderContainer = (category, items) => (
    <div>
      <h2>{category}</h2>
      {items.length > 0 ? (
        <ul>
          {items.map((board, index) => (
            <div key={board.id}>
              <strong>{board.name}</strong>
              {/* Image */}
              <img src={board.image_url} alt={`${board.name} Board`} style={{ maxWidth: '100%' }} />
              {/* Specs */}
              <ul>
                <li>Deck Type: {board.deck_type}</li>
                <li>Deck Length: {board.deck_length}</li>
                <li>Deck Material: {board.deck_material}</li>
                <li>Truck Type: {board.truck_type}</li>
                <li>Truck Width: {board.truck_width}</li>
                <li>Controller Feature: {board.controller_feature}</li>
                <li>Controller Type: {board.controller_type}</li>
                <li>Remote Feature: {board.remote_feature}</li>
                <li>Remote Type: {board.remote_type}</li>
                <li>Motor Size: {board.motor_size}</li>
                <li>Motor Kv: {board.motor_kv}</li>
                <li>Wheel Size: {board.wheel_size}</li>
                <li>Wheel Type: {board.wheel_type}</li>
                <li>Battery Voltage: {board.battery_voltage}</li>
                <li>Battery Type: {board.battery_type}</li>
                <li>Battery Capacity: {board.battery_capacity}</li>
                <li>Battery Configuration: {board.battery_configuration}</li>
                <li>Range: {board.range_mileage}</li>
              </ul>
              {/* Delete Button */}
              <button onClick={() => handleDelete(board.id)}>Delete</button>
            </div>
          ))}
        </ul>
      ) : (
        <p>{`No ${category.toLowerCase()} to show.`}</p>
      )}
    </div>
  );

  return (
    <div>
      {renderContainer('Boards', boards)}
      {renderContainer('Questions', questions)}
      {renderContainer('Posts', posts)}
    </div>
  );
};

export default Home;