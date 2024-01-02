import React, { useState, useEffect } from 'react';

function Gallery() {
    const [image, setImage] = useState(null);
    const [dropdowns, setDropdowns] = useState({ battery_type: '', motor_type: '', wheel_type: '', truck_type: '', max_speed: '' });
    const [galleryItems, setGalleryItems] = useState([]);
    const [fileName, setFileName] = useState('');
    const [uploadError, setUploadError] = useState('');

    useEffect(() => {
        fetchGalleryItems();
    }, []);

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
        const formData = new FormData();
        formData.append('image', image);
        Object.keys(dropdowns).forEach(key => formData.append(key, dropdowns[key]));

        try {
            const response = await fetch('/gallery', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const responseData = await response.json();
                if (responseData.message === 'Image and data received successfully') {
                    // Update state immediately with new image data
                    const newImageData = {
                        image_filename: responseData.filePath.split('/').pop(),
                        ...dropdowns
                    };
                    setGalleryItems([...galleryItems, newImageData]);
                }
            } else {
                throw new Error('Failed to upload image');
            }
        } catch (error) {
            console.error('Error during image upload:', error);
            setUploadError('Error uploading image. Please try again.');
        }
    };

    return (
        <div className="gallery-container">
            {/* Gallery items */}
            <div className="gallery-items">
                {galleryItems.map((item, index) => (
                    <div key={index} className="gallery-item">
                        <img src={`images/${item.image_filename}`} alt={item.image_filename} />
                        <div className="item-details">
                            <p>Battery Type: {item.battery_type}</p>
                            <p>Motor Type: {item.motor_type}</p>
                            <p>Wheel Type: {item.wheel_type}</p>
                            <p>Truck Type: {item.truck_type}</p>
                            <p>Max Speed: {item.max_speed}</p>
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







///// WITH POLLING ///////

// import React, { useState, useEffect } from 'react';

// function Gallery() {
//     const [image, setImage] = useState(null);
//     const [dropdowns, setDropdowns] = useState({ battery_type: '', motor_type: '', wheel_type: '', truck_type: '', max_speed: '' });
//     const [galleryItems, setGalleryItems] = useState([]);
//     const [fileName, setFileName] = useState('');

//     useEffect(() => {
//         const fetchGalleryItems = async () => {
//             try {
//                 const response = await fetch('/gallery');
//                 const data = await response.json();
//                 setGalleryItems(data);
//             } catch (error) {
//                 console.error('Error fetching gallery items:', error);
//             }
//         };

//         fetchGalleryItems();
//     }, []);

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file && file.type.startsWith('image/')) {
//             setImage(file);
//             setFileName(file.name); // Set the file name
//         } else {
//             setImage(null);
//             setFileName(''); // Clear the file name
//         }
//     };

//     const handleDropdownChange = (e) => {
//         setDropdowns({ ...dropdowns, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('image', image);
//         Object.keys(dropdowns).forEach(key => formData.append(key, dropdowns[key]));

//         // Send data to Flask backend
//         const response = await fetch('/gallery', {
//             method: 'POST',
//             body: formData,
//         });

//         if (response.ok) {
//             const responseData = await response.json();
//             if (responseData.message === 'Image and data received successfully') {
//                 const filename = responseData.filePath.split('/').pop(); // Adjust based on actual response
//                 await pollImageAvailability(filename, 10, 1000); // Poll 10 times with 1 second interval
//             }
//         }
//     };

//     const pollImageAvailability = async (filename, maxAttempts, interval) => {
//         let attempts = 0;

//         const poll = async (resolve, reject) => {
//             try {
//                 const isAvailable = await checkImageAvailability(filename);
//                 attempts++;

//                 if (isAvailable) {
//                     resolve(true);
//                     // Manually update the state
//                     const newImageData = {
//                         image_filename: filename,
//                         ...dropdowns
//                     };
//                     setGalleryItems([...galleryItems, newImageData]);
//                 } else if (attempts < maxAttempts) {
//                     setTimeout(() => poll(resolve, reject), interval);
//                 } else {
//                     reject(new Error('Image availability check failed after maximum attempts'));
//                 }
//             } catch (error) {
//                 reject(error);
//             }
//         };

//         return new Promise(poll);
//     };

//     const checkImageAvailability = async (imageFilename) => {
//         const imageUrl = `/images/${imageFilename}`;
//         try {
//             const response = await fetch(imageUrl, { method: 'HEAD' });
//             return response.ok;
//         } catch (error) {
//             console.error('Error checking image:', error);
//             throw error;
//         }
//     };

//     return (
//         <div className="gallery-container">
//             {/* Gallery items */}
//             <div className="gallery-items">
//                 {galleryItems.map((item, index) => (
//                     <div key={index} className="gallery-item">
//                         <img src={`images/${item.image_filename}`} alt={item.image_filename} />
//                         <div className="item-details">
//                             <p>Battery Type: {item.battery_type}</p>
//                             <p>Motor Type: {item.motor_type}</p>
//                             <p>Wheel Type: {item.wheel_type}</p>
//                             <p>Truck Type: {item.truck_type}</p>
//                             <p>Max Speed: {item.max_speed}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Floating form */}
//             <div className="floating-form">
//                 <form onSubmit={handleSubmit} encType="multipart/form-data">
//                     {fileName && <div className="file-name-display">{fileName}</div>}
//                     <div className="file-input-wrapper">
//                         <input type="file" accept="image/*" onChange={handleImageChange} id="file-input" style={{ display: 'none' }} />
//                         <label htmlFor="file-input" className="file-input-button">Select Image</label>
//                     </div>
//                     <br />

//                     <select name="batteryType" value={dropdowns.batteryType} onChange={handleDropdownChange}>
//                         <option value="">Battery Type</option>
//                         <option value="10s6p">10s6p</option>
//                         <option value="12s4p">12s4p</option>
//                         <option value="12s6p">12s6p</option>
//                         <option value="14s4p">14s4p</option>
//                     </select>

//                     <select name="motorType" value={dropdowns.motorType} onChange={handleDropdownChange}>
//                         <option value="">Motor Type</option>
//                         <option value="5364 170kv">5364 170kv</option>
//                         <option value="6364 190kv">6364 190kv</option>
//                         <option value="6384 170kv">6384 170kv</option>
//                         <option value="63100 150kv">63100 150kv</option>
//                     </select>

//                     <select name="wheelType" value={dropdowns.wheelType} onChange={handleDropdownChange}>
//                         <option value="">Wheel Type</option>
//                         <option value="Street">Street</option>
//                         <option value="Rubber">Rubber</option>
//                         <option value="Airless Pneumatics">Airless Pneumatics</option>
//                         <option value="Pneumatics">Pneumatics</option>
//                     </select>

//                     <select name="truckType" value={dropdowns.truckType} onChange={handleDropdownChange}>
//                         <option value="">Truck Type</option>
//                         <option value="Top Mount">Top Mount</option>
//                         <option value="Drop Mount">Drop Mount</option>
//                         <option value="Flush Mount">Flush Mount</option>
//                         <option value="Drop-Thru">Drop-Thru</option>
//                     </select>

//                     <select name="maxSpeed" value={dropdowns.maxSpeed} onChange={handleDropdownChange}>
//                         <option value="">Max Speed</option>
//                         <option value="25 MPH">25 MPH</option>
//                         <option value="28 MPH">28 MPH</option>
//                         <option value="30 MPH">30 MPH</option>
//                         <option value="35 MPH">35 MPH</option>
//                     </select>

//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Gallery;

