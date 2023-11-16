import React, { useState, useEffect } from 'react';

const Home = () => {
  const [boards, setBoards] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch data for boards
    fetch('flask-endpoint/boards')
      .then(response => response.json())
      .then(data => setBoards(data));

    // Fetch data for questions
    fetch('flask-endpoint/questions')
      .then(response => response.json())
      .then(data => setQuestions(data));

    // Fetch data for posts
    fetch('flask-endpoint/posts')
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []); // Empty dependency array means this effect runs once after the initial render

  const handleDelete = (category, id) => {
    // Make a DELETE request to your Flask API to delete the item
    fetch(`flask-endpoint/${category}/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Invalid Network Response');
        }
        // Remove the deleted item from the state
        switch (category) {
          case 'boards':
            setBoards(prevBoards => prevBoards.filter(board => board.id !== id));
            break;
          case 'questions':
            setQuestions(prevQuestions => prevQuestions.filter(question => question.id !== id));
            break;
          case 'posts':
            setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
            break;
          default:
            break;
        }
      })
      .catch(error => console.error('Error deleting item:', error));
  };

  const renderList = (category, items) => (
    <div>
      <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            {index + 1}. {item.name || item.title}
            <button onClick={() => handleDelete(category, item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
      {boards.length > 0 && renderList('boards', boards)}
      {questions.length > 0 && renderList('questions', questions)}
      {posts.length > 0 && renderList('posts', posts)}
    </div>
  );
};

export default Home;

