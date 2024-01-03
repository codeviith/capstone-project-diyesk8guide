import React, { useContext } from 'react';
import { AuthContext } from './AuthContext'; // Import AuthContext

const HeartButton = ({ imageId, onHearted }) => {
    const { isLoggedIn } = useContext(AuthContext);

    const handleHeartClick = async () => {
        if (!isLoggedIn) {
            alert("Please log in to heart images.");
            return;
        }

        const response = await fetch('/gallery/heart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image_id: imageId }),
            credentials: 'include',
        });

        if (response.ok) {
            const data = await response.json();
            onHearted(data.hearts); // Callback to update UI
        } else {
            alert("Could not heart the image.");
        }
    };

    return <button onClick={handleHeartClick}>❤️</button>;
};

export default HeartButton;
