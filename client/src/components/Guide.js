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
        //Step 1
        "So you've been wanting to make an electric skateboard for quite some time now but you don't know where to start. " +
        "Well, the first thing to do is to make a game plan that documents the expected process of your build. " +
        "This means designing and drawing out sketches, jotting down any ideas that pop into mind, and doing research " +
        "on electric skateboards. This is a must in your e-board building journey and we cannot stress " +
        "how important it is. Once you have a game plan and a design in mind, you can then move on to researching for parts. ",
        //Step 2
        "This is one of the most crucial steps in your eboard building process. A top performing " +
        "and reliable eboard depends on the material that it is built from. This is the step that requires the most time " +
        "and researh on. Higher quality parts equates to less time spent on fixing breakdowns and more time riding. " +
        "We always advice new builders to take this step seriously and purchase the parts from merchants you can trust.",
        //Step 3
        "Once you have decided on the design and purchased the parts for your build, the next step is to establish a distraction-" +
        "free, if possible, workshop where you will spend the next few weeks, or even months, planning, building, and testing your " +
        "board. Generally, a large tabletop complemented with a rolling stool and quick access to tools and/or machineries would " +
        "be sufficient. As a word of caution, please make sure the workshop is well ventilated as you will be working with wood/metal " +
        "dust and solder fumes throughout the build. Please remember that safety should always be your number one priority.",
        //Step 4
        "", // See JSX for the content.
        //"list of tools here...and maybe with pictures??? not sure yet",
        //Step 5
        "Now here is the exciting part. This is where we put together the board and witness our creation coming to life. What was only " +
        "an idea a moment ago, now takes shape and form right in front of your eyes. And the key to making this step succesful is adequate securement. " +
        "Recommended materials include but not limited to: nails, machine screws, threaded inserts, nuts and bolts, CA glue, staples, rivets, etc. " +
        "Because the board is subjected to vibrations of the road, it is always best practice to use machine screws or nuts and bolts. For parts that needs " +
        "extra security, it is best to apply some locktite to the threads, or use a nylon nut. Applying these extra measures of security to make sure " +
        "the parts stay attached to your board will reduce the chances of breakdowns during the ride.",
        //Step 6
        "By the time you reach this step, the board is about 70% completed. All that's left is installing and configuring the electronics. But before " +
        "that, we need to first install the battery and all the electrical components, i.e ESC, anti-spark toggle switch, R/C reciever, etc. We strongly " +
        "advise on taking pre-cautionary measures to prevent damage to the battery upon riding. This include making sure that " +
        "the battery is securely sesated inside a hardened and durable enclosure, e.g carbon fiber. This will help prevent damage to the battery should the " +
        "board encounter rough terrains. ", // prob need to shorten this and clarify some more stuff.
        //Step 7
        "Description for Step 7...",
        //Step 8
        "Description for Step 8...",
        //Step 9
        "Description for Step 9..."
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
                        {/* If index is 3, which is equivalent to step 4, then split and add <br /> after quote */}
                        {index === 3 ? (
                            <p>
                                {"'Man is a tool-using animal. Without tools he is nothing, with tools he is all.' ~Thomas Carlyle."}
                                <br />
                                {"This is yet another important step in the eboard journey. Having the right tools and materials is what sets " +
                                "apart a successful project versus an unsuccessful one. Here are a few of the recommended tools for starters: "}
                            </p>
                        ) : (
                            <p>{stepDescriptions[index]}</p>
                        )}
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

