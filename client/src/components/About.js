import React from "react";

import DIY_collage from './images/100 percent.jpg';

function About() {
    return (
      <div className="about">
        <h5>Welcome to the DIY Electric Skateboard Guide: Your One-Stop Site for DIY Builds!</h5>
        <span style={{ whiteSpace: 'pre-wrap' }}>
          Are you ready to elevate your skateboarding experience to a whole new level?{'\n'}
        </span>
        <span id="special-font1" style={{ whiteSpace: 'pre-wrap' }}>
          Well, look no further!{'\n'}
        </span>
        <span style={{ whiteSpace: 'pre-wrap' }}>
          Our DIY Electric Skateboard Guide is your gateway to the exciting world 
          of crafting your own electric-powered ride. Whether you're a seasoned skateboarder seeking an 
          electrifying upgrade or a DIY enthusiast eager to embark on a thrilling project, this is the place for you.{'\n'}
        </span>
        <span id="special-font2" style={{ whiteSpace: 'pre-wrap' }}>
          So unleash your potential and build like a PRO!</span>
          <div className="about_collage">
            <img src={DIY_collage} alt="DIY_collage" className="collage" />
          </div>
      </div>
    );
}

export default About;

