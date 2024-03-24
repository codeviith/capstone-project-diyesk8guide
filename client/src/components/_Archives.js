// import React, { useState, useEffect } from 'react';
// import { AuthContext } from './AuthContext';

// function Qna() {
//   const [posts, setPosts] = useState([]);
//   const [newPost, setNewPost] = useState('');
//   const [replyInputs, setReplyInputs] = useState([]); //State to track reply inputs for each post
//   const [replies, setReplies] = useState({});

//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     // Function to check if the user is logged in
//     const checkLoginStatus = async () => {
//       try {
//         const response = await fetch('/check_session');
//         const data = await response.json();
//         setIsLoggedIn(data.logged_in);
//       } catch (error) {
//         console.error('Error checking login status:', error);
//       }
//     };

//     checkLoginStatus();
//   }, []);


//   useEffect(() => {
//     // Fetch posts from the backend when the component mounts
//     fetch('/qna')
//       .then(response => response.json())
//       .then(data => {
//         console.log('Fetched posts:', data);
//         setPosts(data);
//         // Initialize replyInputs state with empty strings for each post
//         setReplyInputs(data.map(() => ''));
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
//         reply: '', // Include an empty reply field
//       }),
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Response from server:', data);
//         // Update the state with the new post
//         setPosts(prevPosts => [...prevPosts, data]);
//         // Clear the input fields
//         setNewPost('');
//         // Add an empty string to replyInputs for the new post
//         setReplyInputs(prevInputs => [...prevInputs, '']);
//       })
//       .catch(error => console.error('Error posting:', error));
//   };



//   const fetchReplies = async (postId) => {
//     try {
//       const response = await fetch(`/qna/${postId}/replies`);
//       const data = await response.json();
//       setReplies(prevState => ({ ...prevState, [postId]: data }));
//     } catch (error) {
//       console.error('Error fetching replies:', error);
//     }
//   };


//   const handleReply = async (postId) => {
//     // Find the index of the post in the posts array
//     const postIndex = posts.findIndex(post => post.id === postId);
//     // Get the reply for the specific post
//     const reply = replyInputs[postIndex] || '';
    
//     // Make a POST request to add a reply to a specific post
//     fetch(`/qna/${postId}/reply`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         reply: reply,
//       }),
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Response from server (Reply):', data);
//         // Update the state with the replied data
//         setPosts(prevPosts => {
//           const updatedPosts = prevPosts.map((post, index) =>
//             index === postIndex ? { ...post, replies: [...(post.replies || []), data] } : post
//           );
//           return updatedPosts;
//         });
//         // Clear the reply input field for the specific post
//         setReplyInputs(prevInputs => {
//           const updatedInputs = [...prevInputs];
//           updatedInputs[postIndex] = '';
//           return updatedInputs;
//         });
//       })
//       .catch(error => console.error('Error replying:', error));
//       await fetchReplies(postId);
//   };


//   useEffect(() => {
//     // Fetch replies for each post when the component mounts
//     posts.forEach(post => fetchReplies(post.id));
//   }, [posts]);


//   return (
//     <div className='qna'>
//       <h2>Q&A Forum</h2>

//       {/* Post Input */}
//       <div className='post_input'>
//         <label className='post_label'>
//           Post:
//           <textarea className='post_input_value'
//             value={newPost}
//             onChange={e => setNewPost(e.target.value)}
//             placeholder="Ask a question..."
//           />
//         </label>
//         <button className='post_button' onClick={handlePost}>Post</button>
//       </div>

//       {/* Display Posts */}
//       <div className='display_posts'>
//         {posts.map((post, index) => (
//           <div key={post.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
//             <p><strong>Question:</strong> {post.post}</p>
//             {/* Display Replies */}
//             <div className='display_replies'>
//               {replies[post.id] &&
//                 replies[post.id].map((reply, index) => (
//                   <p key={index}><strong>Reply:</strong> {reply.reply}</p>
//                 ))}
//             </div>
//             {/* Reply Input */}
//             <div className='reply_input'>
//               <label className='reply_label'>
//                 Reply:
//                 <textarea className='reply_input_value'
//                   value={replyInputs[index] || ''}
//                   onChange={e => {
//                     const updatedInputs = [...replyInputs];
//                     updatedInputs[index] = e.target.value;
//                     setReplyInputs(updatedInputs);
//                   }}
//                   placeholder="Reply to the question..."
//                 />
//               </label>
//               <button className='reply_button' onClick={() => handleReply(post.id)}>Reply</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Qna;




        // Fetch data for posts
        // fetch('/qna')
        //     .then(response => response.json())
        //     .then(data => setPosts(data));

        // // Fetch data for replies (for each post individually)
        // fetch('/qna')
        //     .then(response => response.json())
        //     .then(data => {
        //         // Assuming each post has an 'id' property
        //         const postIds = data.map(post => post.id);
        //         // Fetch replies for each post
        //         postIds.forEach(postId => {
        //             fetch(`/qna/${postId}/replies`)
        //                 .then(response => response.json())
        //                 .then(replies => setReplies(prevReplies => [...prevReplies, ...replies]))
        //                 .catch(error => console.error(`Error fetching replies for post ${postId}:`, error));
        //         });
        //     });




        // } else if (category === 'Posts' || category === 'Replies') {
        //     endpoint = `/qna/${id}`;





                // } else if (category === 'Posts') {
                //     setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
                // } else if (category === 'Replies') {
                //     setReplies(prevReplies => prevReplies.filter(reply => reply.id !== id));
                // }





/* qna component */

// .qna {
//         max-width: 1300px;
//         margin: 0 auto;
//         padding: 20px;
//         text-align: center;
//         background-color: gray;
//         border-radius: 8px;
//         box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//       }
      
//       .qna h2 {
//         color: black;
//         font-size: 32px;
//         margin-top: 2px;
//         margin-bottom: 20px;
//       }
      
//       .qna .post_input {
//         margin-bottom: 20px;
//       }
      
//       .qna .post_label {
//         display: block;
//         margin-bottom: 10px;
//         font-size: 20px;
//       }
      
//       .qna .post_input_value {
//         width: 98%;
//         padding: 7px;
//         border: 1px solid #ccc;
//         border-radius: 8px;
//         font-size: 15px;
//       }
      
//       .qna .post_button {
//         background-color: rgb(3, 3, 117);
//         color: white;
//         padding: 10px 20px;
//         border: none;
//         border-radius: 8px;
//         cursor: pointer;
//       }
      
//       .qna .post_button:hover {
//         background-color: rgb(4, 43, 185); /* Example: Dark background color on hover */
//         box-shadow: 0 0 10px rgba(255, 255, 255, 0.5)
//       }
      
//       .qna .display_posts {
//         display: grid;
//         gap: 20px;
//       }
      
//       .qna .display_posts div {
//         border: 1px solid #ccc;
//         padding: 10px;
//         margin-bottom: 10px;
//       }
      
//       .qna .display_posts p {
//         margin: 0;
//       }
      
//       .qna .display_posts strong {
//         font-weight: bold;
//       }
      
//       .qna .display_replies {
//         margin-top: 10px;
//       }
      
//       .qna .display_replies p {
//         margin: 0;
//       }
      
//       .qna .reply_input {
//         margin-top: 20px;
//       }
      
//       .qna .reply_label {
//         display: flex;
//         margin-bottom: 10px;
//         font-size: 20px;
//       }
      
//       .qna .reply_input_value {
//         width: 90%;
//         padding: 7px;
//         border: 1px solid #ccc;
//         border-radius: 8px;
//         font-size: 15px;
//       }
      
//       .qna .reply_button {
//         background-color: rgb(3, 3, 117);
//         color: white;
//         padding: 10px 20px;
//         border: none;
//         border-radius: 8px;
//         cursor: pointer;
//       }
      
//       .qna .reply_button:hover {
//         background-color: rgb(4, 43, 185); /* Example: Dark background color on hover */
//         box-shadow: 0 0 10px rgba(255, 255, 255, 0.5)
//       }



/* generate component */
// Import images
// import st_img1 from "./images/ID1.jpg";
// import st_img2 from "./images/ID2.jpeg";
// import st_img3 from "./images/ID5.jpeg";
// import st_img4 from "./images/ID6.jpeg";
// import st_img5 from "./images/ID8.jpeg";
// import st_img6 from "./images/ID9.jpg";
// import st_img7 from "./images/ID10.jpg";
// import st_img8 from "./images/ID11.jpg";
// import st_img9 from "./images/ID14.jpg";
// import st_img10 from "./images/ID15.jpg";
// import st_img11 from "./images/ID16.jpg";
// import st_img12 from "./images/ID17.jpg";

// import at_img1 from "./images/ID7.jpg";
// import at_img2 from "./images/ID4.jpeg";
// import at_img3 from "./images/ID3.jpg";
// import at_img4 from "./images/ID18.jpg";
// import at_img5 from "./images/ID19.jpeg";
// import at_img6 from "./images/ID20.jpeg";
// import at_img7 from "./images/ID21.jpeg";
// import at_img8 from "./images/ID22.jpeg";
// import at_img9 from "./images/ID23.jpeg";

/////Code to generate random and non-repeating images:
// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// }

// function getRandomImageGenerator(images) {
//   let shuffledImages = shuffleArray([...images]);
//   let currentIndex = 0;

//   return function getNextRandomImage() {
//     if (currentIndex >= shuffledImages.length) {
//       // Reshuffle when all images have been used
//       shuffledImages = shuffleArray([...images]);
//       currentIndex = 0;
//     }
//     return shuffledImages[currentIndex++];
//   };
// }

//Creating the variables to be put into main code:
// const getNextRandomStreetImage = getRandomImageGenerator([
//   st_img1,
//   st_img2,
//   st_img3,
//   st_img4,
//   st_img5,
//   st_img6,
//   st_img7,
//   st_img8,
//   st_img9,
//   st_img10,
//   st_img11,
//   st_img12,
// ]);
// const getNextRandomAllTerrainImage = getRandomImageGenerator([
//   at_img1,
//   at_img2,
//   at_img3,
//   at_img4,
//   at_img5,
//   at_img6,
//   at_img7,
//   at_img8,
//   at_img9,
// ]);


  // const renderImageContainer = () => (
  //   <div className="render_image_container">
  //     <p></p>
  //     {boardsData.length > 0 ? (
  //       <>
  //         {boardsData.map((board, index) => (
  //           <div key={index}>
  //             {board.wheel_type.toLowerCase().includes("pneumatic") ? (
  //               <img
  //                 src={imageURL}
  //                 alt="All Terrain Board"
  //                 style={{ maxWidth: "100%" }}
  //               />
  //             ) : (
  //               <img
  //                 src={imageURL}
  //                 alt="Street Board"
  //                 style={{ maxWidth: "100%" }}
  //               />
  //             )}
  //           </div>
  //         ))}
  //       </>
  //     ) : (
  //       <p>
  //         No image available. Click <strong>"Generate Board"</strong> to fetch
  //         data.
  //       </p>
  //     )}
  //   </div>
  // );

        // setImageURL(getNextRandomStreetImage());
        // setImageURL(getNextRandomAllTerrainImage());

            {/* Display Images */}
          {/* {renderImageContainer()} */}





          
          // import React, { useState, useContext } from 'react';
          // import { useHistory } from 'react-router-dom';
          // import { AuthContext } from './AuthContext';
          
          // const Login = () => {
          //   const [loginData, setLoginData] = useState({
          //     email: '',
          //     password: '',
          //   });
          //   const [message, setMessage] = useState({ content: '', type: '' });
          //   const [errors, setErrors] = useState({});
          //   const { setIsLoggedIn } = useContext(AuthContext);
          
          //   const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:5555';
          
          //   // Code to initialize useHistory hook for navigation
          //   const history = useHistory();
          
          //   const handleLoginSubmit = (e) => {
          //     e.preventDefault();
          //     setMessage({ content: '', type: '' });
          
          //     if (!validateForm()) {  // Code to validate the form before attempting to log in.
          //       return;  //  The empty return here is to stop the submission if the validation fails.
          //     }
          
          //     fetch(`${backendUrl}/login`, {
          //       method: 'POST',
          //       credentials: 'include', //*******code to include cookies********
          //       headers: {
          //         'Content-Type': 'application/json',
          //       },
          //       body: JSON.stringify(loginData),
          //     })
          //       .then(response => response.json())
          //       .then(data => {
          //         if (data.success) {
          //           setIsLoggedIn(true);
          //           setMessage({ content: 'Login Successful. Redirecting...', type: 'success' });
          //           setTimeout(() => {
          //             history.push('/profile');
          //           }, 2000);
          //         } else {
          //           console.error('Login failed:', data.message);
          //           setMessage({ content: 'Login failed. Please check your email and password then try again.', type: 'error' });
          //         }
          //       })
          //       .catch(error => {
          //         console.error('Error during login:', error);
          //         setMessage({ content: 'An error occurred during login.', type: 'error' });
          //       });
          //   };
          
          //   const handleCreateAccount = () => {
          //     history.push('/signup');
          //   };
          
          //   const validateForm = () => {
          //     let valErrors = {email: '', password: ''};
          //     let isValid = true;
          
          //     if (!loginData.email) {
          //       valErrors.email = 'Email cannot be empty.';
          //       isValid = false;
          //     }
          
          //     if (!loginData.password) {
          //       valErrors.password = 'Password cannot be empty';
          //       isValid = false;
          //     }
          
          //     setErrors(valErrors);
          //     return isValid;
          //   }
          
          //   return (
          //     <div className='login'>
          //       <h2>Please Sign In to Continue...</h2>
          
          //       {/* Login Form */}
          //       <form onSubmit={handleLoginSubmit}>
          //         <h3>Returning Builders</h3>
          //         {/* Display message */}
          //         {message.content && (
          //           <div className={`login-message ${message.type === 'success' ? 'success-message' : 'error-message'}`}>
          //             {message.content}
          //           </div>
          //         )}
          //         <label>Email:
          //           <input
          //             type="email"
          //             value={loginData.email}
          //             onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
          //           />
          //         </label>
          //         {errors.email && <div className='error-message'>{errors.email}</div>}
          //         <br />
          //         <label>Password:
          //           <input
          //             type="password"
          //             value={loginData.password}
          //             onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          //           />
          //         </label>
          //         {errors.password && <div className='error-message'>{errors.password}</div>}
          //         <br />
          //         <button type="submit">Login</button>
          //       </form>
          
          //       <h4> New Builders </h4>
          //       <button onClick={handleCreateAccount}>Sign Up</button>
          //     </div>
          //   );
          // };
          
          // export default Login;
          





          









/////////// without using useCallback /////////////

// import React, { createContext, useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

// export const AuthContext = createContext();

// const INACTIVITY_TIMEOUT_VALUE = 180000;

// export const AuthProvider = ({ children }) => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [showInactivityModal, setShowInactivityModal] = useState(false);
//     const history = useHistory();
//     const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:5555';

//     let inactivityTimer = null;

//     const keepSessionAlive = async () => {
//         const response = await fetch(`${backendUrl}/keep_session_alive`, {
//             method: 'POST',
//             credentials: 'include',
//         });

//         if (response.ok) {
//             setShowInactivityModal(false);
//             resetInactivityTimer();
//         }
//     };

//     const logMeOut = async () => {
//         const response = await fetch(`${backendUrl}/logout`, {
//             method: 'POST',
//             credentials: 'include',
//         });

//         if (response.ok) {
//             setIsLoggedIn(false);
//             setShowInactivityModal(false);
//             clearTimeout(inactivityTimer);
//             history.push('/login');
//         }
//     };

//     function resetInactivityTimer() {
//         if (isLoggedIn) {
//             clearTimeout(inactivityTimer);
//             inactivityTimer = setTimeout(() => {
//                 setShowInactivityModal(true);
//             }, INACTIVITY_TIMEOUT_VALUE);
//         }
//     }

//     useEffect(() => {
//         const checkLoginStatus = async () => {
//             try {
//                 const response = await fetch(`${backendUrl}/check_session`, {
//                     credentials: 'include',
//                 });
//                 const data = await response.json();
//                 setIsLoggedIn(data.logged_in);
//             } catch (error) {
//                 console.error('Error checking login status:', error);
//             }
//         };

//         checkLoginStatus();
//     }, [backendUrl]);

//     useEffect(() => {
//         if (isLoggedIn) {
//             const handleActivity = () => {
//                 resetInactivityTimer();
//             };

//             window.addEventListener('mousemove', handleActivity);
//             window.addEventListener('keydown', handleActivity);

//             resetInactivityTimer();  // code to initialize the timer

//             return () => {  // code to cleanup event listeners
//                 window.removeEventListener('mousemove', handleActivity);
//                 window.removeEventListener('keydown', handleActivity);
//                 clearTimeout(inactivityTimer);
//             };
//         }
//     }, [isLoggedIn]);

//     useEffect(() => {
//         return () => clearTimeout(inactivityTimer);
//     }, []);


//     return (
//         <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
//             {children}
//             {showInactivityModal && (
//                 <div className="session-expiry-modal">
//                     <p className="session-expiry-text">Your session is about to expire due to inactivity.</p>
//                     <div className='buttons-container'>
//                         <button className='keep-session-alive-button'
//                             onClick={keepSessionAlive}>
//                             Keep Me Logged In
//                         </button>
//                         <button className='session-logout-button'
//                             onClick={logMeOut}>
//                             Log Me Out
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </AuthContext.Provider>
//     );
// };
















/////////////// original w/o check session ///////////////

// import React, { createContext, useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

// /// Create the Authcontext Istance:
// export const AuthContext = createContext();

// // const CHECK_SESSION_TIMEOUT_VALUE = 120000;
// const INACTIVITY_TIMEOUT_VALUE = 60000; 

// /// AuthProvider Component:
// export const AuthProvider = ({ children }) => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [showInactivityModal, setShowInactivityModal] = useState(false);
//     const [inactivityTimer, setInactivityTimer] = useState(null);
    
//     /// Code to initialize useHistory hook for navigation
//     const history = useHistory();

//     const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:5555';


    // useEffect(() => {
    //     const handleActivity = () => {
    //         resetInactivityTimer(); // code to resetInactivityTimer on any activity
    //     };

    //     window.addEventListener('mousemove', handleActivity);
    //     window.addEventListener('keydown', handleActivity);

    //     resetInactivityTimer();  // code to initialize the timer

    //     return () => {  // code to cleanup event listeners
    //         window.removeEventListener('mousemove', handleActivity);
    //         window.removeEventListener('keydown', handleActivity);
    //         clearTimeout(inactivityTimer);
    //     };
    // }, []);

//     useEffect(() => {
//         const checkLoginStatus = async () => {
//             try {
//                 const response = await fetch(`${backendUrl}/check_session`, {
//                     credentials: 'include', // Code to include credentials for cookies
//                 });
//                 const data = await response.json();
//                 if (!data.logged_in && isLoggedIn) {
//                     alert("Your session has expired. Please log in again.");
//                     setIsLoggedIn(false);
//                     history.push('/login');  // Code to redirect to login page after session expires
//                 } else if (data.logged_in) {
//                     setIsLoggedIn(true);
//                 }
//             } catch (error) {
//                 console.error('Error checking login status:', error);
//             }
//         };

//         checkLoginStatus();
//         let intervalId;

//         if (isLoggedIn) {
//             intervalId = setInterval(checkLoginStatus, 300000); // Code to check session at a set interval
//         }

//         return () => {
//             if (intervalId) {
//                 clearInterval(intervalId); // Code to clear the check interval for cleanup
//             }
//         };
//     }, [isLoggedIn, history]);

//     const keepSessionAlive = async () => {
//         try {
//             const response = await fetch(`${backendUrl}/keep_session_alive`, {
//                 method: 'POST',
//                 credentials: 'include',
//             });

//             if (response.ok) {
//                 setShowInactivityModal(false);
//                 resetInactivityTimer();  // code to reset timer after keeping session alive
//             } else {
//                 console.log("session not refreshed") // code to handle session could not be refreshed, to log the user out
//             }
//         } catch (error) {
//             console.error('Error keeping session alive:', error);
//         }
//     };

//     const logMeOut = async () => {
//         try {
//             const response = await fetch(`${backendUrl}/logout`, {
//                 method: 'POST',
//                 credentials: 'include',
//             });
//             if (response.ok) {
//                 setIsLoggedIn(false); // code to update state after logging out
//                 setShowInactivityModal(false);  // code to hide the modal
//                 clearTimeout(inactivityTimer);  // code to clear the inactivity timer so as to prevent reappearing.
//                 history.push('/login'); // code to redirect user to login page, which is the exclude endpoint from session check
//             } else {
//                 console.error('Failed to log out');  // code to log any errors
//             }
//         } catch (error) {
//             console.error('Error logging out:', error);
//         }
//     }

//     const resetInactivityTimer = () => {
//         setInactivityTimer((currentTimer) => {
//             clearTimeout(currentTimer);
//             return null; // code to clear current timer
//         });

//         const newTimer = setTimeout(() => {  // code to set new timer
//             setShowInactivityModal(true);
//         }, INACTIVITY_TIMEOUT_VALUE);

//         setInactivityTimer(newTimer);
//     };


//     return (
        // <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        //     {children}
        //     {showInactivityModal && (
        //         <div className="session-expiry-modal">
        //             <p className="session-expiry-text">Your session is about to expire due to inactivity.</p>
        //             <div className='buttons-container'>
        //                 <button className='keep-session-alive-button'
        //                     onClick={keepSessionAlive}>
        //                     Keep Me Logged In
        //                 </button>
        //                 <button className='session-logout-button'
        //                     onClick={logMeOut}>
        //                     Log Me Out
        //                 </button>
        //             </div>
        //         </div>
        //     )}
        // </AuthContext.Provider>
//     );
// };












