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
        "Step 9: Test Run and Fine Tuning": useRef(null),
        "Step 10: The Open Road Awaits!": useRef(null)
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
            description: "Securing the right parts is critical to the success of your electric skateboard. The quality of materials directly affects the board's performance and reliability. Dedicate ample time to research and choose high-quality components. This step is crucial for reducing maintenance and maximizing ride time. We recommend purchasing parts from reputable vendors to ensure quality and support. This meticulous approach will lay a solid foundation for your skateboard.",
            // "This is one of the most crucial steps in your eboard building process. A top performing " +
            // "and reliable eboard depends on the material that it is built from. This is the step that requires the most time " +
            // "and researh on. Higher quality parts equates to less time spent on fixing breakdowns and more time riding. " +
            // "We always advice new builders to take this step seriously and purchase the parts from merchants you can trust.",
            categoriesList: [
                {
                    label: "Common Parts", ////rephrase
                    items: [
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
                        ////add more
                    ]
                },
                {
                    label: "Common Vendors", ////rephrase
                    items: [
                        "Evolve",
                        "Trampa"
                        ////add more
                    ]
                }
            ],
            link: "/link-for-step-2"
        },
        {
            header: "Step 3: Prepare a Workspace",
            description: "The next step is setting up a dedicated workspace. After finalizing your design and acquiring the necessary parts, create a conducive environment for assembly. This space should ideally be distraction-free, equipped with a large tabletop, a rolling stool, and easy access to tools and machinery. Prioritize good ventilation to handle dust and fumes safely. Remember, maintaining a safe work environment is paramount throughout the building process.",
            // "Once you have decided on the design and purchased the parts for your build, the next step is to establish a distraction-" +
            // "free, if possible, workshop where you will spend the next few weeks, or even months, planning, building, and testing your " +
            // "board. Generally, a large tabletop complemented with a rolling stool and quick access to tools and/or machineries would " +
            // "be sufficient. As a word of caution, please make sure the workshop is well ventilated as you will be working with wood/metal " +
            // "dust and solder fumes throughout the build. Please remember that safety should always be your number one priority.",
            categoriesList: [
                {
                    label: "Machinery", ////rephrase
                    items: [
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
                        ////add more
                    ]
                }
            ],
            link: "/link-for-step-3"
        },
        {
            header: "Step 4: Gather Materials & Tools",
            description: `"Man is a tool-using animal. Without tools he is nothing, with tools he is all."\n~Thomas Carlyle.\n\n` +
                "Equipping yourself with the right tools and materials is essential for a successful project. This step involves collecting all necessary items before beginning the assembly. A well-prepared toolkit simplifies the building process and enhances your ability to execute tasks efficiently.",
            // `This is yet another important step in the eboard journey. Having the right tools and materials is what sets ` +
            // `apart a successful project versus an unsuccessful one. Here are a few of the recommended tools for starters: `,
            categoriesList: [
                {
                    label: "Mechanical Tools",
                    items: [
                        "Screwdrivers (Phillips and Flathead) - For various screws and adjustments.",
                        "Allen Wrench Set - For hex bolts commonly used in skateboard assemblies.",
                        "Wrench Set (Adjustable and Fixed Sizes) - Needed for tightening and loosening nuts and bolts.",
                        "Socket Wrench Set - Useful for specific skateboard hardware that may require deep sockets.",
                        "Pliers (Needle Nose and Standard) - For gripping and bending small parts.",
                        "Wire Strippers - Essential for preparing electrical wires.",
                        "Wire Cutters - For cutting wires to the correct length.",
                        "Soldering Iron and Solder - For making secure electrical connections.",
                        "Heat Gun - For shrinking heat-shrink tubing over soldered connections.",
                        "Calipers or a Ruler - For precise measurements.",
                        "Drill and Drill Bits - For making holes for mounting components.",
                        "Tape Measure - For general measurement tasks."
                    ]
                },
                {
                    label: "Electrical Tools",
                    items: [
                        "Multimeter",
                        "Battery Charger (specific to the type of battery used) - For charging and maintaining the skateboard’s battery.",
                        "JST-XH Connector Kit - Often used for balancing lithium battery cells",
                        "Assorted Electrical Connectors - Including bullet connectors, spade connectors, and others depending on your design.",
                        "Screw Terminal Blocks - For easy connection and disconnection of wires in your setup.",
                        "Cable Ties - For managing and securing wiring."
                    ]
                },
                {
                    label: "Safety and Miscellaneous Tools",
                    items: [
                        "Safety Glasses - To protect your eyes from flying debris or solder splashes.",
                        "Work Gloves - To protect your hands while working with sharp or hot components.",
                        "Work Light - For better visibility in poorly lit conditions.",
                        "Vice or Clamps - To hold parts securely while working on them.",
                        "Electric Tape - For insulating and protecting wired connections.",
                        "Heat Shrink Tubing - For protecting wired connections against shorts.",
                        "Masking Tape - Useful for marking and temporarily securing parts.",
                        "Sandpaper - For smoothing rough edges on metal or wood parts.",
                        "File Set - For fine shaping and deburring of cut metal parts.",
                    ]
                }
            ],
            link: "/link-for-step-4"
        },
        {
            header: "Step 5: Assemble and Secure the Parts",
            description: "Now comes the exciting part—assembly! It's time to bring your ideas to life. Assembling your board correctly is crucial; ensure each component is securely fastened. Use high-quality fasteners like machine screws or nuts and bolts, and for extra security, apply thread-locking fluid or use nylon nuts. These measures help maintain the integrity of your board against the vibrations of the road, minimizing potential breakdowns.",
            // "Now here is the exciting part. This is where we put together the board and witness our creation coming to life. What was only " +
            // "an idea a moment ago, now takes shape and form right in front of your eyes. And the key to making this step succesful is adequate securement. " +
            // "Recommended materials include but not limited to: nails, machine screws, threaded inserts, nuts and bolts, CA glue, staples, rivets, etc. " +
            // "Because the board is subjected to vibrations of the road, it is always best practice to use machine screws or nuts and bolts. For parts that needs " +
            // "extra security, it is best to apply some locktite to the threads, or use a nylon nut. Applying these extra measures of security to make sure " +
            // "the parts stay attached to your board will reduce the chances of breakdowns during the ride.",
            categoriesList: [
                {
                    label: "Main Assembly", ////rephrase
                    items: [
                        "Assemble trucks to the deck",
                        "Install wheels (urethane or pneumatic) to the trucks"
                        ////add more
                    ]
                },
                {
                    label: "Precautions", ////rephrase
                    items: [
                        "Take note to secure each part of the assemby securely",
                        "Apply locktite for threaded parts-especially for the trucks and wheels"
                        ////add more
                    ]
                }
            ],
            link: "/link-for-step-5"
        },
        {
            header: "Step 6: Install the Battery & Electrical Components",
            description: "With the structure nearly complete, your focus will shift to installing the battery and electrical components. It's essential to handle these components with care, ensuring they're securely housed within a durable enclosure—preferably made of materials like carbon fiber to withstand any impacts from rough terrains. Proper installation safeguards the battery and electronics, paving the way for reliable performance.",
            // "By the time you reach this step, the board is about 70% completed. All that's left is installing and configuring the electronics. But before " +
            // "that, we need to first install the battery and all the electrical components, i.e ESC, anti-spark toggle switch, R/C reciever, etc. We strongly " +
            // "advise on taking pre-cautionary measures to prevent damage to the battery upon riding. This include making sure that " +
            // "the battery is securely sesated inside a hardened and durable enclosure, e.g carbon fiber. This will help prevent damage to the battery should the " +
            // "board encounter rough terrains. ", // prob need to shorten this and clarify some more stuff.
            categoriesList: [
                {
                    label: "Battery and Components Installation", ////rephrase
                    items: [
                        "Install the battery and ESC to the deck and secure in place",
                        "Wire the connections",
                        "Use a 12S 60A or higher Toggle Switch to turn the board on and off"
                        ////add more
                    ]
                },
                {
                    label: "Precautions", ////rephrase
                    items: [
                        "Take special care to not short any connections",
                        "Make sure the wiring for ESC and Battery is correct"
                        ////add more
                    ]
                }
            ],
            link: "/link-for-step-6"
        },
        {
            header: "Step 7: Establish the wiring connections",
            description: "This critical step involves meticulously connecting your board's electrical components. Make precise connections between the motor, ESC, battery, and remote receiver. Secure and properly match all connections to prevent electrical issues. Use heat-shrink tubing and electrical tape to safely insulate exposed wires, ensuring both functionality and safety. A well-organized wiring setup aids in maintenance and troubleshooting.",
            // "As you assemble your electric skateboard, the next crucial step is establishing the wiring connections. This step involves " +
            // "connecting all electrical components, including the motor, ESC (Electronic Speed Controller), battery, and remote receiver, with precision and care. " +
            // "Ensure that all connections are secure and correctly matched to avoid any electrical mishaps. Use heat-shrink tubing and electrical tape to insulate " +
            // "exposed wires, ensuring a clean and safe setup. Correct wiring is not only essential for functionality but also critical for the safety and longevity " +
            // "of your board. A well-organized wiring layout helps in troubleshooting and maintenance down the line.",
            categoriesList: [
                {
                    label: "Main Assembly", ////rephrase
                    items: [
                        "Install battery and ESC to the deck and secure in place",
                        "Wire the connections",
                        "Use a 12S 60A or higher Toggle Switch to turn the board on and off"
                        ////add more
                    ]
                },
                {
                    label: "Precautions", ////rephrase
                    items: [
                        "Take special care to not short any connections",
                        "For brushless DC motors, order of the phase wires does not matter. However, the order of the Hall Sensors DOES matter."
                        ////add more
                    ]
                }
            ],
            link: "/link-for-step-7"
        },
        {
            header: "Step 8: Configure the Electronics",
            description: "Now that all physical components are in place and connected, it's time to bring your skateboard's electronics to life. This step involves programming the ESC according to the specific needs of your build, such as setting up the throttle curve, braking strength, and power output. This might require connecting your ESC to a computer and using specialized software provided by the ESC manufacturer. Pay close attention to the settings that match your riding style and the capabilities of your motor and battery. Proper configuration ensures optimal performance, efficiency, and responsiveness of your electric skateboard.",
            categoriesList: [
                {
                    label: "Main Assembly", ////rephrase
                    items: [
                        "Install battery and ESC to the deck and secure in place",
                        "Wire the connections",
                        "Use a 12S 60A or higher Toggle Switch to turn the board on and off"
                        ////add more
                    ]
                },
                {
                    label: "Precautions", ////rephrase
                    items: [
                        "Take special care to not short any connections",
                        "For brushless DC motors, order of the phase wires does not matter. However, the order of the Hall Sensors DOES matter."
                        ////add more
                    ]
                }
            ],
            link: "/link-for-step-8"
        },
        {
            header: "Step 9: Test Run and Fine Tuning",
            description: "The final step before you hit the road is a comprehensive test run. First, begin with a static test run to ensure all components function together without issues—flip the board over and check for throttle response, brake operation, and remote connectivity. When the tests passed accordingly, you can then proceed with a low-speed run in a controlled environment to feel the board's dynamics. Adjust the trucks, tune the ESC further if necessary, and ensure the comfort and responsiveness are to your liking. Fine-tuning these elements will enhance your riding experience and safety. Remember, the first ride is about testing, not pushing the limits. After successful tests and adjustments, your electric skateboard is ready for regular use.",
            categoriesList: [
                {
                    label: "Key things to keep in mind:", ////rephrase
                    items: [
                        "When tuning, make sure you make adjustments little by little and one variable at a time.",
                        "When testing, make sure you log all the data so you know if the adjustments worked.",
                        ////add more
                    ]
                }
            ],
            link: "/link-for-step-9"
        },
        {
            header: "Step 10: The Open Road Awaits!",
            description: `Congratulations! You’ve successfully built your very own electric skateboard. Now, the real adventure begins as you take your creation for a spin. As thrilling as it is to ride something you’ve crafted with your own hands, safety must always come first. Always wear a full-faced helmet, knee pads, abrasion-resistant gloves, and a windbreaker jacket to protect against the elements and potential falls. Additionally, consider elbow pads and padded shorts for extra protection.\n\n` +
            `Before you hit the road, familiarize yourself with local traffic laws to ensure you ride legally and safely. Start in a safe, traffic-free area to get a feel for your board’s dynamics. Practice turning, stopping, and handling at various speeds. Remember, each ride not only offers fun but also an opportunity to fine-tune your board’s performance. And don't be discouraged by falls—they're a normal part of the learning curve. With each tumble, you're one step closer to mastering the art of eboarding, just like seasoned riders.\n\n` +
            `The beauty of a DIY electric skateboard is the limitless customization. Now that you've built the foundation, you can modify and enhance your board as you see fit. Want more speed or a smoother ride? Consider upgrading your wheels or adjusting your truck settings. Interested in aesthetics? Add LED lights for a personalized touch or custom graphics to make your board visually striking. The possibilities are endless, and the joy of riding something that truly represents your personality and needs is immensely satisfying. For those eager to dive deeper into upgrades and innovative designs, stay tuned for our 'Advanced Guide'—coming soon with detailed steps for taking your board to the next level. Embrace this journey of continual improvement and customization, and revel in the freedom that a DIY skateboard provides. Ride on and keep evolving your board to match your growing skills and unique style!`,
            link: "/link-for-step-10"
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
        [require("./images/Step_8_Config_Electronics.jpg")],
        [require("./images/Step_9_Test_Fine_Tuning.jpg")],
        [require("./images/Step_10_Open_Road_Ahead.jpg")],
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
                        {step.categoriesList && step.categoriesList.map((category, catIndex) => (
                            <div key={catIndex}>
                                <h3>{category.label}</h3>
                                <ul>
                                    {category.items.map((item, itemIndex) => (
                                        <li key={itemIndex}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
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
