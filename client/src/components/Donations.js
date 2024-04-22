import React from "react";
import { NavLink } from 'react-router-dom';

function Donations() {
    return (
        <div className="donation">
            <h1 className="donation-title" style={{ whiteSpace: 'pre-wrap' }}>
                Support the Future of E-Board Building: Contribute Today {'\n'}
            </h1>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                Our community thrives on collaboration and innovation, and your support plays a vital role in sustaining this spirit. By contributing, you help us maintain and expand the resources and tools essential for the DIY electric skateboard enthusiasts. Your donations ensure that everyone, from beginners to experienced builders, has access to the best possible information and a dynamic platform for sharing their passion and creations.{'\n'}{'\n'}
            </span>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                More than just maintaining the site, your contributions help push the boundaries of what we can offer. It enables us to innovate and enhance our platform, enriching our community with invaluable skills and knowledge and ensuring that the art of DIY e-boarding reaches its full potential.{'\n'}{'\n'}
            </span>
            <div className="donation-button-container">
                <h2>Thank You for Your Support</h2>
                <p>Please click the link below. You will be redirected to a secured external site.</p>
                <a href="https://pay.diyesk8guide.com/" className="donation-button" target="_blank" rel="noopener noreferrer">Make a Donation</a>
                <div className="footer-bottom-donation">
                    <NavLink className="footer-bottom-link-donation" to="/about">About</NavLink>
                    <NavLink className="footer-bottom-link-donation" to="/contact-us">Contact Us</NavLink>
                    <NavLink className="footer-bottom-link-donation" to="/donations">Donations</NavLink>
                    <NavLink className="footer-bottom-link-donation" to="/disclaimers">Disclaimers</NavLink>
                    <NavLink className="footer-bottom-link-donation" to="/rules-and-policies">Rules & Policies</NavLink>
                </div>
            </div>
        </div>
    );
}

export default Donations;