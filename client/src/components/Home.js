import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

import DIY_collage from "./images/p5 project collage.jpg";
import guideImage from "./images/guide_component_image.jpg";
import generateImage from "./images/generate_component_image.jpeg";
import guruImage from "./images/guru_component_image.jpg";
import galleryImage from "./images/gallery_component_image.jpg";


const Home = () => {
  return (
    <div className="home">
      <div className="intro">
        <h1>
          Welcome to DIYesk8Guide
        </h1>
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
          So unleash your potential and start building today!
        </span>
        <div className="intro_collage">
          <img src={DIY_collage} alt="DIY_collage" className="collage" />
        </div>
      </div>

      <div className="features">
        <h2>Introducing...</h2>
      </div>

      <div className="component-section">
        <div className="content-container">
          <div className="guide-component-image-container">
            <img className="component-image"
              src={guideImage}
              alt="Guide Section Image"
            />
          </div>
          <div className="text-container">
            <div className="component-header">
              <h3>Guide</h3>
            </div>
            <div className="description-container">
              <p>
                Are you stepping into the world of DIY electric skateboards for the first time? Our
                Quick Start Guide is the ideal place to embark on this exciting journey. This
                comprehensive section is designed to walk you through every phase of building your
                first electric skateboard. From handpicking the components to piecing them together
                into a fully operational skateboard, our guide lays down the groundwork in a
                step-by-step, easy-to-follow fashion. It is designed to equip you with the fundamentals
                of the build process, allowing you to tailor the build to your specific needs as you
                progress. Start your journey with confidence—our guide is here to lead the way!
              </p>
              <Link to="/guide">Go to Guide</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="component-section">
        <div className="component-header">
          <h3>Generate</h3>
        </div>
        <div className="content-container">
          <div className="generate-component-image-container">
            <img className="component-image"
              src={generateImage}
              alt="Generate Section Image"
            />
          </div>
          <div className="description-container">
            <p>
              Imagine having a tailored skateboard build that aligns perfectly with your
              preferences and needs. With our Generate feature, that's exactly what you'll get.
              It crafts a sample build for you, complete with detailed specs for each part.
              This way, you get a solid understanding of what to look for in your own creation,
              effectively minimizing time and money spent on trial and error.
            </p>
            <Link to="/generate">Go to Generate</Link>
          </div>
        </div>
      </div>

      <div className="component-section">
        <div className="component-header">
          <h3>Guru</h3>
        </div>
        <div className="content-container">
          <div className="guru-component-image-container">
            <img className="component-image"
              src={guruImage}
              alt="Guru Section Image"
            />
          </div>
          <div className="description-container">
            <p>
              Ever wished you had an expert by your side to answer all your electric skateboard queries
              instantly? Meet the Esk8 Guru, your AI-based companion that’s always ready to help. Unlike
              traditional forums where you might wait days for a response, our Esk8 Guru gives you the
              answers you need immediately. Specialized only in electric skateboards, Esk8 Guru ensures that
              the advice you receive is accurate and reliable, allowing you to proceed with your build with
              great confidence.
            </p>
            <Link to="/guru">Go to Guru</Link>
          </div>
        </div>
      </div>

      <div className="component-section">
        <div className="component-header">
          <h3>Gallery</h3>
        </div>
        <div className="content-container">
          <div className="gallery-component-image-container">
            <img className="component-image"
              src={galleryImage}
              alt="Gallery Section Image"
            />
          </div>
          <div className="description-container">
            <p>
              Dive into a vibrant community where your builds can shine and inspire. Not only is the Gallery
              a platform to share photos of your electric skateboard creations, but also a place where your
              work can be recognized and potentially land a spot of honor in the Hall of Fame. Here, the top 3
              liked photos will be displayed, providing you and new builders alike new ideas and perspectives
              for further customization.
            </p>
            <Link to="/gallery">Go to Gallery</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <NavLink className="footer-bottom-link" to="/about">About</NavLink>
        <NavLink className="footer-bottom-link" to="/contact-us">Contact Us</NavLink>
        <NavLink className="footer-bottom-link" to="/donations">Donations</NavLink>
        <NavLink className="footer-bottom-link" to="/disclaimers">Disclaimers</NavLink>
        <NavLink className="footer-bottom-link" to="/rules-and-policies">Rules & Policies</NavLink>
      </div>
    </div>
  );
};

export default Home;

