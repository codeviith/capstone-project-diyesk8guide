import React from 'react';

const Guide = () => {
    // Step headers
    const stepHeaders = [
        "Step 1: Design and Make a Blueprint",
        "Step 2: ",
        "Step 3: ",
        "Step 4: ",
        "Step 5: ",
        "Step 6: ",
        "Step 7: ",
        "Step 8: "
    ];

    // Step descriptions
    const stepDescriptions = [
        "So you've been wanting to make an electric skateboard for quite some time now but " +
        "you don't know where to start. Well, the first thing to do is to design your board. " +
        "This means drawing sketches, jotting down ideas that pop into mind, and doing research " +
        "on electric skateboards. Once you feel ready enough, you can start making the blueprint, " +
        "which is basically just a few sheets of paper that has all your designs and ideas. " +
        "This is a must in your e-board building journey—I cannot stress this enough on how " +
        "important it is to make a blueprint.",
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
            <h1>Step-by-Step Guide</h1>
            {stepHeaders.map((header, index) => (
                <div key={index} className="guide-step">
                    <h2>{header}</h2>
                    <div className="guide-content">
                        <p>{stepDescriptions[index]}</p>
                        {/* Hyperlink for each step */}
                        <a href={stepLinks[index]} target="_blank" rel="noopener noreferrer">Learn more</a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Guide;
