import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import DIY_collage from './images/p5 project collage.jpg';

const Home = () => {
  return (
  <div className='home'>
    <div className="intro">
        <h5>Welcome to DIYesk8Guide: Your Gateway to DIY Electric Skateboard Builds!</h5>
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
          <div className="intro_collage">
            <img src={DIY_collage} alt="DIY_collage" className="collage" />
          </div>
    </div>

    <div className="component-description">
      <h2>Generate</h2>
      <p>This feature allows users to create custom skateboard builds based on their preferences. Click below to start building your dream skateboard!</p>
      <Link to="/generate">Go to Generate</Link>
    </div>

    <div className="component-description">
      <h2>Guru</h2>
      <p>Have questions about electric skateboards? Our Esk8 Guru is here to help. Ask any questions and get expert advice!</p>
      <Link to="/guru">Go to Guru</Link>
    </div>

    <div className="component-description">
      <h2>Q&A Forum</h2>
      <p>Join our Q&A Forum to discuss and share insights with the skateboarding community. Dive into discussions now!</p>
      <Link to="/qna">Go to Q&A Forum</Link>
    </div>
  </div>
  );
};

export default Home;


