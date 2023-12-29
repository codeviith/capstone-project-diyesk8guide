import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

function Qna() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [replyInputs, setReplyInputs] = useState([]); //State to track reply inputs for each post
  const [replies, setReplies] = useState({});

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Function to check if the user is logged in
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('/check_session');
        const data = await response.json();
        setIsLoggedIn(data.logged_in);
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []);


  useEffect(() => {
    // Fetch posts from the backend when the component mounts
    fetch('/qna')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched posts:', data);
        setPosts(data);
        // Initialize replyInputs state with empty strings for each post
        setReplyInputs(data.map(() => ''));
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, []); // Empty dependency array means this effect runs once after the initial render


  const handlePost = () => {
    // Make a POST request to add a new post
    fetch('/qna', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        post: newPost,
        reply: '', // Include an empty reply field
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Response from server:', data);
        // Update the state with the new post
        setPosts(prevPosts => [...prevPosts, data]);
        // Clear the input fields
        setNewPost('');
        // Add an empty string to replyInputs for the new post
        setReplyInputs(prevInputs => [...prevInputs, '']);
      })
      .catch(error => console.error('Error posting:', error));
  };



  const fetchReplies = async (postId) => {
    try {
      const response = await fetch(`/qna/${postId}/replies`);
      const data = await response.json();
      setReplies(prevState => ({ ...prevState, [postId]: data }));
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };


  const handleReply = async (postId) => {
    // Find the index of the post in the posts array
    const postIndex = posts.findIndex(post => post.id === postId);
    // Get the reply for the specific post
    const reply = replyInputs[postIndex] || '';
    
    // Make a POST request to add a reply to a specific post
    fetch(`/qna/${postId}/reply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reply: reply,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Response from server (Reply):', data);
        // Update the state with the replied data
        setPosts(prevPosts => {
          const updatedPosts = prevPosts.map((post, index) =>
            index === postIndex ? { ...post, replies: [...(post.replies || []), data] } : post
          );
          return updatedPosts;
        });
        // Clear the reply input field for the specific post
        setReplyInputs(prevInputs => {
          const updatedInputs = [...prevInputs];
          updatedInputs[postIndex] = '';
          return updatedInputs;
        });
      })
      .catch(error => console.error('Error replying:', error));
      await fetchReplies(postId);
  };


  useEffect(() => {
    // Fetch replies for each post when the component mounts
    posts.forEach(post => fetchReplies(post.id));
  }, [posts]);


  return (
    <div className='qna'>
      <h2>Q&A Forum</h2>

      {/* Post Input */}
      <div className='post_input'>
        <label className='post_label'>
          Post:
          <textarea className='post_input_value'
            value={newPost}
            onChange={e => setNewPost(e.target.value)}
            placeholder="Ask a question..."
          />
        </label>
        <button className='post_button' onClick={handlePost}>Post</button>
      </div>

      {/* Display Posts */}
      <div className='display_posts'>
        {posts.map((post, index) => (
          <div key={post.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <p><strong>Question:</strong> {post.post}</p>
            {/* Display Replies */}
            <div className='display_replies'>
              {replies[post.id] &&
                replies[post.id].map((reply, index) => (
                  <p key={index}><strong>Reply:</strong> {reply.reply}</p>
                ))}
            </div>
            {/* Reply Input */}
            <div className='reply_input'>
              <label className='reply_label'>
                Reply:
                <textarea className='reply_input_value'
                  value={replyInputs[index] || ''}
                  onChange={e => {
                    const updatedInputs = [...replyInputs];
                    updatedInputs[index] = e.target.value;
                    setReplyInputs(updatedInputs);
                  }}
                  placeholder="Reply to the question..."
                />
              </label>
              <button className='reply_button' onClick={() => handleReply(post.id)}>Reply</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Qna;


