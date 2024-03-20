import React from 'react';
import { NavLink } from "react-router-dom";

const Guide = () => {
    // Step headers
    const stepHeaders = [
        "Step 1: Create a Game Plan",
        "Step 2: Research for Parts",
        "Step 3: Prepare a Workspace",
        "Step 4: Gather Materials & Tools",
        "Step 5: Assemble and Secure the Parts",
        "Step 6: Install the Battery & Electrical Components",
        "Step 7: Establish the wiring connections",
        "Step 8: Configure the Electronics",
        "Step 9: Test Run and Fine Tuning"
    ];

    // Step descriptions
    const stepDescriptions = [
        "So you've been wanting to make an electric skateboard for quite some time now but " +
        "you don't know where to start. Well, the first thing to do is to make a game plan " +
        "that documents the expected process of your build." +
        "This means designing and drawing out sketches, jotting down any ideas that pop into mind, and doing research " +
        "on electric skateboards. This is a must in your e-board building journey and we cannot stress" +
        "how important it is. Once you have a game plan and a design in mind, you can then move on to researching for parts.", //Step 1
        "This is one of the most crucial steps in your eboard building process: selecting for parts. A top performing" +
        "and reliable eboard depends on the material that it is built from. This is the step that requires the most time" +
        "and researh on. Higher quality parts means less time spent on fixing breakdowns and more time riding." +
        "We always advicenew builders to take this step seriously and select reputable parts.", //Step 2
        "Description for Step 3: Further details...", //Step 3
        "Description for Step 4...", //Step 4
        "Description for Step 5...", //Step 5
        "Description for Step 6...", //Step 6
        "Description for Step 7...", //Step 7
        "Description for Step 8...", //Step 8
        "Description for Step 9..." //Step 9
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

