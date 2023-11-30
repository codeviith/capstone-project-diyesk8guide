import React, { useState, useEffect } from 'react';

const Qna = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [replyInputs, setReplyInputs] = useState([]); // State to track reply inputs for each post

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

  const handleReply = (postId) => {
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
  };

  return (
    <div>
      <h2>Q&A Forum</h2>

      {/* Post Input */}
      <div>
        <label>
          Post:
          <textarea
            value={newPost}
            onChange={e => setNewPost(e.target.value)}
            placeholder="Ask a question..."
          />
        </label>
        <button onClick={handlePost}>Post</button>
      </div>

      {/* Display Posts */}
      <div>
        {posts.map((post, index) => (
          <div key={post.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <p><strong>Question:</strong> {post.post}</p>
            {/* Display Replies */}
            <div>
              {post.replies &&
                post.replies.map((reply, index) => (
                  <p key={index}><strong>Reply:</strong> {reply.reply}</p>
                ))}
            </div>
            {/* Reply Input */}
            <div>
              <label>
                Reply:
                <textarea
                  value={replyInputs[index] || ''}
                  onChange={e => {
                    const updatedInputs = [...replyInputs];
                    updatedInputs[index] = e.target.value;
                    setReplyInputs(updatedInputs);
                  }}
                  placeholder="Reply to the question..."
                />
              </label>
              <button onClick={() => handleReply(post.id)}>Reply</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Qna;












































































//////////unsure what ver this is////////////

// import React, { useState, useEffect } from 'react';

// const Qna = () => {
//   const [posts, setPosts] = useState([]);
//   const [newPost, setNewPost] = useState('');
//   const [newReply, setNewReply] = useState('');

//   useEffect(() => {
//     // Fetch posts from the backend when the component mounts
//     fetch('/qna')
//       .then(response => response.json())
//       .then(data => {
//         console.log('Fetched posts:', data);
//         setPosts(data);
//       })
//       .catch(error => console.error('Error fetching posts:', error));
//   }, []); // Empty dependency array means this effect runs once after the initial render

//   const handlePost = () => {
//     // Make a POST request to add a new post
//     fetch('/qna', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         post: newPost,
//         reply: newReply,
//       }),
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Response from server:', data);
//         // Update the state with the new post
//         setPosts(prevPosts => [...prevPosts, data]);
//         // Clear the input fields
//         setNewPost('');
//         setNewReply('');
//       })
//       .catch(error => console.error('Error posting:', error));
//   };

//   const handleReply = (postId) => {
//     // Make a POST request to add a reply to a specific post
//     fetch(`/qna/${postId}/reply`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         reply: newReply,
//       }),
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Response from server (Reply):', data);
//         // Update the state with the replied data
//         setPosts(prevPosts => {
//           const updatedPosts = prevPosts.map(post =>
//             post.id === postId ? { ...post, replies: [...(post.replies || []), data] } : post
//           );
//           return updatedPosts;
//         });
//         // Clear the reply input field
//         setNewReply('');
//       })
//       .catch(error => console.error('Error replying:', error));
//   };

//   return (
//     <div>
//       <h2>Q&A Forum</h2>

//       {/* Post Input */}
//       <div>
//         <label>
//           Post:
//           <textarea
//             value={newPost}
//             onChange={e => setNewPost(e.target.value)}
//             placeholder="Ask a question..."
//           />
//         </label>
//         <button onClick={handlePost}>Post</button>
//       </div>

//       {/* Display Posts */}
//       <div>
//         {posts.map(post => (
//           <div key={post.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
//             <p><strong>Question:</strong> {post.post}</p>
//             {/* Display Replies */}
//             <div>
//               {post.replies &&
//                 post.replies.map((reply, index) => (
//                   <p key={index}><strong>Reply:</strong> {reply.reply}</p>
//                 ))}
//             </div>
//             {/* Reply Input */}
//             <div>
//               <label>
//                 Reply:
//                 <textarea
//                   value={newReply}
//                   onChange={e => setNewReply(e.target.value)}
//                   placeholder="Reply to the question..."
//                 />
//               </label>
//               <button onClick={() => handleReply(post.id)}>Reply</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Qna;









// import React, { useState } from 'react';

// const Qna = () => {
//   const [question, setQuestion] = useState('');
//   const [answer, setAnswer] = useState('');
//   const [chatHistory, setChatHistory] = useState([]);

//   const handleQuestionPost = () => {
//     if (question.trim() === '') {
//       // Handle empty question input
//       return;
//     }

//     const newChat = [...chatHistory, { type: 'question', content: question }];
//     setChatHistory(newChat);
//     setQuestion('');
//   };

//   const handleAnswerPost = () => {
//     if (answer.trim() === '') {
//       // Handle empty answer input
//       return;
//     }

//     const newChat = [...chatHistory, { type: 'answer', content: answer }];
//     setChatHistory(newChat);
//     setAnswer('');
//   };

//   return (
//     <div>
//       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//         <div style={{ width: '48%', marginRight: '2%' }}>
//           <label>Question:</label>
//           <input
//             type="text"
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//           />
//           <button onClick={handleQuestionPost}>Post</button>
//         </div>
//         <div style={{ width: '48%' }}>
//           <label>Answer:</label>
//           <input
//             type="text"
//             value={answer}
//             onChange={(e) => setAnswer(e.target.value)}
//           />
//           <button onClick={handleAnswerPost}>Post</button>
//         </div>
//       </div>

//       <div style={{ marginTop: '20px' }}>
//         {chatHistory.map((chat, index) => (
//           <div
//             key={index}
//             style={{
//               padding: '8px',
//               margin: '8px 0',
//               border: '1px solid #ccc',
//               borderRadius: '4px',
//               maxWidth: '70%',
//               alignSelf: chat.type === 'question' ? 'flex-start' : 'flex-end',
//             }}
//           >
//             {chat.content}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Qna;



// import React, { useState, useEffect } from 'react';

// const QandAComponent = () => {
//   const [question, setQuestion] = useState('');
//   const [answer, setAnswer] = useState('');
//   const [chatHistory, setChatHistory] = useState([]);
//   const flaskApiUrl = 'your_flask_api_url_here';

//   useEffect(() => {
//     // Fetch initial chat history from the Flask API
//     fetch(flaskApiUrl)
//       .then((response) => response.json())
//       .then((data) => setChatHistory(data))
//       .catch((error) => console.error('Error fetching chat history:', error));
//   }, []);

//   const handleQuestionPost = async () => {
//     if (question.trim() === '') {
//       // Handle empty question input
//       return;
//     }

//     const newQuestion = { type: 'question', content: question };

//     try {
//       // Post question to Flask API
//       const response = await fetch(flaskApiUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newQuestion),
//       });

//       const data = await response.json();
//       setChatHistory([...chatHistory, data]);
//       setQuestion('');
//     } catch (error) {
//       console.error('Error posting question:', error);
//     }
//   };

//   const handleAnswerPost = async () => {
//     if (answer.trim() === '') {
//       // Handle empty answer input
//       return;
//     }

//     const latestQuestionId = chatHistory.length > 0 ? chatHistory[chatHistory.length - 1].id : null;
//     if (!latestQuestionId) {
//       console.error('No question to answer.');
//       return;
//     }

//     const newAnswer = { type: 'answer', content: answer };

//     try {
//       // Patch answer to Flask API
//       const response = await fetch(`${flaskApiUrl}/${latestQuestionId}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newAnswer),
//       });

//       const data = await response.json();
//       const updatedChatHistory = [...chatHistory];
//       updatedChatHistory[updatedChatHistory.length - 1] = data;
//       setChatHistory(updatedChatHistory);
//       setAnswer('');
//     } catch (error) {
//       console.error('Error posting answer:', error);
//     }
//   };

//   return (
//     <div>
//       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//         <div style={{ width: '48%', marginRight: '2%' }}>
//           <label>Question:</label>
//           <input
//             type="text"
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//           />
//           <button onClick={handleQuestionPost}>Post</button>
//         </div>
//         <div style={{ width: '48%' }}>
//           <label>Answer:</label>
//           <input
//             type="text"
//             value={answer}
//             onChange={(e) => setAnswer(e.target.value)}
//           />
//           <button onClick={handleAnswerPost}>Post</button>
//         </div>
//       </div>

//       <div style={{ marginTop: '20px' }}>
//         {chatHistory.map((chat, index) => (
//           <div
//             key={index}
//             style={{
//               padding: '8px',
//               margin: '8px 0',
//               border: '1px solid #ccc',
//               borderRadius: '4px',
//               maxWidth: '70%',
//               alignSelf: chat.type === 'question' ? 'flex-start' : 'flex-end',
//             }}
//           >
//             {chat.content}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default QandAComponent;




