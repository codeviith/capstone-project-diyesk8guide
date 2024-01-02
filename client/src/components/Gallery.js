import React, { useState, useEffect } from 'react';

function Gallery() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [dropdowns, setDropdowns] = useState({ menu1: '', menu2: '', menu3: '', menu4: '', menu5: '' });
    const [galleryItems, setGalleryItems] = useState([]);

    useEffect(() => {
        const fetchGalleryItems = async () => {
            try {
                const response = await fetch('/gallery');
                const data = await response.json();
                setGalleryItems(data);
            } catch (error) {
                console.error('Error fetching gallery items:', error);
            }
        };

        fetchGalleryItems();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        } else {
            setImage(null);
            setPreview('');
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

        // Send data to Flask backend
        const response = await fetch('/gallery', {
            method: 'POST',
            body: formData,
        });
        const responseData = await response.json();
        // Refresh gallery items after submission
        setGalleryItems([...galleryItems, responseData]);
    };

    return (
        <div className="gallery-container">
            {/* Gallery items section */}
            <div className="gallery-items">
                {galleryItems.map((item, index) => (
                    <div key={index} className="gallery-item">
                        <img src={`images/${item.image_filename}`} alt={item.image_filename} />
                        <div className="item-details">
                            <p>Menu 1: {item.menu1}</p>
                            <p>Menu 2: {item.menu2}</p>
                            <p>Menu 3: {item.menu3}</p>
                            <p>Menu 4: {item.menu4}</p>
                            <p>Menu 5: {item.menu5}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Floating form section */}
            <div className="floating-form">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    <br />
                    {[1, 2, 3, 4, 5].map(num => (
                        <select key={num} name={`menu${num}`} value={dropdowns[`menu${num}`]} onChange={handleDropdownChange}>
                            <option value="">Select Option</option>
                            <option value="Option1">Option 1</option>
                            <option value="Option2">Option 2</option>
                            <option value="Option3">Option 3</option>
                            <option value="Option4">Option 4</option>
                        </select>
                    ))}
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}



export default Gallery;
























































// import React, { useState, useEffect } from 'react';

// function Gallery() {
//     const [image, setImage] = useState(null);
//     const [dropdowns, setDropdowns] = useState({ menu1: '', menu2: '', menu3: '', menu4: '', menu5: '' });
//     const [galleryItems, setGalleryItems] = useState([]); // State to store uploaded pictures


//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file && file.type.startsWith('image/')) {
//             setImage(file);
//             setPreview(URL.createObjectURL(file));
//         } else {
//             setImage(null);
//             setPreview('');
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
//         const responseData = await response.json();
//         // console.log(responseData);
//     };

//     return (
//         <div className="gallery">
//             <form onSubmit={handleSubmit} encType="multipart/form-data">
//                 <input type="file" accept="image/*" onChange={handleImageChange} />
//                 <br />

//                 {[1, 2, 3, 4, 5].map(num => (
//                     <select key={num} name={`menu${num}`} value={dropdowns[`menu${num}`]} onChange={handleDropdownChange}>
//                         <option value="">Select Option</option>
//                         <option value="Option1">Option 1</option>
//                         <option value="Option2">Option 2</option>
//                         <option value="Option3">Option 3</option>
//                         <option value="Option4">Option 4</option>
//                     </select>
//                 ))}

//                 <br />
//                 <button type="submit">Submit</button>
//             </form>

//             {/* Display gallery items */}
//             <div className="gallery-items">
//                 {galleryItems.map((item, index) => (
//                     <div key={index} className="gallery-item">
//                         <img src={item.image} alt="Gallery item" />
//                         <div>
//                             {Object.entries(item.dropdowns).map(([key, value]) => (
//                                 <p key={key}>{`${key}: ${value}`}</p>
//                             ))}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Gallery;

