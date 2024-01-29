import React from 'react';
import { NavLink } from "react-router-dom";

const Guide = () => {
    // Step headers
    const stepHeaders = [
        "Step 1: Have a Game Plan",
        "Step 2: Make a Design",
        "Step 3: Research for Parts",
        "Step 4: ",
        "Step 5: ",
        "Step 6: ",
        "Step 7: ",
        "Step 8: "
    ];

    // Step descriptions
    const stepDescriptions = [
        "So you've been wanting to make an electric skateboard for quite some time now but " +
        "you don't know where to start. Well, the first thing to do is to make a game plan " +
        "that documents the steps to your build process with questions and answers. For example, " +
        "you might start the first step with a quick sketch of the board you wish to build. Then " +
        "you can start asking questions " +
        "This means drawing sketches, jotting down any ideas that pop into mind, and doing research " +
        "on electric skateboards. Once you feel ready enough, you can start making a game plan " +
        "that documents each step of build process. This is a must in your e-board building " +
        "journey—I cannot stress this enough on how important it is. In the next few steps, we will " +
        "discuss a few basic steps to get started.",
        "Description for Step 2: Additional information...",
        "Description for Step 3: Further details...",
        "Description for Step 4...",
        "Description for Step 5...",
        "Description for Step 6...",
        "Description for Step 7...",
        "Description for Step 8..."
    ];

    // Step href links
    const stepLinks = [
        "/link-for-step-1",
        "/link-for-step-2",
        "/link-for-step-3",
        "/link-for-step-4",
        "/link-for-step-5",
        "/link-for-step-6",
        "/link-for-step-7",
        "/link-for-step-8"
    ];

    return (
        <div className="guide">
            <h1>Quick Start Guide</h1>
            {stepHeaders.map((header, index) => (
                <div key={index} className="guide-step">
                    <h2>{header}</h2>
                    <div className="guide-content">
                        <p>{stepDescriptions[index]}</p>
                        {/* Hyperlink for each step */}
                        <a className='href-link' href={stepLinks[index]} target="_blank" rel="noopener noreferrer">Learn more</a>
                    </div>
                </div>
            ))}
            {/* <div className="footer-bottom">
                <NavLink className="footer-bottom-link" to="/about">About</NavLink>
                <NavLink className="footer-bottom-link" to="/contactus">Contact Us</NavLink>
            </div> */}
        </div>
    );
};

export default Guide;
