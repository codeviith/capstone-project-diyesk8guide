import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

import DIY_collage from "./images/p5 project collage.jpg";

const Home = () => {
  return (
    <div className="home">
      <div className="intro">
        <h5>
          Welcome to DIYesk8Guide: Your Gateway to DIY Electric Skateboard
          Builds!
        </h5>
        <span style={{ whiteSpace: "pre-wrap" }}>
          Are you ready to elevate your skateboarding experience to a whole new
          level?{"\n"}
        </span>
        <span id="special-font1" style={{ whiteSpace: "pre-wrap" }}>
          Well, look no further!{"\n"}
        </span>
        <span style={{ whiteSpace: "pre-wrap" }}>
          Our DIY Electric Skateboard Guide is your gateway to the exciting
          world of crafting your own electric-powered ride. Whether you're a
          seasoned skateboarder seeking an electrifying upgrade or a DIY
          enthusiast eager to embark on a thrilling project, this is the place
          for you.{"\n"}
        </span>
        <span id="special-font2" style={{ whiteSpace: "pre-wrap" }}>
          So unleash your potential and build like a PRO!
        </span>
        <div className="intro_collage">
          <img src={DIY_collage} alt="DIY_collage" className="collage" />
        </div>
      </div>

      <div className="component-description">
        <h2>Generate</h2>
        <p>
          This feature allows users to create custom skateboard builds based on
          their preferences. Click below to start building your dream
          skateboard!
        </p>
        <Link to="/generate">Go to Generate</Link>
      </div>

      <div className="component-description">
        <h2>Guru</h2>
        <p>
          Have questions about electric skateboards? Our Esk8 Guru is here to
          help. Ask any questions and get expert advice!
        </p>
        <Link to="/guru">Go to Guru</Link>
      </div>

      <div className="component-description">
        <h2>Gallery</h2>
        <p>
          Got a board to share? Feel free to post it in the Gallery and inspire
          other new builders in the community! Top 3 voted builds will be
          displayed in the Hall of Fame!
        </p>
        <Link to="/gallery">Go to Gallery</Link>
      </div>
      <div className="footer-bottom">
        <NavLink className="footer-bottom-link" to="/about">About</NavLink>
        <NavLink className="footer-bottom-link" to="/contactus">Contact Us</NavLink>
      </div>
    </div>
  );
};

export default Home;
