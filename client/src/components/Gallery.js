import React, { useState, useEffect, useContext } from 'react';
import HeartButton from './HeartButton';
import { AuthContext } from './AuthContext';


function Gallery() {
    const [image, setImage] = useState(null);
    const [dropdowns, setDropdowns] = useState({ battery_type: '', motor_type: '', wheel_type: '', truck_type: '', max_speed: '' });
    const [galleryItems, setGalleryItems] = useState([]);
    const [topHeartedImages, setTopHeartedImages] = useState([]); // State to store top hearted images
    const [fileName, setFileName] = useState('');
    const [uploadError, setUploadError] = useState('');
    const { isLoggedIn } = useContext(AuthContext);


    useEffect(() => {
        fetchTopHeartedImages();
        fetchGalleryItems();
    }, []);

    const fetchTopHeartedImages = async () => {
        try {
            const response = await fetch('/gallery/top');
            if (response.ok) {
                const topImages = await response.json();
                setTopHeartedImages(topImages);
            }
        } catch (error) {
            console.error('Error fetching top hearted images:', error);
        }
    };

    const fetchGalleryItems = async () => {
        try {
            const response = await fetch('/gallery');
            const data = await response.json();
            setGalleryItems(data);
        } catch (error) {
            console.error('Error fetching gallery items:', error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImage(file);
            setFileName(file.name);
        } else {
            setImage(null);
            setFileName('');
        }
    };

    const handleDropdownChange = (e) => {
        setDropdowns({ ...dropdowns, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLoggedIn) {
            alert('You must be logged in to post.');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);

        try {
            // First, upload the image
            let response = await fetch('/gallery/upload', { method: 'POST', body: formData });
            if (response.ok) {
                const responseData = await response.json();
                const imageId = responseData.id; // Get the id of the uploaded image

                // Then, submit the additional data
                response = await fetch('/gallery', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: imageId, ...dropdowns }),
                });

                if (response.ok) {
                    // Refetch gallery items to update the state
                    fetchGalleryItems();
                } else {
                    throw new Error('Failed to submit gallery item data');
                }
            } else {
                throw new Error('Failed to upload image');
            }
        } catch (error) {
            console.error('Error during form submission:', error);
            setUploadError('Error submitting form. Please try again.');
        }
    };

    const updateHeartCount = (index, change) => {
        console.log(`Updating heart count for index ${index} with change ${change}`);
        const newGalleryItems = [...galleryItems];
        newGalleryItems[index].hearts += change; // Adjust the heart count by the change amount

        setGalleryItems(newGalleryItems);
    };


    return (
        <div className="gallery-container">
            {/* Hall of Fame */}
            <div className="hall-of-fame">
                <h1>Hall of Fame</h1>
                <div className="top-gallery-items">
                    {topHeartedImages.map((item, index) => (
                        <div key={index} className="top-gallery-item">
                            <img src={`images/${item.image_filename}`} alt={item.image_filename} />
                            <div className="item-details">
                                <p>Battery Type: {item.battery_type}</p>
                                <p>Motor Type: {item.motor_type}</p>
                                <p>Wheel Type: {item.wheel_type}</p>
                                <p>Truck Type: {item.truck_type}</p>
                                <p>Max Speed: {item.max_speed}</p>
                                <p>Hearts: {item.hearts}</p>
                                <HeartButton
                                    imageId={item.id}
                                    onHearted={(hearts) => updateHeartCount(index, hearts)}
                                    initiallyHearted={item.isHearted}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Gallery items */}
            <div className="gallery-items">
                <h2>Featured Builds</h2>
                {galleryItems.map((item, index) => (
                    <div key={index} className="gallery-item">
                        <img src={`images/${item.image_filename}`} alt={item.image_filename} />
                        <div className="item-details">
                            <p>Battery Type: {item.battery_type}</p>
                            <p>Motor Type: {item.motor_type}</p>
                            <p>Wheel Type: {item.wheel_type}</p>
                            <p>Truck Type: {item.truck_type}</p>
                            <p>Max Speed: {item.max_speed}</p>
                            <HeartButton
                                imageId={item.id}
                                onHearted={(hearts) => updateHeartCount(index, hearts)}
                                initiallyHearted={item.isHearted}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Floating form */}
            <div className="floating-form">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    {uploadError && <div className="upload-error">{uploadError}</div>}
                    {fileName && <div className="file-name-display">{fileName}</div>}
                    <div className="file-input-wrapper">
                        <input type="file" accept="image/*" onChange={handleImageChange} id="file-input" style={{ display: 'none' }} />
                        <label htmlFor="file-input" className="file-input-button">Select Image</label>
                    </div>

                    <br />

                    <select name="batteryType" value={dropdowns.batteryType} onChange={handleDropdownChange}>
                        <option value="">Battery Type</option>
                        <option value="10s6p">10s6p</option>
                        <option value="12s4p">12s4p</option>
                        <option value="12s6p">12s6p</option>
                        <option value="14s4p">14s4p</option>
                    </select>

                    <select name="motorType" value={dropdowns.motorType} onChange={handleDropdownChange}>
                        <option value="">Motor Type</option>
                        <option value="5364 170kv">5364 170kv</option>
                        <option value="6364 190kv">6364 190kv</option>
                        <option value="6384 170kv">6384 170kv</option>
                        <option value="63100 150kv">63100 150kv</option>
                    </select>

                    <select name="wheelType" value={dropdowns.wheelType} onChange={handleDropdownChange}>
                        <option value="">Wheel Type</option>
                        <option value="Street">Street</option>
                        <option value="Rubber">Rubber</option>
                        <option value="Airless Pneumatics">Airless Pneumatics</option>
                        <option value="Pneumatics">Pneumatics</option>
                    </select>

                    <select name="truckType" value={dropdowns.truckType} onChange={handleDropdownChange}>
                        <option value="">Truck Type</option>
                        <option value="Top Mount">Top Mount</option>
                        <option value="Drop Mount">Drop Mount</option>
                        <option value="Flush Mount">Flush Mount</option>
                        <option value="Drop-Thru">Drop-Thru</option>
                    </select>

                    <select name="maxSpeed" value={dropdowns.maxSpeed} onChange={handleDropdownChange}>
                        <option value="">Max Speed</option>
                        <option value="25 MPH">25 MPH</option>
                        <option value="28 MPH">28 MPH</option>
                        <option value="30 MPH">30 MPH</option>
                        <option value="35 MPH">35 MPH</option>
                    </select>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Gallery;


