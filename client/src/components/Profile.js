import React, { useState, useEffect, useContext } from 'react';
import { responseStyle } from './CommonStyles'
import { formatResponse } from './CommonFunctions'
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
                                <div className='questions-asked' key={index} style={responseStyle}>
                                    <p><strong>Question:</strong> {question.user_input}</p>
                                    <div><strong>Answer:</strong> {formatResponse(question.answer)}</div>
                                    <div className='delete-question-button-container'>
                                        <button className='delete-button' onClick={() => deleteQuestion(question.id)}>Delete</button>
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

