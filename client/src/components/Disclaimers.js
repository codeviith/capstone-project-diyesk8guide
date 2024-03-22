import React from "react";
import { NavLink } from 'react-router-dom';

function Disclaimers() {
    return (
        <div className="disclaimers">
            <h1 className="disclaimers-title" style={{ whiteSpace: 'pre-wrap' }}>
                Disclaimers {'\n'}
            </h1>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                disclaimer text here.{'\n'}{'\n'}
            </span>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                disclaimer text here.{'\n'}{'\n'}
            </span>
            <div className="footer-bottom">
                <NavLink className="footer-bottom-link" to="/about">About</NavLink>
                <NavLink className="footer-bottom-link" to="/contact-us">Contact Us</NavLink>
                <NavLink className="footer-bottom-link" to="/donations">Donations</NavLink>
                <NavLink className="footer-bottom-link" to="/rules-and-policies">Rules & Policies</NavLink>
            </div>
        </div>
    )
}

export default Disclaimers;
