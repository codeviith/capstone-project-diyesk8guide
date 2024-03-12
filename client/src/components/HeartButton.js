import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import HeartIcon1 from './HeartIcon1';
import HeartIcon2 from './HeartIcon2';
import BrokenHeartIcon from './BrokenHeartIcon';

function HeartButton({ imageId, onHearted, initiallyHearted, refreshTopImages }) {
    const { isLoggedIn } = useContext(AuthContext);
    const [isHearted, setIsHearted] = useState(initiallyHearted);

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:5555';


    const handleHeartClick = async () => {
        // "Optimistically" update the heart count, aka. update the count ahead of the backend operation
        const newHeartState = !isHearted;
        setIsHearted(newHeartState);
        onHearted(newHeartState ? 1 : -1); // Increment or decrement heart count

        try {
            const response = await fetch(`${backendUrl}/gallery/heart`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image_id: imageId })
            });

            if (!response.ok) {
                setIsHearted(!newHeartState);
                onHearted(newHeartState ? -1 : 1);
                alert('Error toggling heart status.');
            } else {
                refreshTopImages();
            }
        } catch (error) {
            console.error('Error during heart request:', error);

            setIsHearted(!newHeartState);
            onHearted(newHeartState ? -1 : 1);
        }
    };

    if (!isLoggedIn) {
        return null;
    }

    return (
        <div id='heart-button'
            onClick={handleHeartClick}
            title='Like'>
            {isHearted ? <HeartIcon2 /> : <BrokenHeartIcon />}
        </div>
    );
};

export default HeartButton;


