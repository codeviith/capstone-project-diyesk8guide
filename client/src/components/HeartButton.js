import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import HeartIcon from './HeartIcon';
import BrokenHeartIcon from './BrokenHeartIcon';

function HeartButton({ imageId, onHearted, initiallyHearted }) {
    const { isLoggedIn } = useContext(AuthContext);
    const [isHearted, setIsHearted] = useState(initiallyHearted);

    const handleHeartClick = async () => {
        if (!isLoggedIn) {
            alert('You must be logged in to heart images.');
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
                setIsHearted(data.newHeartState); // Update based on the new state from the server
                onHearted(data.hearts); // Update the heart count in the parent component
            } else {
                alert('Error toggling heart status.');
            }
        } catch (error) {
            console.error('Error during heart request:', error);
        }
    };

    // Conditional rendering based on login status
    if (!isLoggedIn) {
        return null; // Do not render anything if the user is not logged in
    }

    return (
        <button id='heart-button' onClick={handleHeartClick}>
            {isHearted ? <HeartIcon /> : <BrokenHeartIcon />}
        </button>
    );
};

export default HeartButton;



