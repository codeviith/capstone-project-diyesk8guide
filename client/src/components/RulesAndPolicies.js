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
            <span>
                <ul>
                    <li>Respectful Interaction: Users are expected to interact with others respectfully. Harassment, bullying, and hate speech are
                        strictly prohibited. We are a diverse community of builders and enthusiasts, and respect for each other is
                        paramount.</li>
                    <li>Accuracy of Information: While sharing advice or information, please ensure it is accurate and helpful. Misleading or false
                        information is harmful to our community’s learning experience.</li>
                    <li>Legal Compliance: Users must comply with all local, national, and international laws while using the site. This includes,
                        but is not limited to, copyright and intellectual property rights laws.</li>
                </ul>
            </span>
            <strong>
                Gallery Content Guidelines
            </strong>
            <span>
                The Gallery is a showcase for your electric skateboard projects. To maintain a supportive and inspiring environment, we ask that
                you follow these content guidelines:
            </span>
            <span>
                <ul>
                    <li>
                        Relevance: Only post content that is directly related to electric skateboard building. The Gallery is not a space for unrelated
                        images or discussions.
                    </li>
                    <li>
                        Prohibited Content: The following types of content are strictly prohibited and will be removed:
                        <ol>
                            <li>
                                Unlawful Content: Any content that promotes illegal activities or violates laws.
                            </li>
                            <li>
                                Explicit Content: Pornography, graphic violence, or any other adult content.
                            </li>
                            <li>
                                Hateful Content: Anything promoting hate speech, discrimination, or violence against individuals or groups based on
                                race, ethnicity, religion, gender, sexual orientation, disability, or any other characteristics.
                            </li>
                            <li>
                                Personal Information: Do not share personal information, either yours or someone else’s. This includes, but is not
                                limited to, addresses, phone numbers, and email addresses.
                            </li>
                            <li>
                                Copyrighted Material: Only upload images that you own or have the right to use. By submitting content, you are
                                responsible for ensuring that it does not infringe on the copyrights or rights of others.
                            </li>
                        </ol>
                    </li>
                    <li>
                        Reporting Violations: If you encounter any content that violates these guidelines, please use the report function to alert
                        our moderators. We are committed to taking appropriate actions, which may include removing content or suspending user accounts.
                    </li>
                </ul>
            </span>
            <strong>
                Privacy Guidelines
            </strong>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                Protecting your privacy and the privacy of others is essential. Please refrain from posting private information in any public areas
                of the site, including the Gallery. Be mindful of the information you share and consider the potential risks involved in disclosing
                personal details.{'\n'}{'\n'}
            </span>
            <strong>
                Policy Enforcement
            </strong>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                Violation of these rules and policies may result in content removal, account suspension, or other actions deemed necessary to ensure
                the safety and integrity of our community. We reserve the right to enforce these policies at our discretion and to modify them at
                any time.{'\n'}{'\n'}
            </span>
            <strong>
                Contact Us
            </strong>
            <span style={{ whiteSpace: 'pre-wrap' }}>
                If you have questions about these rules and policies or need to report a violation, please contact
                us <NavLink className="contactus-href" to="/contact-us">here</NavLink>. Your feedback is important to us as we
                strive to create a welcoming and safe environment for all users.{'\n'}{'\n'}
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
