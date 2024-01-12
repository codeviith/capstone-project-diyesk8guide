import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext'; // Import AuthContext

const Profile = () => {
    const { isLoggedIn } = useContext(AuthContext); // Use AuthContext
    const [userData, setUserData] = useState(null);
    const [boards, setBoards] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [likedImages, setLikedImages] = useState([]);

    useEffect(() => {
        if (isLoggedIn) {
            fetchUserData();
            fetchBoards();
            fetchQuestions();
            fetchUploadedImages();
            fetchLikedImages();
        }
    }, [isLoggedIn]);

    useEffect(() => {
        console.log("Questions State Updated:", questions);
    }, [questions]);

    const fetchUserData = async () => {
        try {
            const response = await fetch('/user_data', { credentials: 'include' });
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const fetchBoards = async () => {
        try {
            const response = await fetch('/boards', { credentials: 'include' });
            const data = await response.json();
            setBoards(data);
        } catch (error) {
            console.error('Error fetching boards data:', error);
        }
    };

    const fetchQuestions = async () => {
        try {
            const response = await fetch('/guru', { credentials: 'include' });
            const data = await response.json();
            console.log('Questions:', data);
            setQuestions(data);
        } catch (error) {
            console.error('Error fetching guru data:', error);
        }
    };

    const fetchUploadedImages = async () => {
        try {
            const response = await fetch('/gallery/uploaded', { credentials: 'include' });
            const data = await response.json();
            setUploadedImages(data);
        } catch (error) {
            console.error('Error fetching uploaded images', error);
        }
    };

    const fetchLikedImages = async () => {
        try {
            const response = await fetch('/gallery/liked', { credentials: 'include' });
            const data = await response.json();
            setLikedImages(data);
        } catch (error) {
            console.error('Error fetching liked images', error);
        }
    };

    return (
        <div className="profile"> {/* Apply 'profile' class name */}
            {isLoggedIn ? (
                <div>
                    {/* <h1>Profile</h1> */}
                    <section>
                        <h2>Account</h2>
                        {userData && (
                            <div>
                                <p><strong>First Name:</strong> {userData.fname}</p>
                                <p><strong>Last Name:</strong> {userData.lname}</p>
                                <p><strong>Email:</strong> {userData.email}</p>
                                <p><strong>Rider Stance:</strong> {userData.rider_stance}</p>
                                <p><strong>Boards Owned:</strong> {userData.boards_owned}</p>
                            </div>
                        )}
                    </section>
    
                    <section>
                        <h2>Boards Generated</h2>
                        <div>
                            {boards.length > 0 ? boards.map((board, index) => (
                                <div key={index}>
                                    <ul className='board_spec'>
                                        <strong className='board_number'> Board {index + 1}</strong>
                                        <strong className='deck'> Deck </strong>
                                        <li>Deck Type: {board.deck_type}</li>
                                        <li>Deck Length: {board.deck_length}</li>
                                        <li>Deck Material: {board.deck_material}</li>
                                    <strong className='truck'> Truck </strong>
                                        <li>Truck Type: {board.truck_type}</li>
                                        <li>Truck Width: {board.truck_width}</li>
                                    <strong className='controller'> Controller </strong>
                                        <li>Controller Feature: {board.controller_feature}</li>
                                        <li>Controller Type: {board.controller_type}</li>
                                    <strong className='remote'> Remote </strong>
                                        <li>Remote Feature: {board.remote_feature}</li>
                                        <li>Remote Type: {board.remote_type}</li>
                                    <strong className='motor'> Motor </strong>
                                        <li>Motor Size: {board.motor_size}</li>
                                        <li>Motor Kv: {board.motor_kv}</li>
                                    <strong className='wheel'> Wheel </strong>
                                        <li>Wheel Size: {board.wheel_size}</li>
                                        <li>Wheel Type: {board.wheel_type}</li>
                                    <strong className='battery'> Battery </strong>
                                        <li>Battery Voltage: {board.battery_voltage}</li>
                                        <li>Battery Type: {board.battery_type}</li>
                                        <li>Battery Capacity: {board.battery_capacity}</li>
                                        <li>Battery Configuration: {board.battery_configuration}</li>
                                    <strong className='range'> Range </strong>
                                        <li>Range: {board.range_mileage}</li>
                                    </ul>
                                </div>
                            )) : <p>No boards generated.</p>}
                        </div>
                    </section>
    
                    <section>
                        <h2>Questions Asked</h2>
                        <div>
                            {questions.length > 0 ? questions.map((question, index) => (
                                <div key={index}>
                                    <p><strong>Question:</strong> {question.user_input}</p>
                                    <p><strong>Answer:</strong> {question.answer}</p>
                                </div>
                            )) : <p>No questions asked.</p>}
                        </div>
                    </section>
    
                    <section>
                        <h2>Uploaded Images</h2>
                        <div>
                            {uploadedImages.length > 0 ? uploadedImages.map((image, index) => (
                                <div key={index}>
                                    <img src={image.image_url} alt="Uploaded" />
                                    <div className='image-details'>
                                        <p><strong>Battery Type:</strong> {image.battery_type}</p>
                                        <p><strong>Motor Type:</strong> {image.motor_type}</p>
                                        <p><strong>Wheel Type:</strong> {image.wheel_type}</p>
                                        <p><strong>Truck Type:</strong> {image.truck_type}</p>
                                        <p><strong>Max Speed:</strong> {image.max_speed}</p>
                                    </div>
                                </div>
                            )) : <p>No images uploaded.</p>}
                        </div>
                    </section>
    
                    <section>
                        <h2>Liked Images</h2>
                        <div>
                            {likedImages.length > 0 ? likedImages.map((image, index) => (
                                <div key={index}>
                                    <img src={image.image_url} alt="Liked" />
                                    <div className='image-details'>
                                        <p><strong>Battery Type:</strong> {image.battery_type}</p>
                                        <p><strong>Motor Type:</strong> {image.motor_type}</p>
                                        <p><strong>Wheel Type:</strong> {image.wheel_type}</p>
                                        <p><strong>Truck Type:</strong> {image.truck_type}</p>
                                        <p><strong>Max Speed:</strong> {image.max_speed}</p>
                                    </div>
                                </div>
                            )) : <p>No images liked.</p>}
                        </div>
                    </section>
                </div>
            ) : (
                <p>Please log in to view your profile.</p>
            )}
        </div>
    );
};

export default Profile;










































// import React, { useState, useEffect, useContext } from 'react';
// import { AuthContext } from "./AuthContext";


// const Profile = () => {
//     const [userData, setUserData] = useState(null);
//     const [boardsGenerated, setBoardsGenerated] = useState([]);
//     const [questionsAsked, setQuestionsAsked] = useState([]);
//     const [uploadedImages, setUploadedImages] = useState([]);
//     const [likedImages, setLikedImages] = useState([]);
//     const { isLoggedIn } = useContext(AuthContext);

//     useEffect(() => {
//         if (isLoggedIn) {
//             // Fetch user data
//             fetch('/user_data') 
//                 .then(response => response.json())
//                 .then(data => setUserData(data))
//                 .catch(error => console.error('Error fetching user data:', error));
    
//             // Fetch boards generated
//             fetch('/boards')
//                 .then(response => response.json())
//                 .then(data => setBoardsGenerated(data))
//                 .catch(error => console.error('Error fetching boards:', error));
    
//             // Fetch questions asked
//             fetch('/guru')
//                 .then(response => response.json())
//                 .then(data => setQuestionsAsked(data))
//                 .catch(error => console.error('Error fetching questions:', error));
    
//             // Fetch images uploaded
//             fetch('/gallery/uploaded')
//                 .then(response => response.json())
//                 .then(data => setUploadedImages(data))
//                 .catch(error => console.error('Error fetching uploaded images:', error));
    
//             // Fetch images liked
//             fetch('/gallery/liked')
//                 .then(response => response.json())
//                 .then(data => setLikedImages(data))
//                 .catch(error => console.error('Error fetching liked images:', error));
//         }
//     }, [isLoggedIn]);
    

//     const renderUserData = () => {
//         return userData && (
//             <div>
//                 <h2>User Details</h2>
//                 <p>First Name: {userData.firstName}</p>
//                 <p>Last Name: {userData.lastName}</p>
//                 <p>Email: {userData.email}</p>
//                 {/* Add more user details here */}
//             </div>
//         );
//     };

//     const renderBoardsGenerated = () => {
//         return (
//             <div>
//                 <h2>Boards Generated</h2>
//                 {boardsGenerated.map(board => <div key={board.id}>{board.name} {/* other board details */}</div>)}
//             </div>
//         );
//     };

//     const renderQuestionsAsked = () => {
//         if (Array.isArray(questionsAsked)) {
//             return (
//                 <div>
//                     <h2>Questions Asked</h2>
//                     {questionsAsked.map(question => (
//                         <div key={question.id}>
//                             {/* Render question details */}
//                         </div>
//                     ))}
//                 </div>
//             );
//         } else {
//             return <div>Error loading questions.</div>;
//         }
//     };

//     const renderGalleryImages = () => {
//         return (
//             <div>
//                 <h2>Uploaded Images</h2>
//                 {uploadedImages.map(image => <img key={image.id} src={image.image_filename} alt={image.title} />)}
    
//                 <h2>Liked Images</h2>
//                 {likedImages.map(image => <img key={image.id} src={image.image_filename} alt={image.title} />)}
//             </div>
//         );
//     };


//     return (
//         <div className='profile'>
//             {renderUserData()}
//             {renderBoardsGenerated()}
//             {renderQuestionsAsked()}
//             {renderGalleryImages()}
//         </div>
//     );
// };

// export default Profile;






































// import React, { useState, useEffect, useContext } from 'react';
// import { AuthContext } from "./AuthContext";

// const profile = () => {
//     const [userData, setUserData] = useState({});
//     const [boardsGenerated, setBoardsGenerated] = useState([]);
//     const [questionsAsked, setQuestionsAsked] = useState([]);
//     const [uploadedImages, setUploadedImages] = useState([]);
//     const [likedImages, setLikedImages] = useState([]);
//     const { isLoggedIn } = useContext(AuthContext);

//     useEffect(() => {
//         if (isLoggedIn) {
//             fetchUserData();
//             fetchBoardsGenerated();
//             fetchQuestionsAsked();
//             fetchUploadedImages();
//             fetchLikedImages();
//         }
//     }, [isLoggedIn]);

//     const fetchUserData = async () => {
//         const response = await fetch('/user_data');
//         const data = await response.json();
//         console.log(data)
//         setUserData(data);
//     };

//     const fetchBoardsGenerated = async () => {
//         const response = await fetch('/boards');
//         const data = await response.json();
//         setBoardsGenerated(data);
//     };

//     const fetchQuestionsAsked = async () => {
//         const response = await fetch('/guru');
//         const data = await response.json();
//         setQuestionsAsked(data);
//     };

//     const fetchUploadedImages = async () => {
//         const response = await fetch('/gallery/uploaded');
//         const data = await response.json();
//         setUploadedImages(data);
//     };

//     const fetchLikedImages = async () => {
//         const response = await fetch('/gallery/liked');
//         const data = await response.json();
//         setLikedImages(data);
//     };

//     const renderUserData = () => {
//         return userData && (
//             <div>
//                 <h2>User Details</h2>
//                 <p>First Name: {userData.fName}</p>
//                 <p>Last Name: {userData.lName}</p>
//                 <p>Email: {userData.email}</p>
//                 <p>Password: {userData.password}</p>
//                 <p>Rider Stance: {userData.rider_stance}</p>
//                 <p>Boards Owned: {userData.boards_owned}</p>
//             </div>
//         );
//     };

//     const renderBoardsGenerated = () => {
//         return (
//             <div>
//                 <h2>Boards Generated</h2>
//                 {boardsGenerated.map(board => <div key={board.id}>{board.name} {/* other board details */}</div>)}
//             </div>
//         );
//     };

//     const renderQuestionsAsked = () => {
//         return (
//             <div>
//                 <h2>Questions Asked</h2>
//                 {questionsAsked.map(question => (
//                     <div key={question.id}>
//                         <p>Question: {question.user_input}</p>
//                         <p>Answer: {question.answer}</p>
//                         {/* You can add more details if available */}
//                     </div>
//                 ))}
//             </div>
//         );
//     };

//     const renderUploadedImages = () => {
//         return (
//             <div>
//                 <h2>Uploaded Images</h2>
//                 {uploadedImages.map(image => (
//                     <div key={image.id}>
//                         <img src={`images/${image.image_filename}`} alt={image.image_filename} />
//                         {/* Add more details about the image if needed */}
//                     </div>
//                 ))}
//             </div>
//         );
//     };

//     const renderLikedImages = () => {
//         return (
//             <div>
//                 <h2>Liked Images</h2>
//                 {likedImages.map(image => (
//                     <div key={image.id}>
//                         <img src={`images/${image.image_filename}`} alt={image.image_filename} />
//                         {/* Additional details about the image */}
//                     </div>
//                 ))}
//             </div>
//         );
//     };


//     return (
//         <div className='profile'>
//             {renderUserData()}
//             {renderBoardsGenerated()}
//             {renderQuestionsAsked()}
//             {renderUploadedImages()}
//             {renderLikedImages()}
//         </div>
//     );
// };

// export default profile;













































// const handleDelete = (id, category) => {
//     let endpoint = '';

//     if (category === 'Boards') {
//         endpoint = `/boards/${id}`;
//     } else if (category === 'Questions') {
//         endpoint = `/guru/${id}`;
//     }

//     fetch(endpoint, {
//         method: 'DELETE',
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`Failed to delete ${category} with ID ${id}`);
//             }
//             return response.json();
//         })
//         .then(data => {
//             // console.log(`Deleted ${category} with ID ${id}`);
//             if (category === 'Boards') {
//                 setBoards(prevBoards => prevBoards.filter(board => board.id !== id));
//             } else if (category === 'Questions') {
//                 setGuruData(prevGuruData => prevGuruData.filter(question => question.id !== id));
//             }
//         })
//         .catch(error => console.error(`Error deleting ${category.toLowerCase()}:`, error));
// };

// const renderContainer = (category, items) => (
//     <div className='render_container'>
//         <h2>{category}</h2>
//         {items.length > 0 ? (
//             <ul>
//                 {items.map((item) => (
//                     <div key={item.id}>
//                         <strong>{item.question || item.name}</strong>
//                         {/* Display additional details based on the category */}
//                         {category === 'Boards' && (
//                             <>
//                                 {/* Image */}
//                                 <img src={item.image_url} alt={`${item.name} Board`} />
//                                 {/* Specs */}
//                                 <ul className='board_spec'>
//                                     <strong className='deck'> Deck </strong>
//                                     <li>Deck Type: {item.deck_type}</li>
//                                     <li>Deck Length: {item.deck_length}</li>
//                                     <li>Deck Material: {item.deck_material}</li>
//                                     <strong className='truck'> Truck </strong>
//                                     <li>Truck Type: {item.truck_type}</li>
//                                     <li>Truck Width: {item.truck_width}</li>
//                                     <strong className='controller'> Controller </strong>
//                                     <li>Controller Feature: {item.controller_feature}</li>
//                                     <li>Controller Type: {item.controller_type}</li>
//                                     <strong className='remote'> Remote </strong>
//                                     <li>Remote Feature: {item.remote_feature}</li>
//                                     <li>Remote Type: {item.remote_type}</li>
//                                     <strong className='motor'> Motor </strong>
//                                     <li>Motor Size: {item.motor_size}</li>
//                                     <li>Motor Kv: {item.motor_kv}</li>
//                                     <strong className='wheel'> Wheel </strong>
//                                     <li>Wheel Size: {item.wheel_size}</li>
//                                     <li>Wheel Type: {item.wheel_type}</li>
//                                     <strong className='battery'> Battery </strong>
//                                     <li>Battery Voltage: {item.battery_voltage}</li>
//                                     <li>Battery Type: {item.battery_type}</li>
//                                     <li>Battery Capacity: {item.battery_capacity}</li>
//                                     <li>Battery Configuration: {item.battery_configuration}</li>
//                                     <strong className='range'> Range </strong>
//                                     <li>Range: {item.range_mileage}</li>
//                                 </ul>
//                             </>
//                         )}
//                         {category === 'Questions' && (
//                             <>
//                                 {/* Display additional details for questions */}
//                                 <p><strong>Question: </strong> {item.user_input}</p>
//                                 <p><strong>Answer: </strong> {item.answer}</p>
//                             </>
//                         )}
//                         {category === 'Posts' && (
//                             <>
//                                 {/* Display additional details for posts */}
//                                 <p></p>
//                                 <p><strong>Post: </strong> {item.post}</p>
//                                 <p>Timestamp: {item.timestamp}</p>
//                             </>
//                         )}
//                         {category === 'Replies' && (
//                             <>
//                                 {/* Display additional details for replies */}
//                                 <p></p>
//                                 <p><strong>Reply: </strong> {item.reply} </p>
//                                 <p>Timestamp: {item.timestamp}</p>
//                             </>
//                         )}
//                         {/* Delete Button */}
//                         <button onClick={() => handleDelete(item.id, category)}>Delete</button>
//                     </div>
//                 ))}
//             </ul>
//         ) : (
//             <p>{`No ${category.toLowerCase()} to show.`}</p>
//         )}
//     </div>
// );