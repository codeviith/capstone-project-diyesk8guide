import React, { useState, useContext } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import QuickStartGuide from './QuickStartGuide.js';
import AdvancedGuide from './AdvancedGuide';
import VideoTutorials from './VideoTutorials';
import CommunityInsights from './CommunityInsights';
import { faL } from '@fortawesome/free-solid-svg-icons';


const Guide = () => {
    const { isLoggedIn } = useContext(AuthContext); // Using useContext to access isLoggedIn
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [activeGuide, setActiveGuide] = useState(null);

    const handleMouseEnter = (menu) => {
        setActiveGuide(menu);
        setDropdownVisible(true);
    };

    const handleMouseLeave = () => {
        setDropdownVisible(false);
    }

    // if (!isLoggedIn) {
    //     return (
    //         <div className="login-prompt-container">
    //             <p>Please <NavLink to="/login">log in</NavLink> to access the Guide.</p>
    //         </div>
    //     );
    // }

    const QuickStartGuideSteps = [
        { header: "Step 1: Create a Game Plan" },
        { header: "Step 2: Research for Parts" },
        { header: "Step 3: Prepare a Workspace" },
        { header: "Step 4: Gather Materials & Tools" },
        { header: "Step 5: Assemble and Secure the Parts" },
        { header: "Step 6: Install the Battery & Electrical Components" },
        { header: "Step 7: Establish Wiring Connections" },
        { header: "Step 8: Configure the Electronics" },
        { header: "Step 9: Test Run and Fine Tuning" },
        { header: "Step 10: The Open Road Awaits!" }
    ];


    return (
        <div className="guide-menubar-container">
            <div className="guide-menubar">
                <div onMouseEnter={() => handleMouseEnter('basic')}
                    onMouseLeave={handleMouseLeave}>
                    <NavLink to="/guide/basic">Basic Guide</NavLink>
                    {dropdownVisible && activeGuide === 'basic' && (
                        <div className="guide-dropdown-menu">
                            {QuickStartGuideSteps.map((step, index) => (
                                <NavLink key={index} to={`/guide/basic#${encodeURIComponent(step.header)}`}>
                                    {step.header}
                                </NavLink>
                            ))}
                        </div>
                    )}
                </div>
                <NavLink to="/guide/advanced">Advanced Guide</NavLink>
                <NavLink to="/guide/videos">Video Tutorials</NavLink>
                <NavLink to="/guide/community">Community Insights</NavLink>
            </div>
            <div className="guide-menubar-content">
                <Switch>
                    <Route path="/guide" exact component={QuickStartGuide} />
                    <Route path="/guide/basic" component={QuickStartGuide} />
                    <Route path="/guide/advanced" component={AdvancedGuide} />
                    <Route path="/guide/videos" component={VideoTutorials} />
                    <Route path="/guide/community" component={CommunityInsights} />
                </Switch>
            </div>
        </div>
    );
};

export default Guide;
