import React, { useState, useEffect, useContext } from 'react';
import HeartButton from './HeartButton';
import ReportIcon1 from './ReportIcon1';
import ReportIcon2 from './ReportIcon2';
import ReportIcon3 from './ReportIcon3';
import ReportIcon4 from './ReportIcon4';
import { AuthContext } from './AuthContext';


function Gallery() {
    const [image, setImage] = useState(null);
    const [formFields, setFormFields] = useState({
        deck_brand: '',
        deck_size: '',
        battery_series: '',
        battery_parallel: '',
        motor_size: '',
        motor_kv: '',
        motor_power: '',
        wheel_type: '',
        wheel_size: '',
        max_speed: '',
        max_range: '',
        other_features: ''
    });
    const [galleryItems, setGalleryItems] = useState([]);
    const [topHeartedImages, setTopHeartedImages] = useState([]); // State to store top hearted images
    const [fileName, setFileName] = useState('');
    const [heartSuccess, setHeartSuccess] = useState({});
    const [uploadError, setUploadError] = useState('');
    const [reportErrors, setReportErrors] = useState({});
    const [reportSuccess, setReportSuccess] = useState({});
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
        if (!image) {
            setUploadError("Image cannot be empty");
            return false;
        }

        const isFieldEmpty = (value, fieldName) => {  //code to check for empty fields
            if (value.trim() === '') {
                setUploadError(`${fieldName} cannot be empty`);
                return true;
            }
            return false;
        };

        if (isFieldEmpty(formFields.deck_brand, 'Deck Brand') ||
            isFieldEmpty(formFields.deck_size, 'Deck Size') ||
            isFieldEmpty(formFields.battery_series, 'Battery Series') ||
            isFieldEmpty(formFields.battery_parallel, 'Battery Parallel') ||
            isFieldEmpty(formFields.motor_size, 'Motor Size') ||
            isFieldEmpty(formFields.motor_kv, 'Motor Kv') ||
            isFieldEmpty(formFields.motor_power, 'Motor Power') ||
            isFieldEmpty(formFields.wheel_type, 'Wheel Type') ||
            isFieldEmpty(formFields.wheel_size, 'Wheel Size') ||
            isFieldEmpty(formFields.max_speed, 'Max Speed') ||
            isFieldEmpty(formFields.max_range, 'Max Range')) {
            return false;  //Code to return false if any field is empty
        }

        const isPositive = (value, fieldName) => {  //Code to check for positive values
            if (parseInt(value) <= 0) {
                setUploadError(`${fieldName} must be a positive value`);
                return false;
            }
            return true;
        };

        if (!isPositive(formFields.motor_size, 'Motor Size') ||
            !isPositive(formFields.motor_kv, 'Motor Kv') ||
            !isPositive(formFields.motor_power, 'Motor Power') ||
            !isPositive(formFields.max_speed, 'Max Speed') ||
            !isPositive(formFields.max_range, 'Max Range')) {
            return false;  //Code to returns false if any field is not positive
        }

        const isTooLarge = (value, fieldName, maxValue) => {
            if (typeof value === 'string' && value.length > maxValue) {
                setUploadError(`${fieldName} must be less than ${maxValue} characters`);
                return true;
            } else if (parseInt(value) > maxValue) {
                setUploadError(`${fieldName} value too large!`);
                return true;
            }
            return false;
        };

        if (isTooLarge(formFields.motor_size, 'Motor Size', 17000) ||
            isTooLarge(formFields.motor_kv, 'Motor Kv', 500) ||
            isTooLarge(formFields.motor_power, 'Motor Power', 10000) ||
            isTooLarge(formFields.max_speed, 'Max Speed', 70) ||
            isTooLarge(formFields.max_range, 'Max Range', 100) ||
            isTooLarge(formFields.other_features, 'Other Features', 250)) {
            return false;  // if any field value is over maxValue or over char limit
        }

        return true;  // if all validations passed
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const submissionFields = {  //code to add 'n/a' to other_features if input is blank
            ...formFields,
            other_features: formFields.other_features.trim() === '' ? 'n/a' : formFields.other_features
        };
        const formData = new FormData();

        if (!isLoggedIn) {
            setUploadError('Please log in to post.');
            return;
        }

        if (!isFormValid()) {
            return;  // Code for an empty return if validation fails, so nothing gets submitted
        }

        setUploadError(''); //Code to reset the error message
        formData.append('image', image);

        try {
            let response = await fetch('/gallery/upload', {  // Code to upload image
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const responseData = await response.json();
                const imageId = responseData.id; // Code to get the id of the uploaded image

                response = await fetch('/gallery', {  //Code to add additional data
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: imageId, ...submissionFields }),
                });

                if (response.ok) {
                    fetchGalleryItems();  //code to refetch gallery so to update state
                    resetForm();
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
        // console.log(`Updating heart count for index ${index} with change ${change}`);
        const newGalleryItems = [...galleryItems];
        const postId = newGalleryItems[index].id;

        newGalleryItems[index].hearts += change; //code to adjust heart count by change amount

        setHeartSuccess(prevHeartSuccess => ({
            ...prevHeartSuccess,
            [postId]: change > 0 ? "Post liked successfully" : "Post unliked successfully"
        }));

        setTimeout(() => {
            setHeartSuccess(prevHeartSuccess => ({
                ...prevHeartSuccess,
                [postId]: "" // Clear the message
            }));
        }, 5000);

        setGalleryItems(newGalleryItems);
    };

    const resetForm = () => {
        setFormFields({
            deck_brand: '',
            deck_size: '',
            battery_series: '',
            battery_parallel: '',
            motor_size: '',
            motor_kv: '',
            motor_power: '',
            wheel_type: '',
            wheel_size: '',
            max_speed: '',
            max_range: '',
            other_features: ''
        });
        setImage(null);
        setFileName('');
        setUploadError('');
    };

    const reportImage = async (imageId) => {
        if (!isLoggedIn) {
            setReportErrors(prevErrors => ({ ...prevErrors, [imageId]: 'You must log in to report a post' }));
            return;
        }

        try {
            const response = await fetch(`/gallery/report/${imageId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();

            if (response.ok) {
                setReportSuccess(prevSuccess => ({ ...prevSuccess, [imageId]: 'Post reported successfully' }));
                setReportErrors(prevErrors => ({ ...prevErrors, [imageId]: '' }));
                fetchGalleryItems();

                setTimeout(() => {
                    setReportSuccess(prevSuccess => ({ ...prevSuccess, [imageId]: '' }));
                }, 5000);
            } else {
                setReportErrors(prevErrors => ({ ...prevErrors, [imageId]: data.error }));

                setTimeout(() => {
                    setReportErrors(prevErrors => ({ ...prevErrors, [imageId]: '' }));
                }, 5000);
            }
        } catch (error) {
            setReportErrors(prevErrors => ({ ...prevErrors, [imageId]: 'An error occurred while reporting the image' }));
            console.error('Error:', error);

            setTimeout(() => {
                setReportErrors(prevErrors => ({ ...prevErrors, [imageId]: '' }));
            }, 5000);
        }
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
                                <p><strong className='item-details-strong'>Deck Type:</strong> {item.deck_brand} {item.deck_size} in.</p>
                                <p><strong className='item-details-strong'>Battery Type:</strong> {item.battery_series}s {item.battery_parallel}p</p>
                                <p><strong className='item-details-strong'>Motor Type:</strong> {item.motor_size} {item.motor_kv}Kv {item.motor_power}Watts</p>
                                <p><strong className='item-details-strong'>Wheel Type:</strong> {item.wheel_size} {item.wheel_type}</p>
                                <p><strong className='item-details-strong'>Max Speed & Range:</strong> {item.max_speed} MPH, {item.max_range} Miles</p>
                                <p><strong className='item-details-strong'>Other Features:</strong><p className='item-details-other-features'>{item.other_features}</p></p>
                                <p className='rating'><strong className='item-details-strong'>Rating:</strong> {item.hearts}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Gallery items */}
            <div className="gallery-items">
                <div className='featured-builds-container-divider'></div>
                <div className='featured-builds-container'>
                    <h2>Featured Builds</h2>
                </div>
                {galleryItems.map((item, index) => (
                    <div key={index} className="gallery-item">
                        <img src={`images/${item.image_filename}`} alt={item.image_filename} />
                        <div className="item-details">
                            <p><strong className='item-details-strong'>Deck Type:</strong> {item.deck_brand} {item.deck_size} in.</p>
                            <p><strong className='item-details-strong'>Battery Type:</strong> {item.battery_series}s {item.battery_parallel}p</p>
                            <p><strong className='item-details-strong'>Motor Type:</strong> {item.motor_size} {item.motor_kv}Kv {item.motor_power}Watts</p>
                            <p><strong className='item-details-strong'>Wheel Type:</strong> {item.wheel_size} {item.wheel_type}</p>
                            <p><strong className='item-details-strong'>Max Speed & Range:</strong> {item.max_speed} MPH, {item.max_range} Miles</p>
                            <p><strong className='item-details-strong'>Other Features:</strong><p className='item-details-other-features'>{item.other_features}</p></p>
                            <div className="item-actions">
                                <HeartButton
                                    imageId={item.id}
                                    onHearted={(hearts) => updateHeartCount(index, hearts)}
                                    initiallyHearted={item.isHearted}
                                    refreshTopImages={fetchTopHeartedImages}
                                />
                                {isLoggedIn && (
                                    <div className="report-button"
                                        onClick={() => reportImage(item.id)}
                                        title="Report"
                                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                    >
                                        <ReportIcon1 />
                                    </div>
                                )}
                            </div>
                            {heartSuccess[item.id] && <div className="heart-success-message">{heartSuccess[item.id]}</div>}
                            {reportSuccess[item.id] && <div className="report-success-message">{reportSuccess[item.id]}</div>}
                            {reportErrors[item.id] && <div className="report-error-message">{reportErrors[item.id]}</div>}
                        </div>
                    </div>
                ))}
            </div>

            {/* Floating form */}
            <div className="floating-form">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="file-input-wrapper">
                        <input id="file-input"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="file-input" className="file-input-button">Select Image</label>
                    </div>

                    {fileName && <div className="file-name-display">{fileName}</div>}

                    <div>
                        <strong className='form-label'>Deck Brand</strong>
                        <label className='deck-brand'>
                            <input
                                type="text"
                                name="deck_brand"
                                placeholder="E.g. Sector9, Omni CF, etc."
                                value={formFields.deck_brand}
                                onChange={handleFormFieldChange}
                            />
                        </label>
                    </div>

                    <strong className='form-label'>Deck Size</strong>
                    <select name="deck_size" value={formFields.deck_size} onChange={handleFormFieldChange}>
                        <option value="">Select Deck Size</option>
                        <option value="25">25 inches</option>
                        <option value="26">26 inches</option>
                        <option value="27">27 inches</option>
                        <option value="28">28 inches</option>
                        <option value="29">29 inches</option>
                        <option value="30">30 inches</option>
                        <option value="31">31 inches</option>
                        <option value="32">32 inches</option>
                        <option value="33">33 inches</option>
                        <option value="34">34 inches</option>
                        <option value="35">35 inches</option>
                        <option value="36">36 inches</option>
                        <option value="37">37 inches</option>
                        <option value="38">38 inches</option>
                        <option value="39">39 inches</option>
                        <option value="40">40 inches</option>
                        <option value="41">41 inches</option>
                        <option value="42">42 inches</option>
                        <option value="43">43 inches</option>
                        <option value="44">44 inches</option>
                        <option value="45">45 inches</option>
                        <option value="46">46 inches</option>
                        <option value="47">47 inches</option>
                        <option value="48">48 inches</option>
                    </select>




                    <strong className='form-label'>Battery Series</strong>
                    <select name="battery_series" value={formFields.battery_series} onChange={handleFormFieldChange}>
                        <option value="">Select Battery Series</option>
                        <option value="8">8s</option>
                        <option value="10">10s</option>
                        <option value="12">12s</option>
                        <option value="13">13s</option>
                        <option value="14">14s</option>
                        <option value="15">15s</option>
                        <option value="16">16s</option>
                        <option value="17">17s</option>
                        <option value="18">18s</option>
                        <option value="19">19s</option>
                        <option value="20">20s</option>
                        <option value="21">21s</option>
                        <option value="22">22s</option>
                        <option value="23">23s</option>
                    </select>


                    <strong className='form-label'>Battery Parallel</strong>
                    <select name="battery_parallel" value={formFields.battery_parallel} onChange={handleFormFieldChange}>
                        <option value="">Select Battery Parallel</option>
                        <option value="1">1p</option>
                        <option value="2">2p</option>
                        <option value="3">3p</option>
                        <option value="4">4p</option>
                        <option value="5">5p</option>
                        <option value="6">6p</option>
                        <option value="7">7p</option>
                        <option value="8">8p</option>
                        <option value="9">9p</option>
                        <option value="10">10p</option>
                        <option value="11">11p</option>
                        <option value="12">12p</option>
                        <option value="13">13p</option>
                        <option value="14">14p</option>
                        <option value="15">15p</option>
                        <option value="16">16p</option>
                        <option value="17">17p</option>
                        <option value="18">18p</option>
                    </select>

                    <div>
                        <strong className='form-label'>Motor Type</strong>
                        <label className='motor-size'>Size (dia, length):
                            <input
                                type="number"
                                name="motor_size"
                                placeholder="E.g. 5065, 6364, etc."
                                value={formFields.motor_size}
                                onChange={handleFormFieldChange}
                            />
                        </label>
                        <label className='motor-kv'>Kv:
                            <input
                                type="number"
                                name="motor_kv"
                                placeholder="E.g. 170kv, 190kv, etc."
                                value={formFields.motor_kv}
                                onChange={handleFormFieldChange}
                            />
                        </label>
                        <label className='motor-power'>Power (Watts):
                            <input
                                type="number"
                                name="motor_power"
                                placeholder="E.g. 1500, 4000, etc."
                                value={formFields.motor_power}
                                onChange={handleFormFieldChange}
                            />
                        </label>
                    </div>

                    <strong className='form-label'>Wheel Type</strong>
                    <select name="wheel_type" value={formFields.wheel_type} onChange={handleFormFieldChange}>
                        <option value="">Select Wheel Type</option>
                        <option value="Street">Street (Urathane)</option>
                        <option value="Rubber">Rubber</option>
                        <option value="Airless Pneumatics">Airless Pneumatics</option>
                        <option value="Pneumatics">Pneumatics</option>
                    </select>

                    <div>
                        <strong className='form-label'>Wheel Size(mm, in.)</strong>
                        <input
                            type="text"
                            name="wheel_size"
                            placeholder="E.g. 90mm, 7in., etc."
                            value={formFields.wheel_size}
                            onChange={handleFormFieldChange}
                            maxLength="6"
                        />
                        <div className='character-count'
                            style={{ color: formFields.wheel_size.length > 5 ? 'darkred' : 'black' }}>
                            {formFields.wheel_size.length}/6
                        </div>
                    </div>

                    <div>
                        <strong className='form-label'>Max Speed (mph)</strong>
                        <input
                            type="number"
                            name="max_speed"
                            placeholder="E.g. 32"
                            value={formFields.max_speed}
                            onChange={handleFormFieldChange}
                        />
                    </div>

                    <div>
                        <strong className='form-label'>Max Range (miles)</strong>
                        <input
                            type="number"
                            name="max_range"
                            placeholder="E.g. 25"
                            value={formFields.max_range}
                            onChange={handleFormFieldChange}
                        />
                    </div>

                    <div>
                        <strong className='form-label'>Other Features</strong>
                        <textarea
                            name="other_features"
                            placeholder="E.g.VESC 6, FOCBOX Unity, GPS Module, NRF Wireless Dongle, 12s 120A BMS, Carbon Fiber Enclosure, Custom mudguards, etc."
                            value={formFields.other_features}
                            onChange={handleFormFieldChange}
                            rows={8} // Code to set # of rows, e.g. 8-line textarea
                            maxLength="250"
                        ></textarea>
                        <div className='character-count'
                            style={{ color: formFields.other_features.length > 230 ? 'darkred' : 'black' }}>
                            {formFields.other_features.length}/250
                        </div>
                    </div>

                    <button type="submit">Submit</button>
                    {uploadError && <div className="upload-error">{uploadError}</div>}
                </form>
            </div>
        </div>
    );
}

export default Gallery;

