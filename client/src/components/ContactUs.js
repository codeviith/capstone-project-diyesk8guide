import React, { useContext, useState } from 'react';
import { AuthContext } from "./AuthContext";
import { NavLink } from 'react-router-dom';

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

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:5555';


    const handleChange = (e) => {
        if (e.target.name === 'message' && e.target.value.length > 600) {
            return; // The empty return here is to prevent adding more characters once 600 limit is reached.
        }

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
                const response = await fetch(`${backendUrl}/contact_us`, {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    setSuccessMessage('Thank you for contacting us. We will be in touch shortly.');
                    setFormData({   // code to reset form
                        firstName: '',
                        lastName: '',
                        email: '',
                        message: ''
                    });
                } else {
                    setErrorMessage('Failed to submit message. Please try again.');
                }
            } catch (error) {
                setErrorMessage('Failed to submit message. Please try again.');
            }
        } else if (!isLoggedIn) {
            setErrorMessage('You must log in to submit a message');
            return;
        }
    };

    const getCharacterCountStyle = () => {
        let color = 'inherit'; // "inherit" --> code to 'inherit' the current color
        const messageLength = formData.message.length;

        if (messageLength > 580) {
            color = 'darkred';
        } else if (messageLength > 500) {
            color = 'yellow';
        }

        return {
            fontWeight: messageLength > 580 ? 'bold' : 'normal',
            color: color
        };
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
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        maxLength={600} // Code for 600 character limit
                    ></textarea>
                    {formErrors.message && <div className="error-message">{formErrors.message}</div>}
                    <div style={getCharacterCountStyle()}>
                        {formData.message.length}/600
                    </div>
                </label>
                <button type="submit">Submit</button>
            </form>
            <div className="footer-bottom">
                <NavLink className="footer-bottom-link" to="/about">About</NavLink>
                <NavLink className="footer-bottom-link" to="/contact-us">Contact Us</NavLink>
                <NavLink className="footer-bottom-link" to="/donations">Donations</NavLink>
                <NavLink className="footer-bottom-link" to="/disclaimers">Disclaimers</NavLink>
                <NavLink className="footer-bottom-link" to="/rules-and-policies">Rules & Policies</NavLink>
            </div>
        </div>
    );
}

export default ContactUs;

