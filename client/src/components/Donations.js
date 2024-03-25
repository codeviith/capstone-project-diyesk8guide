import React from "react";
import { NavLink } from 'react-router-dom';

function Donations() {
    return (
        <div className="donation">
            <h1 className="donation-title" style={{ whiteSpace: 'pre-wrap' }}>
                Support the Future of E-Board Building: Contribute Today {'\n'}
            </h1>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                Join us today in shaping the future of the DIY electric skateboard community! Your support is crucial in nurturing a sustainable and vibrant community where creativity soars and knowledge flows freely. Every contribution you make fuels our mission, directly impacting our ability to educate, inspire, and empower. Your donations drive the enhancement and longevity of our platform, facilitating future upgrades of sophisticated AI-powered tools, improved dynamic builders' gallery, and more advanced build generator. These improvements are designed to enrich the user experience and expand access to valuable knowledge.{'\n'}{'\n'}
            </span>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                By supporting our cause, you do more than contribute to a website; you play a pivotal role in fostering a culture of innovation and mutual growth within the DIY e-boarding world. Together, we are broadening the horizons for electric skateboard building, making it more accessible and enjoyable for everyone. Your support ensures that the spirit of DIY and creativity not only survives but thrives.{'\n'}{'\n'}
            </span>
            <div className="donation-button-container">
                <h2>Thank You for Your Support</h2>
                <p>Please click the button below. You will be redirected to a secured external site.</p>
                <a href="https://pay.diyesk8guide.com/" className="donation-button" target="_blank" rel="noopener noreferrer">Make a Donation</a>
                <div className="footer-bottom">
                    <NavLink className="footer-bottom-link" to="/about">About</NavLink>
                    <NavLink className="footer-bottom-link" to="/contact-us">Contact Us</NavLink>
                    <NavLink className="footer-bottom-link" to="/donations">Donations</NavLink>
                    <NavLink className="footer-bottom-link" to="/disclaimers">Disclaimers</NavLink>
                    <NavLink className="footer-bottom-link" to="/rules-and-policies">Rules & Policies</NavLink>
                </div>
            </div>
        </div>
    );
}

export default Donations;