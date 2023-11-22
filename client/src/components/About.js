import React from "react";

function About() {
    return (
      <div className="about">
        <h5>Welcome to the DIY Electric Skateboard Guide: Unleash Your Potential and Skate like a Pro!</h5>
        <span style={{ whiteSpace: 'pre-wrap' }}>
          Are you ready to elevate your skateboarding experience to a whole new level?{'\n'}
        </span>
        <span id="special-font" style={{ whiteSpace: 'pre-wrap' }}>
          Well, look no further!{'\n'}
        </span>
        <span style={{ whiteSpace: 'pre-wrap' }}>
          Our DIY Electric Skateboard Guide is your gateway to the exciting world 
          of crafting your own electric-powered ride. Whether you're a seasoned skateboarder seeking an 
          electrifying upgrade or a DIY enthusiast eager to embark on a thrilling project, this is the place for you.{'\n'}
        </span>
        <div className="about_collage">
          put collage image here!
          <img src="" alt="DIY_collage" className="src" />
        </div>
      </div>
    );
}

export default About;

