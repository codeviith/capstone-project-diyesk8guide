import React, { useState } from 'react';

function ContactUs() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Log the form data for debugging purposes
        console.log('Form Data:', formData);

        try {
            // Make a POST request to the Flask backend
            const response = await fetch('/contact_us', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Parse the JSON response from the server
            const responseData = await response.json();

            if (response.ok) {
                console.log('Success:', responseData);
                // Handle successful form submission (e.g., display a success message, clear form, etc.)
            } else {
                console.log('Failed:', responseData);
                // Handle errors (e.g., display error message)
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle network errors or unexpected issues
        }
    };

    return (
        <div className="contactus">
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                </label>
                <label>
                    Last Name:
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
                <label>
                    Message:
                    <textarea name="message" value={formData.message} onChange={handleChange}></textarea>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ContactUs;
