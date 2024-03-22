import React from "react";

function RulesAndPolicies() {
    return (
        <div className="rulesandpolicies">
            <h1 className="rulesandpolicies-title" style={{ whiteSpace: 'pre-wrap' }}>
                Rules & Policies {'\n'}
            </h1>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                Rules and Policies text here.{'\n'}{'\n'}
            </span>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                Rules and Policies text here.{'\n'}{'\n'}
            </span>
            <div className="footer-bottom">
                <NavLink className="footer-bottom-link" to="/about">About</NavLink>
                <NavLink className="footer-bottom-link" to="/contactus">Contact Us</NavLink>
                <NavLink className="footer-bottom-link" to="/donations">Donations</NavLink>
                <NavLink className="footer-bottom-link" to="/disclaimers">Disclaimers</NavLink>
                <NavLink className="footer-bottom-link" to="/policies">Rules & Policies</NavLink>
            </div>
        </div>
    )
}

export default RulesAndPolicies;
