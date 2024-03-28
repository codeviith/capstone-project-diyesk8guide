import React from "react";
import { NavLink } from 'react-router-dom';

function RulesAndPolicies() {
    return (
        <div className="rulesandpolicies">
            <h1 className="rulesandpolicies-title" style={{ whiteSpace: 'pre-wrap' }}>
                Rules & Policies{'\n'}{'\n'}
            </h1>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                Welcome to DIYesk8Guide! Our platform is designed to empower and inspire builders of electric skateboards by providing resources,
                tools, and a community for sharing experiences and creations. To ensure a positive and safe experience for all users, we have
                established the following rules and policies. By accessing and using DIYesk8Guide, you agree to comply with these
                guidelines.{'\n'}{'\n'}
            </span>
            <strong>
                General Conduct
            </strong>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                <ul>
                    Respectful Interaction: Users are expected to interact with others respectfully. Harassment, bullying, and hate speech are
                    strictly prohibited. We are a diverse community of builders and enthusiasts, and respect for each other is
                    paramount.{'\n'}{'\n'}
                    Accuracy of Information: While sharing advice or information, please ensure it is accurate and helpful. Misleading or false
                    information is harmful to our community’s learning experience.{'\n'}{'\n'}
                    Legal Compliance: Users must comply with all local, national, and international laws while using the site. This includes,
                    but is not limited to, copyright and intellectual property rights laws.{'\n'}{'\n'}
                </ul>
            </span>
            <strong>
                Gallery Content Guidelines
            </strong>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                The Gallery is a showcase for your electric skateboard projects. To maintain a supportive and inspiring environment, we ask that
                you follow these content guidelines:{'\n'}{'\n'}
            </span>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                Relevance: Only post content that is directly related to electric skateboard building. The Gallery is not a space for unrelated 
                images or discussions.{'\n'}{'\n'}
                Prohibited Content: The following types of content are strictly prohibited and will be removed:{'\n'}{'\n'}
            </span>
            <strong>
                General Disclaimer
            </strong>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                Rules and Policies text here{'\n'}{'\n'}
            </span>
            <strong>
                General Disclaimer
            </strong>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                Rules and Policies text here{'\n'}{'\n'}
            </span>
            <strong>
                General Disclaimer
            </strong>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                Rules and Policies text here{'\n'}{'\n'}
            </span>
            <strong>
                General Disclaimer
            </strong>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                Rules and Policies text here{'\n'}{'\n'}
            </span>
            <strong>
                General Disclaimer
            </strong>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                Rules and Policies text here{'\n'}{'\n'}
            </span>
            <strong>
                General Disclaimer
            </strong>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                Rules and Policies text here{'\n'}{'\n'}
            </span>
            <div className="footer-bottom">
                <NavLink className="footer-bottom-link" to="/about">About</NavLink>
                <NavLink className="footer-bottom-link" to="/contact-us">Contact Us</NavLink>
                <NavLink className="footer-bottom-link" to="/donations">Donations</NavLink>
                <NavLink className="footer-bottom-link" to="/disclaimers">Disclaimers</NavLink>
                <NavLink className="footer-bottom-link" to="/rules-and-policies">Rules & Policies</NavLink>
            </div>
        </div>
    )
}

export default RulesAndPolicies;
