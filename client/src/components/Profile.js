import React, { useState, useEffect, useContext } from 'react';
import { responseStyle } from './CommonStyles'
import { formatResponse } from './CommonFunctions'
import { AuthContext } from './AuthContext'; // Import AuthContext

function Profile() {
    const boardOptions = ["Evolve", "Lacroix", "KalyNYC", "Metroboard", "Trampa", "Mellow", "Boosted", "Exway", "Bajaboard", "Hoyt St.", "Acton", "Backfire", "Meepo", "Other"];

    const { isLoggedIn } = useContext(AuthContext); // Use AuthContext
    const [userData, setUserData] = useState(null);
    const [boards, setBoards] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [likedImages, setLikedImages] = useState([]);
    const [editMode, setEditMode] = useState({
        fname: false,
        lname: false,
        email: false,
        rider_stance: false,
        boards_owned: false
    });
    const [editValues, setEditValues] = useState({
        fname: userData?.fname || '',
        lname: userData?.lname || '',
        email: userData?.email || '',
        rider_stance: userData?.rider_stance || '',
        boards_owned: typeof userData?.boards_owned === 'string' ? userData.boards_owned.split(',') : []   // Code to ensure this is an array
    });


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
        if (userData && typeof userData.boards_owned === 'string') {
            setEditValues(prevValues => ({
                ...prevValues,
                fname: userData.fname || '',
                lname: userData.lname || '',
                email: userData.email || '',
                rider_stance: userData.rider_stance || '',
                boards_owned: Array.isArray(userData.boards_owned) 
                    ? userData.boards_owned 
                    : typeof userData.boards_owned === 'string' 
                    ? userData.boards_owned.split(',') 
                    : []
            }));
        }
    }, [userData]);


    // useEffect(() => {
    //     console.log("Questions State Updated:", questions);
    // }, [questions]);

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

    const removeQuestionFromState = (questionId) => {
        setQuestions(questions.filter(question => question.id !== questionId));
    };

    const deleteQuestion = async (questionId) => {
        try {
            const response = await fetch(`/guru/${questionId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            const data = await response.json();
            if (response.ok) {
                removeQuestionFromState(questionId);
            } else {
                console.error('Error deleting question:', data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const saveData = async (field) => {
        try {
            const response = await fetch(`/user_data/${userData.id}`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ [field]: editValues[field] })
            });
            const data = await response.json();
            if (response.ok) {
                setUserData({ ...userData, [field]: editValues[field] });
                setEditMode({ ...editMode, [field]: false });
            } else {
                console.error('Error updating user data:', data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const deleteBoard = async (boardId) => {
        try {
            const response = await fetch(`/boards/${boardId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                setBoards(boards.filter(board => board.id !== boardId));
            } else {
                console.error('Error deleting board');
            }
        } catch (error) {
            console.error('Error:', error);
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
                            <div className='user-data-container'>
                                <div className="user-data-field">
                                    <strong className="user-data-label">First Name:</strong>
                                    <div className="input-and-buttons">
                                        {editMode.fname ? (
                                            <input className="user-data-input"
                                                value={editValues.fname}
                                                onChange={(e) => setEditValues({ ...editValues, fname: e.target.value })}
                                            />
                                        ) : (
                                            <span className="user-data-value">{userData.fname}</span>
                                        )}
                                        {/* Edit Button */}
                                        {editMode.fname && <button className="save-button" onClick={() => saveData('fname')}>Save</button>}
                                        <button className="edit-button" onClick={() => setEditMode({ ...editMode, fname: !editMode.fname })}>
                                            {editMode.fname ? 'Cancel' : 'Edit'}
                                        </button>
                                    </div>
                                </div>

                                <div className="user-data-field">
                                    <strong className="user-data-label">Last Name:</strong>
                                    <div className="input-and-buttons">
                                        {editMode.lname ? (
                                            <input className="user-data-input"
                                                value={editValues.lname}
                                                onChange={(e) => setEditValues({ ...editValues, lname: e.target.value })}
                                            />
                                        ) : (
                                            <span className="user-data-value">{userData.lname}</span>
                                        )}
                                        {/* Edit Button */}
                                        {editMode.lname && <button className="save-button" onClick={() => saveData('lname')}>Save</button>}
                                        <button className="edit-button" onClick={() => setEditMode({ ...editMode, lname: !editMode.lname })}>
                                            {editMode.lname ? 'Cancel' : 'Edit'}
                                        </button>
                                    </div>
                                </div>

                                <div className="user-data-field">
                                    <strong className="user-data-label">Email:</strong>
                                    <div className="input-and-buttons">
                                        {editMode.email ? (
                                            <input className="user-data-input"
                                                value={editValues.email}
                                                onChange={(e) => setEditValues({ ...editValues, email: e.target.value })}
                                            />
                                        ) : (
                                            <span className="user-data-value">{userData.email}</span>
                                        )}
                                        {/* Edit Button */}
                                        {editMode.email && <button className="save-button" onClick={() => saveData('email')}>Save</button>}
                                        <button className="edit-button" onClick={() => setEditMode({ ...editMode, email: !editMode.email })}>
                                            {editMode.email ? 'Cancel' : 'Edit'}
                                        </button>
                                    </div>
                                </div>


                                <div className="user-data-field">
                                    <strong className="user-data-label">Rider Stance:</strong>
                                    <div className="input-and-buttons">
                                        {editMode.rider_stance ? (
                                            <select className="user-data-select"
                                                value={editValues.rider_stance}
                                                onChange={(e) => setEditValues({ ...editValues, rider_stance: e.target.value })}
                                            >
                                                <option value="Regular">Regular</option>
                                                <option value="Goofy">Goofy</option>
                                                <option value="Both">Both</option>
                                            </select>
                                        ) : (
                                            <span className="user-data-value">{userData.rider_stance}</span>
                                        )}
                                        {/* Edit Button */}
                                        {editMode.rider_stance && <button className="save-button" onClick={() => saveData('rider_stance')}>Save</button>}
                                        <button className="edit-button" onClick={() => setEditMode({ ...editMode, rider_stance: !editMode.rider_stance })}>
                                            {editMode.rider_stance ? 'Cancel' : 'Edit'}
                                        </button>
                                    </div>
                                </div>

                                <div className="user-data-field">
                                    <strong className="user-data-label">Boards Owned:</strong>
                                    <div className="input-and-buttons">
                                        {editMode.boards_owned ? (
                                            <div className="checkbox-container">
                                                {boardOptions.map((board, index) => (
                                                    <div key={index}>
                                                        <input className='user-data-checkbox'
                                                            type="checkbox"
                                                            name="boards_owned"
                                                            value={board}
                                                            checked={editValues.boards_owned.includes(board)}
                                                            onChange={(e) => {
                                                                let newSelection;
                                                                if (e.target.checked) {
                                                                    newSelection = [...editValues.boards_owned, board];
                                                                } else {
                                                                    newSelection = editValues.boards_owned.filter(item => item !== board);
                                                                }
                                                                setEditValues({ ...editValues, boards_owned: newSelection });
                                                            }}
                                                        />
                                                        <label>{board}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="user-data-value">
                                                {Array.isArray(userData.boards_owned)
                                                    ? userData.boards_owned.join(', ')
                                                    : (userData.boards_owned || '').split(',').join(', ')}
                                            </span>
                                        )}
                                        {/* Edit Button */}
                                        {editMode.boards_owned && <button className="save-button" onClick={() => saveData('boards_owned')}>Save</button>}
                                        <button className="edit-button" onClick={() => setEditMode({ ...editMode, boards_owned: !editMode.boards_owned })}>
                                            {editMode.boards_owned ? 'Cancel' : 'Edit'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>

                    <section>
                        <h2>Boards Generated</h2>
                        <div className="boards-container">
                            {boards.length > 0 ? boards.map((board, index) => (
                                <div className='board-div' key={index} style={responseStyle}>
                                    <strong className='board-number'> Board {index + 1}</strong>
                                    <ul className='profile-board-spec'>
                                        <strong className='board-strong'> Deck </strong>
                                        <li>Deck Type: {board.deck_type}</li>
                                        <li>Deck Length: {board.deck_length}</li>
                                        <li>Deck Material: {board.deck_material}</li>
                                        <strong className='board-strong'> Truck </strong>
                                        <li>Truck Type: {board.truck_type}</li>
                                        <li>Truck Width: {board.truck_width}</li>
                                        <strong className='board-strong'> Controller </strong>
                                        <li>Controller Feature: {board.controller_feature}</li>
                                        <li>Controller Type: {board.controller_type}</li>
                                        <strong className='board-strong'> Remote </strong>
                                        <li>Remote Feature: {board.remote_feature}</li>
                                        <li>Remote Type: {board.remote_type}</li>
                                        <strong className='board-strong'> Motor </strong>
                                        <li>Motor Size: {board.motor_size}</li>
                                        <li>Motor Kv: {board.motor_kv}</li>
                                        <strong className='board-strong'> Wheel </strong>
                                        <li>Wheel Size: {board.wheel_size}</li>
                                        <li>Wheel Type: {board.wheel_type}</li>
                                        <strong className='board-strong'> Battery </strong>
                                        <li>Battery Voltage: {board.battery_voltage}</li>
                                        <li>Battery Type: {board.battery_type}</li>
                                        <li>Battery Capacity: {board.battery_capacity}</li>
                                        <li>Battery Configuration: {board.battery_configuration}</li>
                                        <strong className='board-strong'> Range </strong>
                                        <li>Range: {board.range_mileage}</li>
                                    </ul>
                                    {/* Delete Button */}
                                    <button className="delete-board-button" onClick={() => deleteBoard(board.id)}>
                                        Delete
                                    </button>
                                </div>
                            )) : <p>No boards generated.</p>}
                        </div>
                    </section>

                    <section>
                        <h2>Questions Asked</h2>
                        <div>
                            {questions.length > 0 ? questions.map((question, index) => (
                                <div className='questions-asked' key={index} style={responseStyle}>
                                    <div className='question-container'>
                                        <div className='question-div'><strong className='question-strong'>Question:</strong> {question.user_input}</div>
                                        <div className='answer-div'><strong className='answer-strong'>Answer:</strong> {formatResponse(question.answer)}</div>
                                        <div className='delete-question-button-container'>
                                            <button className='delete-button' onClick={() => deleteQuestion(question.id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            )) : <p>No question was asked.</p>}
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










    // useEffect(() => {
    //     if (userData) {
    //         console.log("Type of boards_owned:", typeof userData.boards_owned);
    //         console.log("Value of boards_owned:", userData.boards_owned);

    //         if (!userData || typeof userData.boards_owned !== 'string') {
    //             return null; // or some loading indicator
    //         }

    //         setEditValues(prevValues => ({
    //             ...prevValues,
    //             fname: userData.fname || '',
    //             lname: userData.lname || '',
    //             email: userData.email || '',
    //             rider_stance: userData.rider_stance || '',
    //             boards_owned: Array.isArray(userData.boards_owned)
    //                 ? userData.boards_owned
    //                 : typeof userData.boards_owned === 'string'
    //                     ? userData.boards_owned.split(',')
    //                     : []
    //         }));
    //     }
    // }, [userData]);







//////newest but still not working...

// {editMode.boards_owned ? (
//     <div>
//         {boardOptions.map((board, index) => (
//             <div key={index}>
//                 <input className='user-data-checkbox'
//                     type="checkbox"
//                     name="boards_owned"
//                     value={board}
//                     checked={editValues.boards_owned.includes(board)}
//                     onChange={(e) => {
//                         let newSelection;
//                         if (e.target.checked) {
//                             newSelection = [...editValues.boards_owned, board];
//                         } else {
//                             newSelection = editValues.boards_owned.filter(item => item !== board);
//                         }
//                         setEditValues({ ...editValues, boards_owned: newSelection });
//                     }}
//                 />
//                 <label>{board}</label>
//             </div>
//         ))}
//     </div>
// ) : (
//     <span className="user-data-value">
//         {Array.isArray(userData.boards_owned)
//             ? userData.boards_owned.join(', ')
//             : (userData.boards_owned || '').split(',').join(', ')}
//     </span>
// )}













// import React, { useState, useEffect, useContext } from 'react';
// import { responseStyle } from './CommonStyles'
// import { formatResponse } from './CommonFunctions'
// import { AuthContext } from './AuthContext'; // Import AuthContext

// function Profile() {
//     const boardOptions = ["Evolve", "Lacroix", "KalyNYC", "Metroboard", "Trampa", "Mellow", "Boosted", "Exway", "Bajaboard", "Hoyt St.", "Acton", "Backfire", "Meepo", "Other"];

//     const { isLoggedIn } = useContext(AuthContext); // Use AuthContext
//     const [userData, setUserData] = useState(null);
//     const [boards, setBoards] = useState([]);
//     const [questions, setQuestions] = useState([]);
//     const [uploadedImages, setUploadedImages] = useState([]);
//     const [likedImages, setLikedImages] = useState([]);
//     const [editMode, setEditMode] = useState({
//         fname: false,
//         lname: false,
//         email: false,
//         rider_stance: false,
//         boards_owned: false
//     });
//     const [editValues, setEditValues] = useState({
//         fname: userData?.fname || '',
//         lname: userData?.lname || '',
//         email: userData?.email || '',
//         rider_stance: userData?.rider_stance || '',
//         boards_owned: userData?.boards_owned ? userData.boards_owned.split(',') : []  // Code to ensure this is an array
//     });


//     useEffect(() => {
//         if (isLoggedIn) {
//             fetchUserData();
//             fetchBoards();
//             fetchQuestions();
//             fetchUploadedImages();
//             fetchLikedImages();
//         }
//     }, [isLoggedIn]);

//     useEffect(() => {
//         if (userData) {
//             console.log("Type of boards_owned:", typeof userData.boards_owned);
//             console.log("Value of boards_owned:", userData.boards_owned);

//             if (!userData || typeof userData.boards_owned !== 'string') {
//                 return null; // or some loading indicator
//             }

//             setEditValues(prevValues => ({
//                 ...prevValues,
//                 fname: userData.fname || '',
//                 lname: userData.lname || '',
//                 email: userData.email || '',
//                 rider_stance: userData.rider_stance || '',
//                 boards_owned: Array.isArray(userData.boards_owned)
//                     ? userData.boards_owned
//                     : typeof userData.boards_owned === 'string'
//                         ? userData.boards_owned.split(',')
//                         : []
//             }));
//         }
//     }, [userData]);


//     // useEffect(() => {
//     //     console.log("Questions State Updated:", questions);
//     // }, [questions]);

//     const fetchUserData = async () => {
//         try {
//             const response = await fetch('/user_data', { credentials: 'include' });
//             const data = await response.json();
//             setUserData(data);
//         } catch (error) {
//             console.error('Error fetching user data:', error);
//         }
//     };

//     const fetchBoards = async () => {
//         try {
//             const response = await fetch('/boards', { credentials: 'include' });
//             const data = await response.json();
//             setBoards(data);
//         } catch (error) {
//             console.error('Error fetching boards data:', error);
//         }
//     };

//     const fetchQuestions = async () => {
//         try {
//             const response = await fetch('/guru', { credentials: 'include' });
//             const data = await response.json();
//             console.log('Questions:', data);
//             setQuestions(data);
//         } catch (error) {
//             console.error('Error fetching guru data:', error);
//         }
//     };

//     const fetchUploadedImages = async () => {
//         try {
//             const response = await fetch('/gallery/uploaded', { credentials: 'include' });
//             const data = await response.json();
//             setUploadedImages(data);
//         } catch (error) {
//             console.error('Error fetching uploaded images', error);
//         }
//     };

//     const fetchLikedImages = async () => {
//         try {
//             const response = await fetch('/gallery/liked', { credentials: 'include' });
//             const data = await response.json();
//             setLikedImages(data);
//         } catch (error) {
//             console.error('Error fetching liked images', error);
//         }
//     };

//     const removeQuestionFromState = (questionId) => {
//         setQuestions(questions.filter(question => question.id !== questionId));
//     };

//     const deleteQuestion = async (questionId) => {
//         try {
//             const response = await fetch(`/guru/${questionId}`, {
//                 method: 'DELETE',
//                 credentials: 'include'
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 removeQuestionFromState(questionId);
//             } else {
//                 console.error('Error deleting question:', data.error);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     const saveData = async (field) => {
//         try {
//             const response = await fetch(`/user_data/${userData.id}`, {
//                 method: 'PATCH',
//                 credentials: 'include',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ [field]: editValues[field] })
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 setUserData({ ...userData, [field]: editValues[field] });
//                 setEditMode({ ...editMode, [field]: false });
//             } else {
//                 console.error('Error updating user data:', data.error);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     const deleteBoard = async (boardId) => {
//         try {
//             const response = await fetch(`/boards/${boardId}`, {
//                 method: 'DELETE',
//                 credentials: 'include'
//             });
//             if (response.ok) {
//                 setBoards(boards.filter(board => board.id !== boardId));
//             } else {
//                 console.error('Error deleting board');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };


//     return (
//         <div className="profile"> {/* Apply 'profile' class name */}

//         {userData && (
//             <div>{userData.boards_owned.split(',').join(' | ')}</div>
//         )}

//             {isLoggedIn ? (
//                 <div>
//                     {/* <h1>Profile</h1> */}
//                     <section>
//                         <h2>Account</h2>
//                         {userData && (
//                             <div className='user-data-container'>
//                                 <div className="user-data-field">
//                                     <strong className="user-data-label">First Name:</strong>
//                                     <div className="input-and-buttons">
//                                         {editMode.fname ? (
//                                             <input className="user-data-input"
//                                                 value={editValues.fname}
//                                                 onChange={(e) => setEditValues({ ...editValues, fname: e.target.value })}
//                                             />
//                                         ) : (
//                                             <span className="user-data-value">{userData.fname}</span>
//                                         )}
//                                         {/* Edit Button */}
//                                         {editMode.fname && <button className="save-button" onClick={() => saveData('fname')}>Save</button>}
//                                         <button className="edit-button" onClick={() => setEditMode({ ...editMode, fname: !editMode.fname })}>
//                                             {editMode.fname ? 'Cancel' : 'Edit'}
//                                         </button>
//                                     </div>
//                                 </div>

//                                 <div className="user-data-field">
//                                     <strong className="user-data-label">Last Name:</strong>
//                                     <div className="input-and-buttons">
//                                         {editMode.lname ? (
//                                             <input className="user-data-input"
//                                                 value={editValues.lname}
//                                                 onChange={(e) => setEditValues({ ...editValues, lname: e.target.value })}
//                                             />
//                                         ) : (
//                                             <span className="user-data-value">{userData.lname}</span>
//                                         )}
//                                         {/* Edit Button */}
//                                         {editMode.lname && <button className="save-button" onClick={() => saveData('lname')}>Save</button>}
//                                         <button className="edit-button" onClick={() => setEditMode({ ...editMode, lname: !editMode.lname })}>
//                                             {editMode.lname ? 'Cancel' : 'Edit'}
//                                         </button>
//                                     </div>
//                                 </div>

//                                 <div className="user-data-field">
//                                     <strong className="user-data-label">Email:</strong>
//                                     <div className="input-and-buttons">
//                                         {editMode.email ? (
//                                             <input className="user-data-input"
//                                                 value={editValues.email}
//                                                 onChange={(e) => setEditValues({ ...editValues, email: e.target.value })}
//                                             />
//                                         ) : (
//                                             <span className="user-data-value">{userData.email}</span>
//                                         )}
//                                         {/* Edit Button */}
//                                         {editMode.email && <button className="save-button" onClick={() => saveData('email')}>Save</button>}
//                                         <button className="edit-button" onClick={() => setEditMode({ ...editMode, email: !editMode.email })}>
//                                             {editMode.email ? 'Cancel' : 'Edit'}
//                                         </button>
//                                     </div>
//                                 </div>


//                                 <div className="user-data-field">
//                                     <strong className="user-data-label">Rider Stance:</strong>
//                                     <div className="input-and-buttons">
//                                         {editMode.rider_stance ? (
//                                             <select className="user-data-select"
//                                                 value={editValues.rider_stance}
//                                                 onChange={(e) => setEditValues({ ...editValues, rider_stance: e.target.value })}
//                                             >
//                                                 <option value="Regular">Regular</option>
//                                                 <option value="Goofy">Goofy</option>
//                                                 <option value="Both">Both</option>
//                                             </select>
//                                         ) : (
//                                             <span className="user-data-value">{userData.rider_stance}</span>
//                                         )}
//                                         {/* Edit Button */}
//                                         {editMode.rider_stance && <button className="save-button" onClick={() => saveData('rider_stance')}>Save</button>}
//                                         <button className="edit-button" onClick={() => setEditMode({ ...editMode, rider_stance: !editMode.rider_stance })}>
//                                             {editMode.rider_stance ? 'Cancel' : 'Edit'}
//                                         </button>
//                                     </div>
//                                 </div>

//                                 <div className="user-data-field">
//                                     <strong className="user-data-label">Boards Owned:</strong>
//                                     <div className="input-and-buttons">
//                                         {editMode.boards_owned ? (
//                                             <div>
//                                                 {boardOptions.map((board, index) => (
//                                                     <div key={index}>
//                                                         <input className='user-data-checkbox'
//                                                             type="checkbox"
//                                                             name="boards_owned"
//                                                             value={board}
//                                                             checked={editValues.boards_owned.includes(board)}
//                                                             onChange={(e) => {
//                                                                 let newSelection;
//                                                                 if (e.target.checked) {
//                                                                     newSelection = [...editValues.boards_owned, board];
//                                                                 } else {
//                                                                     newSelection = editValues.boards_owned.filter(item => item !== board);
//                                                                 }
//                                                                 setEditValues({ ...editValues, boards_owned: newSelection });
//                                                             }}
//                                                         />
//                                                         <label>{board}</label>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         ) : (
//                                             <span className="user-data-value">
//                                                 {Array.isArray(userData.boards_owned)
//                                                     ? userData.boards_owned.join(', ')
//                                                     : (userData.boards_owned || '').split(',').join(', ')}
//                                             </span>
//                                         )}
//                                         {/* Edit Button */}
//                                         {editMode.boards_owned && <button className="save-button" onClick={() => saveData('boards_owned')}>Save</button>}
//                                         <button className="edit-button" onClick={() => setEditMode({ ...editMode, boards_owned: !editMode.boards_owned })}>
//                                             {editMode.boards_owned ? 'Cancel' : 'Edit'}
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </section>

//                     <section>
//                         <h2>Boards Generated</h2>
//                         <div className="boards-container">
//                             {boards.length > 0 ? boards.map((board, index) => (
//                                 <div className='board-div' key={index} style={responseStyle}>
//                                     <strong className='board-number'> Board {index + 1}</strong>
//                                     <ul className='profile-board-spec'>
//                                         <strong className='board-strong'> Deck </strong>
//                                         <li>Deck Type: {board.deck_type}</li>
//                                         <li>Deck Length: {board.deck_length}</li>
//                                         <li>Deck Material: {board.deck_material}</li>
//                                         <strong className='board-strong'> Truck </strong>
//                                         <li>Truck Type: {board.truck_type}</li>
//                                         <li>Truck Width: {board.truck_width}</li>
//                                         <strong className='board-strong'> Controller </strong>
//                                         <li>Controller Feature: {board.controller_feature}</li>
//                                         <li>Controller Type: {board.controller_type}</li>
//                                         <strong className='board-strong'> Remote </strong>
//                                         <li>Remote Feature: {board.remote_feature}</li>
//                                         <li>Remote Type: {board.remote_type}</li>
//                                         <strong className='board-strong'> Motor </strong>
//                                         <li>Motor Size: {board.motor_size}</li>
//                                         <li>Motor Kv: {board.motor_kv}</li>
//                                         <strong className='board-strong'> Wheel </strong>
//                                         <li>Wheel Size: {board.wheel_size}</li>
//                                         <li>Wheel Type: {board.wheel_type}</li>
//                                         <strong className='board-strong'> Battery </strong>
//                                         <li>Battery Voltage: {board.battery_voltage}</li>
//                                         <li>Battery Type: {board.battery_type}</li>
//                                         <li>Battery Capacity: {board.battery_capacity}</li>
//                                         <li>Battery Configuration: {board.battery_configuration}</li>
//                                         <strong className='board-strong'> Range </strong>
//                                         <li>Range: {board.range_mileage}</li>
//                                     </ul>
//                                     {/* Delete Button */}
//                                     <button className="delete-board-button" onClick={() => deleteBoard(board.id)}>
//                                         Delete
//                                     </button>
//                                 </div>
//                             )) : <p>No boards generated.</p>}
//                         </div>
//                     </section>

//                     <section>
//                         <h2>Questions Asked</h2>
//                         <div>
//                             {questions.length > 0 ? questions.map((question, index) => (
//                                 <div className='questions-asked' key={index} style={responseStyle}>
//                                     <div className='question-container'>
//                                         <div className='question-div'><strong className='question-strong'>Question:</strong> {question.user_input}</div>
//                                         <div className='answer-div'><strong className='answer-strong'>Answer:</strong> {formatResponse(question.answer)}</div>
//                                         <div className='delete-question-button-container'>
//                                             <button className='delete-button' onClick={() => deleteQuestion(question.id)}>Delete</button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )) : <p>No question was asked.</p>}
//                         </div>
//                     </section>

//                     <section>
//                         <h2>Uploaded Images</h2>
//                         <div>
//                             {uploadedImages.length > 0 ? uploadedImages.map((image, index) => (
//                                 <div key={index}>
//                                     <img src={image.image_url} alt="Uploaded" />
//                                     <div className='image-details'>
//                                         <p><strong>Battery Type:</strong> {image.battery_type}</p>
//                                         <p><strong>Motor Type:</strong> {image.motor_type}</p>
//                                         <p><strong>Wheel Type:</strong> {image.wheel_type}</p>
//                                         <p><strong>Truck Type:</strong> {image.truck_type}</p>
//                                         <p><strong>Max Speed:</strong> {image.max_speed}</p>
//                                     </div>
//                                 </div>
//                             )) : <p>No images uploaded.</p>}
//                         </div>
//                     </section>

//                     <section>
//                         <h2>Liked Images</h2>
//                         <div>
//                             {likedImages.length > 0 ? likedImages.map((image, index) => (
//                                 <div key={index}>
//                                     <img src={image.image_url} alt="Liked" />
//                                     <div className='image-details'>
//                                         <p><strong>Battery Type:</strong> {image.battery_type}</p>
//                                         <p><strong>Motor Type:</strong> {image.motor_type}</p>
//                                         <p><strong>Wheel Type:</strong> {image.wheel_type}</p>
//                                         <p><strong>Truck Type:</strong> {image.truck_type}</p>
//                                         <p><strong>Max Speed:</strong> {image.max_speed}</p>
//                                     </div>
//                                 </div>
//                             )) : <p>No images liked.</p>}
//                         </div>
//                     </section>
//                 </div>
//             ) : (
//                 <p>Please log in to view your profile.</p>
//             )}
//         </div>
//     );
// };

// export default Profile;

















////with checkboxes but code looks strange and might not be correct

// {editMode.boards_owned ? (
//         <div>
//             {["Evolve", "Lacroix", "KalyNYC", "Metroboard", "Trampa", "Mellow", "Boosted", "Exway", "Bajaboard", "Hoyt St.", "Acton", "Backfire", "Meepo", "Other"].map((board, index) => (
//                 <label key={index}>
// <input className='user-data-checkbox'
//     type="checkbox"
//     name="boards_owned"
//     value={board}
//     checked={editValues.boards_owned.includes(board)}
//     onChange={(e) => {
//         let newSelection;
//         if (e.target.checked) {
//             newSelection = [...editValues.boards_owned, board];  // add checked board
//         } else {
//             newSelection = editValues.boards_owned.filter(item => item !== board);  // remove unchecked board
//         }
//         setEditValues({ ...editValues, boards_owned: newSelection });
//     }}
// />
//                     {board}
//                 </label>
//             ))}
//         </div>
//     ) : (
//     <span className="user-data-value">
//         {Array.isArray(userData.boards_owned)
//             ? userData.boards_owned.join(', ')
//             : (userData.boards_owned || '').split(',').join(', ')}
//     </span>
// )}









//////multiple dropdown selection, NOT WORKING!

// <div className="user-data-field">
// <strong className="user-data-label">Boards Owned:</strong>
// <div className="input-and-buttons">
//     {editMode.boards_owned ? (
//         <select className="user-data-select"
//             multiple
//             value={editValues.boards_owned}
//             onChange={(e) => {
//                 const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
//                 setEditValues({ ...editValues, boards_owned: selectedOptions })
//             }}
//         >
//             <option value="Evolve">Evolve</option>
//             <option value="Lacroix">Lacroix</option>
//             <option value="KalyNYC">KalyNYC</option>
//             <option value="Metroboard">Metroboard</option>
//             <option value="Trampa">Trampa</option>
//             <option value="Mellow">Mellow</option>
//             <option value="Boosted">Boosted</option>
//             <option value="Exway">Exway</option>
//             <option value="Bajaboard">Bajaboard</option>
//             <option value="Hoyt St.">Hoyt St.</option>
//             <option value="Acton">Acton</option>
//             <option value="Backfire">Backfire</option>
//             <option value="Meepo">Meepo</option>
//             <option value="Other">Other</option>
//         </select>
//     ) : (
//         <span className="user-data-value">
//             {Array.isArray(userData.boards_owned)
//                 ? userData.boards_owned.join(', ')
//                 : (userData.boards_owned || '').split(',').join(', ')}
//         </span>
        
//     )}
//     {/* Edit Button */}
// { editMode.boards_owned && <button className="save-button" onClick={() => saveData('boards_owned')}>Save</button> }
// <button className="edit-button" onClick={() => setEditMode({ ...editMode, boards_owned: !editMode.boards_owned })}>
//     {editMode.boards_owned ? 'Cancel' : 'Edit'}
// </button>
// </div >
// </div >