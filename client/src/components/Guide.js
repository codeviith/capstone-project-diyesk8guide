import React from 'react';

const Guide = () => {
    return (
        <div className="guide">
            <h1>Step-by-Step Guide</h1>
            {[...Array(8)].map((_, index) => (
                <div key={index} className="guide-step">
                    <h2>Step {index + 1}</h2>
                    <div className="guide-content">
                        <p>Content for Step {index + 1} (Text or Image Placeholder)</p>
                        {/* Hyperlink placeholder */}
                        <a href="/your-link-here" target="_blank" rel="noopener noreferrer">Learn more</a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Guide;

