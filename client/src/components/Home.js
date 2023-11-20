
import React, { useState, useEffect } from 'react';

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

  const handleDelete = (category, id) => {
    // fetch from flask models
    fetch(`/${category}/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        // Handle success or show a message
        console.log(`Deleted ${category} with ID ${id}`);
        // Update the state to reflect the changes (e.g., remove the deleted item)
        if (category === 'Boards') {
          setBoards(prevBoards => prevBoards.filter(board => board.id !== id));
        } else if (category === 'Questions') {
          setQuestions(prevQuestions => prevQuestions.filter(question => question.id !== id));
        } else if (category === 'Posts') {
          setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
        }
      })
      .catch(error => console.error(`Error deleting ${category}:`, error));
  };

  const renderContainer = (category, items) => (
    <div>
      <h2>{`${category}`}</h2>
      {items.length > 0 ? (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.name || item.title}
              {/* Delete Button */}
              <button onClick={() => handleDelete(category, item.id)}>Delete</button>
            </li>
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