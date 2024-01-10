import React, { useContext, useState } from 'react';
import { AuthContext } from "./AuthContext";

function ContactUs() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { isLoggedIn } = useContext(AuthContext);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setFormErrors({ // this code initializes form error state
            ...formErrors,
            [e.target.name]: ''
        });
        setErrorMessage(''); // this code initializes error message state
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.firstName.trim()) errors.firstName = 'First name cannot be empty.';
        if (!formData.lastName.trim()) errors.lastName = 'Last name cannot be empty.';
        if (!formData.email.trim()) errors.email = 'Email cannot be empty.';
        if (!formData.message.trim()) errors.message = 'Message cannot be empty.';
        return errors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length === 0 && isLoggedIn) {
            try {
                const response = await fetch('/contact_us', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
    
                const responseData = await response.json();
    
                if (response.ok) {
                    setSuccessMessage('Thank you for contacting us. We will be in touch shortly.');
                    setFormData({ firstName: '', lastName: '', email: '', message: '' }); // code to reset form
                } else {
                    setErrorMessage('Failed to submit message. Please try again.'); 
                }
            } catch (error) {
                setErrorMessage('Failed to submit message. Please try again.');
            }
        } else if (!isLoggedIn) {
            setErrorMessage('You must log in to submit a message'); // Sets the error message if user not logged in
            return; //empty return so as to prevent execution
        }
    };

    return (
        <div className="contactus">
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
                {/* Display success or error message(s) if any */}
                {successMessage && <div className="success-message">{successMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <label>
                    First Name:
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                    {formErrors.firstName && <div className="error-message">{formErrors.firstName}</div>}
                </label>
                <label>
                    Last Name:
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                    {formErrors.lastName && <div className="error-message">{formErrors.lastName}</div>}
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    {formErrors.email && <div className="error-message">{formErrors.email}</div>}
                </label>
                <label>
                    Message:
                    <textarea name="message" value={formData.message} onChange={handleChange}></textarea>
                    {formErrors.message && <div className="error-message">{formErrors.message}</div>}
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ContactUs;

