import React, { useState } from 'react';

function Gallery() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [dropdowns, setDropdowns] = useState({ menu1: '', menu2: '', menu3: '', menu4: '', menu5: '' });

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
        console.log(responseData);
    };

    return (
        <div className="gallery">
            <form onSubmit={handleSubmit}>
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

            {preview && (
                <div className="preview-container">
                    <img src={preview} alt="Preview" />
                    <div>
                        {Object.entries(dropdowns).map(([key, value]) => (
                            <p key={key}>{`${key}: ${value}`}</p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Gallery;

