import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import HeartIcon from './HeartIcon';
import BrokenHeartIcon from './BrokenHeartIcon';

const HeartButton = ({ imageId, onHearted }) => {
    const { isLoggedIn } = useContext(AuthContext);
    const [isHearted, setIsHearted] = useState(false);

    const handleHeartClick = async () => {
        if (!isLoggedIn) {
            alert("Please log in to heart images.");
            return;
        }

        try {
            const response = await fetch('/gallery/heart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image_id: imageId }),
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setIsHearted(!isHearted); // Toggle the heart state
                console.log("Hearted State:", !isHearted);
                onHearted(data.hearts); // Update the heart count in the parent component
            } else {
                alert("Could not heart the image.");
            }
        } catch (error) {
            console.error('Error during heart request:', error);
            if (error.response) {
                console.log('Server responded with:', await error.response.text());
            }
        }
    };


    return (
        <button id='heart-button' onClick={handleHeartClick}>
            {isHearted ? <HeartIcon /> : <BrokenHeartIcon />}
        </button>
    );
};

export default HeartButton;


