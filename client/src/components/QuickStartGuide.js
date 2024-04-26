import React, { useRef, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';

const QuickStartGuide = () => {
    const location = useLocation();
    const stepsRef = {
        "Step 1: Create a Game Plan": useRef(null),
        "Step 2: Research for Parts": useRef(null),
        "Step 3: Prepare a Workspace": useRef(null),
        "Step 4: Gather Materials & Tools": useRef(null),
        "Step 5: Assemble and Secure the Parts": useRef(null),
        "Step 6: Install the Battery & Electrical Components": useRef(null),
        "Step 7: Establish the wiring connections": useRef(null),
        "Step 8: Configure the Electronics": useRef(null),
        "Step 9: Test Run and Fine Tuning": useRef(null)
    };

    useEffect(() => {
        const step = decodeURIComponent(location.hash.replace("#", ""));
        if (step && stepsRef[step] && stepsRef[step].current) {
            stepsRef[step].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [location]);

    const guideSteps = [
        {
            header: "Step 1: Create a Game Plan",
            description: "Embarking on building your electric skateboard begins with a solid game plan. This initial step requires you to sketch out your design, brainstorm ideas, and conduct thorough research on electric skateboards. Consider this phase a prime opportunity to craft a board that excels in performance and reflects your personal style and ethos. A well-thought-out plan is crucial—it guides you through the build process and ensures your goals are realistic and achievable. With a clear plan and design in hand, you'll be poised to move forward confidently in selecting the appropriate components. Excited yet? Let's dive in!",
            
            
            
// "Ready to start building your electric skateboard but not sure where to begin? Well, the first step is to make a game plan. " +
// "This step involves outlining your design, capturing any ideas that spring to mind, and conducting extensive research on electric " +
// "skateboards. View this phase as a golden opportunity to design a board that not only performs well but also mirrors your personal style " +
// "and ethos. Having this blueprint is vital—it not only navigates you through the building process but also helps ensure your goals and " +
// "expectations are achievable.With a clear plan and design ready, you’ll be well- prepared to proceed with the build and select the right " +
// "parts you need. Starting to feel the excitement? I know I am! Let's get started!",
            link: "/link-for-step-1"
        },
        {
            header: "Step 2: Research for Parts",
            description: "This is one of the most crucial steps in your eboard building process. A top performing " +
                "and reliable eboard depends on the material that it is built from. This is the step that requires the most time " +
                "and researh on. Higher quality parts equates to less time spent on fixing breakdowns and more time riding. " +
                "We always advice new builders to take this step seriously and purchase the parts from merchants you can trust.",
            list: [
                "Deck",
                "Wheels (urathane or pneumatics)",
                "Trucks (the wider the truck is, the more stable the board)",
                "Motor Controller (aka. Electronic Speed Controller, or ESC)",
                "Battery (typically 10s or above)",
                "Remote Controller (2.4 Ghz is recommended)",
                "Motor and wheel pulleys",
                "Motor mount",
                "Timing belt",
                "Enclosure (carbon fiber for highest durability)"
            ],
            link: "/link-for-step-2"
        },
        {
            header: "Step 3: Prepare a Workspace",
            description: "Once you have decided on the design and purchased the parts for your build, the next step is to establish a distraction-" +
                "free, if possible, workshop where you will spend the next few weeks, or even months, planning, building, and testing your " +
                "board. Generally, a large tabletop complemented with a rolling stool and quick access to tools and/or machineries would " +
                "be sufficient. As a word of caution, please make sure the workshop is well ventilated as you will be working with wood/metal " +
                "dust and solder fumes throughout the build. Please remember that safety should always be your number one priority.",
            link: "/link-for-step-3"
        },
        {
            header: "Step 4: Gather Materials & Tools",
            description: `"Man is a tool-using animal. Without tools he is nothing, with tools he is all."\n~Thomas Carlyle.\n\n` +
                `This is yet another important step in the eboard journey. Having the right tools and materials is what sets ` +
                `apart a successful project versus an unsuccessful one. Here are a few of the recommended tools for starters: `,
            list: [],
            link: "/link-for-step-4"
        },
        {
            header: "Step 5: Assemble and Secure the Parts",
            description: "Now here is the exciting part. This is where we put together the board and witness our creation coming to life. What was only " +
                "an idea a moment ago, now takes shape and form right in front of your eyes. And the key to making this step succesful is adequate securement. " +
                "Recommended materials include but not limited to: nails, machine screws, threaded inserts, nuts and bolts, CA glue, staples, rivets, etc. " +
                "Because the board is subjected to vibrations of the road, it is always best practice to use machine screws or nuts and bolts. For parts that needs " +
                "extra security, it is best to apply some locktite to the threads, or use a nylon nut. Applying these extra measures of security to make sure " +
                "the parts stay attached to your board will reduce the chances of breakdowns during the ride.",
            link: "/link-for-step-5"
        },
        {
            header: "Step 6: Install the Battery & Electrical Components",
            description: "By the time you reach this step, the board is about 70% completed. All that's left is installing and configuring the electronics. But before " +
                "that, we need to first install the battery and all the electrical components, i.e ESC, anti-spark toggle switch, R/C reciever, etc. We strongly " +
                "advise on taking pre-cautionary measures to prevent damage to the battery upon riding. This include making sure that " +
                "the battery is securely sesated inside a hardened and durable enclosure, e.g carbon fiber. This will help prevent damage to the battery should the " +
                "board encounter rough terrains. ", // prob need to shorten this and clarify some more stuff.
            link: "/link-for-step-6"
        },
        {
            header: "Step 7: Establish the wiring connections",
            description: "As you assemble your electric skateboard, the next crucial step is establishing the wiring connections. This step involves " +
            "connecting all electrical components, including the motor, ESC (Electronic Speed Controller), battery, and remote receiver, with precision and care. " +
            "Ensure that all connections are secure and correctly matched to avoid any electrical mishaps. Use heat-shrink tubing and electrical tape to insulate " +
            "exposed wires, ensuring a clean and safe setup. Correct wiring is not only essential for functionality but also critical for the safety and longevity " +
            "of your board. A well-organized wiring layout helps in troubleshooting and maintenance down the line.",
            link: "/link-for-step-7"
        },
        {
            header: "Step 8: Configure the Electronics",
            description: "Now that all physical components are in place and connected, it's time to bring your skateboard's electronics to life. This step involves programming the ESC according to the specific needs of your build, such as setting up the throttle curve, braking strength, and power output. This might require connecting your ESC to a computer and using specialized software provided by the ESC manufacturer. Pay close attention to the settings that match your riding style and the capabilities of your motor and battery. Proper configuration ensures optimal performance, efficiency, and responsiveness of your electric skateboard.",
            link: "/link-for-step-8"
        },
        {
            header: "Step 9: Test Run and Fine Tuning",
            description: "The final step before you hit the road is a comprehensive test run. First, begin with a static test run to ensure all components function together without issues—flip the board over and check for throttle response, brake operation, and remote connectivity. When the tests passed accordingly, you can then proceed with a low-speed run in a controlled environment to feel the board's dynamics. Adjust the trucks, tune the ESC further if necessary, and ensure the comfort and responsiveness are to your liking. Fine-tuning these elements will enhance your riding experience and safety. Remember, the first ride is about testing, not pushing the limits. After successful tests and adjustments, your electric skateboard is ready for regular use.",
            link: "/link-for-step-9"
        }
    ];

    const guideImages = [
        [require("./images/Step_1_Create_Game_Plan.jpg")],
        [require("./images/Step_2_Research_Parts.jpg")],
        [require("./images/Step_3_Workspace.jpg")],
        [require("./images/Step_4_Mats_&_Tools.jpg")],
        [require("./images/Step_5_Assembly.jpg")],
        [require("./images/Step_6_Batt_&_Electronics.jpg")],
        [require("./images/Step_7_Wiring.jpg")],
        [require("./images/ID8.jpeg")],
        [require("./images/ID9.jpg")]
    ];

    return (
        <div className="quick-start-guide">
            <h1>Quick Start Guide</h1>
            {guideSteps.map((step, index) => (
                <div key={index} className="guide-step-container" ref={stepsRef[step.header]}>
                    <div className="step-images">
                        {guideImages[index].map((image, imgIndex) => (
                            <img key={imgIndex} src={image} alt={`Step ${index + 1} Image ${imgIndex + 1}`} />
                        ))}
                    </div>
                    <div className="guide-step">
                        <h2>{step.header}</h2>
                        <p>{step.description.split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                                {line}<br />
                            </React.Fragment>
                        ))}
                        </p>
                        {step.list && (
                            <ul>
                                {step.list.map((item, itemIndex) => (
                                    <li key={itemIndex}>{item}</li>
                                ))}
                            </ul>
                        )}
                        {step.link &&
                            <NavLink className="guide-href-link"
                                to={step.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >Learn more
                            </NavLink>
                        }
                    </div>
                </div>
            ))}
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

export default QuickStartGuide;
