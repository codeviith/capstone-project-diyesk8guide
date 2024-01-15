import React, { useState, useEffect, useContext } from 'react';
import HeartButton from './HeartButton';
import { AuthContext } from './AuthContext';


function Gallery() {
    const [image, setImage] = useState(null);
    // const [formFields, setFormFields] = useState({ battery_series: '', battery_parallel: '', motor_size: '', motor_kv: '', motor_power: '', wheel_type: '', truck_type: '', max_speed: '' });
    const [formFields, setFormFields] = useState({
        battery_series: '', 
        battery_parallel: '', 
        motor_size: '', 
        motor_kv: '', 
        motor_power: '', 
        wheel_type: '', 
        truck_type: '', 
        max_speed: ''
    });
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
                setTopHeartedImages(topImages); // Update state to get new top hearted images
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

    const handleFormFieldChange = (e) => {
        setFormFields({ ...formFields, [e.target.name]: e.target.value });
    };

    const isFormValid = () => {
        const allTextFieldsFilled  = Object.values(formFields).every(field => field.trim() !== '');
        const isWheelTypeValid = formFields.wheel_type && formFields.wheel_type !== "";
        const isTruckTypeValid = formFields.truck_type && formFields.truck_type !== "";

        if (!allTextFieldsFilled || !isWheelTypeValid || !isTruckTypeValid) {
            setUploadError('Please complete all fields for submission');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLoggedIn) {
            alert('You must be logged in to post.');
            return;
        }

        if (!isFormValid()) {
            return;  //empty return if validation fails, so nothing gets submitted
        }

        setUploadError(''); //code to reset the error message

        const formData = new FormData();
        formData.append('image', image);

        try {
            let response = await fetch('/gallery/upload', { method: 'POST', body: formData });  //code to upload image
            if (response.ok) {
                const responseData = await response.json();
                const imageId = responseData.id; // Get the id of the uploaded image

                response = await fetch('/gallery', {  //code to add additional data
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: imageId, ...formFields }),
                });

                if (response.ok) {
                    fetchGalleryItems();  //code to refetch gallery so to update state
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
        newGalleryItems[index].hearts += change; //code to adjust heart count by change amount

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
                                <p>Battery Type: {item.battery_series}S {item.battery_parallel}P</p>
                                <p>Motor Type: {item.motor_size} {item.motor_kv}Kv {item.motor_power}Watts</p>
                                <p>Wheel Type: {item.wheel_type}</p>
                                <p>Truck Type: {item.truck_type}</p>
                                <p>Max Speed: {item.max_speed}MPH</p>
                                <p>Rating: {item.hearts}</p>
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
                            <p>Battery Type: {item.battery_series}S {item.battery_parallel}P</p>
                            <p>Motor Type: {item.motor_size} {item.motor_kv}Kv {item.motor_power}Watts</p>
                            <p>Wheel Type: {item.wheel_type}</p>
                            <p>Truck Type: {item.truck_type}</p>
                            <p>Max Speed: {item.max_speed}MPH</p>
                            <HeartButton
                                imageId={item.id}
                                onHearted={(hearts) => updateHeartCount(index, hearts)}
                                initiallyHearted={item.isHearted}
                                refreshTopImages={fetchTopHeartedImages}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Floating form */}
            <div className="floating-form">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    {fileName && <div className="file-name-display">{fileName}</div>}
                    <div className="file-input-wrapper">
                        <input type="file" accept="image/*" onChange={handleImageChange} id="file-input" style={{ display: 'none' }} />
                        <label htmlFor="file-input" className="file-input-button">Select Image</label>
                    </div>

                    <br />
                    <div>
                        <strong className='form-label'>Battery Type:</strong>
                        <label className='batt-series'>Series
                            <input type="number" name="battery_series" placeholder="E.g. 12" value={formFields.battery_series} onChange={handleFormFieldChange} />
                        </label>
                        <label className='batt-parallel'>Parallel
                            <input type="number" name="battery_parallel" placeholder="E.g. 4" value={formFields.battery_parallel} onChange={handleFormFieldChange} />
                        </label>
                    </div>

                    <div>
                        <strong className='form-label'>Motor Type:</strong>
                        <label className='motor-size'>Size
                            <input type="number" name="motor_size" placeholder="E.g. 5065, 6364, etc." value={formFields.motor_size} onChange={handleFormFieldChange} />
                        </label>
                        <label className='motor-kv'>Kv
                            <input type="number" name="motor_kv" placeholder="E.g. 170kv, 190kv, etc." value={formFields.motor_kv} onChange={handleFormFieldChange} />
                        </label>
                        <label className='motor-power'>Watts
                            <input type="number" name="motor_power" placeholder="E.g. 1500, 4000, etc." value={formFields.motor_power} onChange={handleFormFieldChange} />
                        </label>
                    </div>

                    <strong className='form-label'>Wheel Type:</strong>
                    <select name="wheel_type" value={formFields.wheel_type} onChange={handleFormFieldChange}>
                        <option value="">Select Wheel Type</option>
                        <option value="Street">Street</option>
                        <option value="Rubber">Rubber</option>
                        <option value="Airless Pneumatics">Airless Pneumatics</option>
                        <option value="Pneumatics">Pneumatics</option>
                    </select>

                    <strong className='form-label'>Truck Type:</strong>
                    <select name="truck_type" value={formFields.truck_type} onChange={handleFormFieldChange}>
                        <option value="">Select Truck Type</option>
                        <option value="Top Mount">Top Mount</option>
                        <option value="Drop Mount">Drop Mount</option>
                        <option value="Flush Mount">Flush Mount</option>
                        <option value="Drop-Thru">Drop-Thru</option>
                    </select>

                    <div>
                        <strong className='form-label'>Max Speed:</strong>
                        <label className='max-speed'>MPH
                            <input type="number" name="max_speed" placeholder="E.g. 32" value={formFields.max_speed} onChange={handleFormFieldChange} />
                        </label>
                    </div>
                    <button type="submit">Submit</button>
                    {uploadError && <div className="upload-error">{uploadError}</div>}
                </form>
            </div>
        </div>
    );
}

export default Gallery;

