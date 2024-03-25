import React from "react";
import { NavLink } from 'react-router-dom';

function About() {
  return (
    <div className="about">
      <h1 className="about-title" style={{ whiteSpace: 'pre-wrap' }}>
        About DIYesk8Guide {'\n'}
      </h1>
      <span style={{ whiteSpace: 'pre-wrap' }}>
        Crafted with passion by skateboard enthusiasts, DIYesk8Guide is designed to provide beginners with the essential knowledge and skills needed to construct their own electric skateboard from the ground up. Our foundation is a deep-seated love for e-boarding, coupled with a strong desire to empower others to experience the thrill and satisfaction of crafting their own electric ride.{'\n'}{'\n'}
      </span>
      <span style={{ whiteSpace: 'pre-wrap' }}>
        Here at DIYesk8Guide, you'll find carefully curated guides and practical build samples, all supported by an intuitive AI assistant (aka. Guru). Our resources are strategically structured to establish a strong base, leading you step-by-step from initial basics to achieving your first accomplished build.{'\n'}{'\n'}
      </span>
      <div className="contact-us">
        <h2>Questions or Concerns?</h2>
        <p>Please don't hesitate to reach out to us with questions or feedbacks.</p>
        <NavLink className="navlink-button" to="/contact-us">Contact Us</NavLink>
      </div>
      <div className="footer-bottom">
        <NavLink className="footer-bottom-link" to="/contact-us">Contact Us</NavLink>
        <NavLink className="footer-bottom-link" to="/donations">Donations</NavLink>
        <NavLink className="footer-bottom-link" to="/disclaimers">Disclaimers</NavLink>
        <NavLink className="footer-bottom-link" to="/rules-and-policies">Rules & Policies</NavLink>
      </div>
    </div>
  );
}

export default About;
