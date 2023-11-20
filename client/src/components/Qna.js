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



import React, { useState, useEffect } from 'react';

const QandAComponent = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const flaskApiUrl = 'your_flask_api_url_here';

  useEffect(() => {
    // Fetch initial chat history from the Flask API
    fetch(flaskApiUrl)
      .then((response) => response.json())
      .then((data) => setChatHistory(data))
      .catch((error) => console.error('Error fetching chat history:', error));
  }, []);

  const handleQuestionPost = async () => {
    if (question.trim() === '') {
      // Handle empty question input
      return;
    }

    const newQuestion = { type: 'question', content: question };

    try {
      // Post question to Flask API
      const response = await fetch(flaskApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuestion),
      });

      const data = await response.json();
      setChatHistory([...chatHistory, data]);
      setQuestion('');
    } catch (error) {
      console.error('Error posting question:', error);
    }
  };

  const handleAnswerPost = async () => {
    if (answer.trim() === '') {
      // Handle empty answer input
      return;
    }

    const latestQuestionId = chatHistory.length > 0 ? chatHistory[chatHistory.length - 1].id : null;
    if (!latestQuestionId) {
      console.error('No question to answer.');
      return;
    }

    const newAnswer = { type: 'answer', content: answer };

    try {
      // Patch answer to Flask API
      const response = await fetch(`${flaskApiUrl}/${latestQuestionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAnswer),
      });

      const data = await response.json();
      const updatedChatHistory = [...chatHistory];
      updatedChatHistory[updatedChatHistory.length - 1] = data;
      setChatHistory(updatedChatHistory);
      setAnswer('');
    } catch (error) {
      console.error('Error posting answer:', error);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '48%', marginRight: '2%' }}>
          <label>Question:</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button onClick={handleQuestionPost}>Post</button>
        </div>
        <div style={{ width: '48%' }}>
          <label>Answer:</label>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button onClick={handleAnswerPost}>Post</button>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            style={{
              padding: '8px',
              margin: '8px 0',
              border: '1px solid #ccc',
              borderRadius: '4px',
              maxWidth: '70%',
              alignSelf: chat.type === 'question' ? 'flex-start' : 'flex-end',
            }}
          >
            {chat.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QandAComponent;