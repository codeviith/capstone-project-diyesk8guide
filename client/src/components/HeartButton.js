import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import HeartIcon from './HeartIcon';
import BrokenHeartIcon from './BrokenHeartIcon';

function HeartButton({ imageId, onHearted, initiallyHearted, refreshTopImages }) {
    const { isLoggedIn } = useContext(AuthContext);
    const [isHearted, setIsHearted] = useState(initiallyHearted);

    const handleHeartClick = async () => {
        // "Optimistically" update the heart count, aka. update the count ahead of the backend operation
        const newHeartState = !isHearted;
        setIsHearted(newHeartState);
        onHearted(newHeartState ? 1 : -1); // Increment or decrement heart count
    
        try {
            const response = await fetch('/gallery/heart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image_id: imageId }),
                credentials: 'include',
            });
    
            if (!response.ok) {
                // If backend operation fails, revert the heart count and state
                setIsHearted(!newHeartState);
                onHearted(newHeartState ? -1 : 1);
                alert('Error toggling heart status.');
            } else {
                refreshTopImages();
            }
        } catch (error) {
            console.error('Error during heart request:', error);
            // Revert heart count and state on error
            setIsHearted(!newHeartState);
            onHearted(newHeartState ? -1 : 1);
        }
    };
    

    // Conditional display depending on login status
    if (!isLoggedIn) {
        return null; // Return nothing if the user not logged in
    }

    return (
        <button id='heart-button' onClick={handleHeartClick}>
            {isHearted ? <HeartIcon /> : <BrokenHeartIcon />}
        </button>
    );
};

export default HeartButton;


