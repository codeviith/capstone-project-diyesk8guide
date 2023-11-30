
import React, { useState, useEffect } from 'react';

const Home = () => {
  const [boards, setBoards] = useState([]);
  const [posts, setPosts] = useState([]);
  const [replies, setReplies] = useState([]);
  const [guruData, setGuruData] = useState([]);

  useEffect(() => {
    // Fetch data for boards
    fetch('/boards')
      .then(response => response.json())
      .then(data => setBoards(data));

    // Fetch data for questions
    fetch('/guru')
      .then(response => response.json())
      .then(data => setGuruData(data));

    // Fetch data for posts
    fetch('/qna')
      .then(response => response.json())
      .then(data => setPosts(data));

    // Fetch data for replies (for each post individually)
    fetch('/qna')
      .then(response => response.json())
      .then(data => {
        // Assuming each post has an 'id' property
        const postIds = data.map(post => post.id);
        // Fetch replies for each post
        postIds.forEach(postId => {
          fetch(`/qna/${postId}/replies`)
            .then(response => response.json())
            .then(replies => setReplies(prevReplies => [...prevReplies, ...replies]))
            .catch(error => console.error(`Error fetching replies for post ${postId}:`, error));
        });
      });
  }, []);

  

  const handleDelete = (id, category) => {
    let endpoint = '';
  
    // Define the endpoint based on the category
    if (category === 'Boards') {
      endpoint = `/boards/${id}`;
    } else if (category === 'Posts' || category === 'Replies') {
      endpoint = `/qna/${id}`;
    }
  
    fetch(endpoint, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to delete ${category} with ID ${id}`);
        }
        return response.json();
      })
      .then(data => {
        // Handle success or show a message
        console.log(`Deleted ${category} with ID ${id}`);
        // Update the state to reflect the changes (remove the deleted item)
        if (category === 'Boards') {
          setBoards(prevBoards => prevBoards.filter(board => board.id !== id));
        } else if (category === 'Posts') {
          setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
        } else if (category === 'Replies') {
          setReplies(prevReplies => prevReplies.filter(reply => reply.id !== id));
        }
      })
      .catch(error => console.error(`Error deleting ${category.toLowerCase()}:`, error));
  };

  const renderContainer = (category, items) => (
    <div className='render_container'>
      <h2>{category}</h2>
      {items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <div key={item.id}>
              <strong>{item.question || item.name}</strong>
              {/* Display additional details based on the category */}
              {category === 'Boards' && (
                <>
                  {/* Image */}
                  <img src={item.image_url} alt={`${item.name} Board`} style={{ maxWidth: '100%' }} />
                  {/* Specs */}
                  <ul>
                  <strong> Deck </strong>
                    <li><strong>Deck Type: </strong>{item.deck_type}</li>
                    <li><strong>Deck Length: </strong>{item.deck_length}</li>
                    <li><strong>Deck Material: </strong>{item.deck_material}</li>
                  <strong> Truck </strong>
                    <li><strong>Truck Type: </strong>{item.truck_type}</li>
                    <li><strong>Truck Width: </strong>{item.truck_width}</li>
                  <strong> Controller </strong>
                    <li><strong>Controller Feature: </strong>{item.controller_feature}</li>
                    <li><strong>Controller Type: </strong>{item.controller_type}</li>
                  <strong> Remote </strong>
                    <li><strong>Remote Feature: </strong>{item.remote_feature}</li>
                    <li><strong>Remote Type: </strong>{item.remote_type}</li>
                  <strong> Motor </strong>
                    <li><strong>Motor Size: </strong>{item.motor_size}</li>
                    <li><strong>Motor Kv: </strong>{item.motor_kv}</li>
                  <strong> Wheel </strong>
                    <li><strong>Wheel Size: </strong>{item.wheel_size}</li>
                    <li><strong>Wheel Type: </strong>{item.wheel_type}</li>
                  <strong> Battery </strong>
                    <li><strong>Battery Voltage: </strong>{item.battery_voltage}</li>
                    <li><strong>Battery Type: </strong>{item.battery_type}</li>
                    <li><strong>Battery Capacity: </strong>{item.battery_capacity}</li>
                    <li><strong>Battery Configuration: </strong>{item.battery_configuration}</li>
                  <strong> Range </strong>
                    <li><strong>Range: </strong>{item.range_mileage}</li>
                  </ul>
                </>
              )}
              {category === 'Questions' && (
                <>
                  {/* Display additional details for questions */}
                  <p><strong>Question: </strong> {item.user_input}</p>
                  <p><strong>Answer: </strong> {item.answer}</p>
                </>
              )}
              {category === 'Posts' && (
                <>
                  {/* Display additional details for posts */}
                  <p></p>
                  <p><strong>Post: </strong> {item.post}</p>
                  <p>Timestamp: {item.timestamp}</p>
                </>
              )}
              {category === 'Replies' && (
                <>
                  {/* Display additional details for replies */}
                  <p></p>
                  <p><strong>Reply: </strong> {item.reply} </p>
                  <p>Timestamp: {item.timestamp}</p>
                </>
              )}
              {/* Delete Button */}
              <button onClick={() => handleDelete(item.id, category)}>Delete</button>
            </div>
          ))}
        </ul>
      ) : (
        <p>{`No ${category.toLowerCase()} to show.`}</p>
      )}
    </div>
  );

  return (
    <div className='home'>
      {renderContainer('Boards', boards)}
      {renderContainer('Questions', guruData)}
      {renderContainer('Posts', posts)}
      {renderContainer('Replies', replies)}
    </div>
  );
};

export default Home;








/////working for all three with a minor issue with the replies being posted twice.../////

// import React, { useState, useEffect } from 'react';

// const Home = () => {
//   const [boards, setBoards] = useState([]);
//   const [posts, setPosts] = useState([]);
//   const [replies, setReplies] = useState([]);
//   const [guruData, setGuruData] = useState([]);

//   useEffect(() => {
//     // Fetch data for boards
//     fetch('/boards')
//       .then(response => response.json())
//       .then(data => setBoards(data));

//     // Fetch data for questions
//     fetch('/guru')
//       .then(response => response.json())
//       .then(data => setGuruData(data));

//     // Fetch data for posts
//     fetch('/qna')
//       .then(response => response.json())
//       .then(data => setPosts(data));

//     // Fetch data for replies (for each post individually)
//     fetch('/qna')
//       .then(response => response.json())
//       .then(data => {
//         // Assuming each post has an 'id' property
//         const postIds = data.map(post => post.id);
//         // Fetch replies for each post
//         postIds.forEach(postId => {
//           fetch(`/qna/${postId}/replies`)
//             .then(response => response.json())
//             .then(replies => setReplies(prevReplies => [...prevReplies, ...replies]))
//             .catch(error => console.error(`Error fetching replies for post ${postId}:`, error));
//         });
//       });
//   }, []);

  

//   const handleDelete = (id, category) => {
//     let endpoint = '';
  
//     // Define the endpoint based on the category
//     if (category === 'Boards') {
//       endpoint = `/boards/${id}`;
//     } else if (category === 'Posts' || category === 'Replies') {
//       endpoint = `/qna/${id}`;
//     }
  
//     fetch(endpoint, {
//       method: 'DELETE',
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`Failed to delete ${category} with ID ${id}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         // Handle success or show a message
//         console.log(`Deleted ${category} with ID ${id}`);
//         // Update the state to reflect the changes (remove the deleted item)
//         if (category === 'Boards') {
//           setBoards(prevBoards => prevBoards.filter(board => board.id !== id));
//         } else if (category === 'Posts') {
//           setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
//         } else if (category === 'Replies') {
//           setReplies(prevReplies => prevReplies.filter(reply => reply.id !== id));
//         }
//       })
//       .catch(error => console.error(`Error deleting ${category.toLowerCase()}:`, error));
//   };

//   const renderContainer = (category, items) => (
//     <div>
//       <h2>{category}</h2>
//       {items.length > 0 ? (
//         <ul>
//           {items.map((item) => (
//             <div key={item.id}>
//               <strong>{item.question || item.name}</strong>
//               {/* Display additional details based on the category */}
//               {category === 'Boards' && (
//                 <>
//                   {/* Image */}
//                   <img src={item.image_url} alt={`${item.name} Board`} style={{ maxWidth: '100%' }} />
//                   {/* Specs */}
//                   <ul>
//                   <strong> Deck </strong>
//                     <li><strong>Deck Type: </strong>{item.deck_type}</li>
//                     <li><strong>Deck Length: </strong>{item.deck_length}</li>
//                     <li><strong>Deck Material: </strong>{item.deck_material}</li>
//                   <strong> Truck </strong>
//                     <li><strong>Truck Type: </strong>{item.truck_type}</li>
//                     <li><strong>Truck Width: </strong>{item.truck_width}</li>
//                   <strong> Controller </strong>
//                     <li><strong>Controller Feature: </strong>{item.controller_feature}</li>
//                     <li><strong>Controller Type: </strong>{item.controller_type}</li>
//                   <strong> Remote </strong>
//                     <li><strong>Remote Feature: </strong>{item.remote_feature}</li>
//                     <li><strong>Remote Type: </strong>{item.remote_type}</li>
//                   <strong> Motor </strong>
//                     <li><strong>Motor Size: </strong>{item.motor_size}</li>
//                     <li><strong>Motor Kv: </strong>{item.motor_kv}</li>
//                   <strong> Wheel </strong>
//                     <li><strong>Wheel Size: </strong>{item.wheel_size}</li>
//                     <li><strong>Wheel Type: </strong>{item.wheel_type}</li>
//                   <strong> Battery </strong>
//                     <li><strong>Battery Voltage: </strong>{item.battery_voltage}</li>
//                     <li><strong>Battery Type: </strong>{item.battery_type}</li>
//                     <li><strong>Battery Capacity: </strong>{item.battery_capacity}</li>
//                     <li><strong>Battery Configuration: </strong>{item.battery_configuration}</li>
//                   <strong> Range </strong>
//                     <li><strong>Range: </strong>{item.range_mileage}</li>
//                   </ul>
//                 </>
//               )}
//               {category === 'Questions' && (
//                 <>
//                   {/* Display additional details for questions */}
//                   <p><strong>Question: </strong> {item.user_input}</p>
//                   <p><strong>Answer: </strong> {item.answer}</p>
//                 </>
//               )}
//               {category === 'Posts' && (
//                 <>
//                   {/* Display additional details for posts */}
//                   <p></p>
//                   <p><strong>Post: </strong> {item.post}</p>
//                   <p>Timestamp: {item.timestamp}</p>
//                 </>
//               )}
//               {category === 'Replies' && (
//                 <>
//                   {/* Display additional details for replies */}
//                   <p></p>
//                   <p><strong>Reply: </strong> {item.reply} </p>
//                   <p>Timestamp: {item.timestamp}</p>
//                 </>
//               )}
//               {/* Delete Button */}
//               <button onClick={() => handleDelete(item.id, category)}>Delete</button>
//             </div>
//           ))}
//         </ul>
//       ) : (
//         <p>{`No ${category.toLowerCase()} to show.`}</p>
//       )}
//     </div>
//   );

//   return (
//     <div>
//       {renderContainer('Boards', boards)}
//       {renderContainer('Questions', guruData)}
//       {renderContainer('Posts', posts)}
//       {renderContainer('Replies', replies)}
//     </div>
//   );
// };

// export default Home;

