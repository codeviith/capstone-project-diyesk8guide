import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';


const Account = () => {
    const [boards, setBoards] = useState([]);
    const [posts, setPosts] = useState([]);
    const [replies, setReplies] = useState([]);
    const [guruData, setGuruData] = useState([]);

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
        } else if (category === 'Questions') {
            endpoint = `/guru/${id}`;
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

                if (category === 'Questions') {
                    setGuruData(prevGuruData => prevGuruData.filter(question => question.id !== id));
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
                                    <img src={item.image_url} alt={`${item.name} Board`} />
                                    {/* Specs */}
                                    <ul className='board_spec'>
                                        <strong className='deck'> Deck </strong>
                                        <li>Deck Type: {item.deck_type}</li>
                                        <li>Deck Length: {item.deck_length}</li>
                                        <li>Deck Material: {item.deck_material}</li>
                                        <strong className='truck'> Truck </strong>
                                        <li>Truck Type: {item.truck_type}</li>
                                        <li>Truck Width: {item.truck_width}</li>
                                        <strong className='controller'> Controller </strong>
                                        <li>Controller Feature: {item.controller_feature}</li>
                                        <li>Controller Type: {item.controller_type}</li>
                                        <strong className='remote'> Remote </strong>
                                        <li>Remote Feature: {item.remote_feature}</li>
                                        <li>Remote Type: {item.remote_type}</li>
                                        <strong className='motor'> Motor </strong>
                                        <li>Motor Size: {item.motor_size}</li>
                                        <li>Motor Kv: {item.motor_kv}</li>
                                        <strong className='wheel'> Wheel </strong>
                                        <li>Wheel Size: {item.wheel_size}</li>
                                        <li>Wheel Type: {item.wheel_type}</li>
                                        <strong className='battery'> Battery </strong>
                                        <li>Battery Voltage: {item.battery_voltage}</li>
                                        <li>Battery Type: {item.battery_type}</li>
                                        <li>Battery Capacity: {item.battery_capacity}</li>
                                        <li>Battery Configuration: {item.battery_configuration}</li>
                                        <strong className='range'> Range </strong>
                                        <li>Range: {item.range_mileage}</li>
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
        <div className='account'>
            {renderContainer('Boards', boards)}
            {renderContainer('Questions', guruData)}
            {renderContainer('Posts', posts)}
            {renderContainer('Replies', replies)}
        </div>
    );
};


export default Account;


