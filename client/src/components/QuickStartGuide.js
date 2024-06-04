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
        "Step 7: Establish Wiring Connections": useRef(null),
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

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const guideSteps = [
        {
            header: "Step 1: Create a Game Plan",
            description: "Embarking on building your electric skateboard begins with a solid game plan. This initial step requires you to sketch out your design, brainstorm ideas, and conduct thorough research on electric skateboards. Consider this phase a prime opportunity to craft a board that excels in performance and reflects your personal style and ethos. If you find yourself needing additional insights or inspiration during this planning phase, exploring forums and communities for electric skateboard enthusiasts can be incredibly beneficial. These platforms allow you to engage with like-minded builders and share ideas. Additionally, reading articles and watching tutorials on electric skateboard construction can offer a deeper understanding of the technical aspects and design possibilities. For more personalized guidance, consider consulting experienced builders who can offer practical advice and creative tips. A well-informed plan is crucial—it navigates you through the building process and ensures that your goals are realistic and achievable. With a robust plan and enriched design knowledge, you’ll be well-prepared to select the right components and build your board with confidence. Ready to get started? LET'S DO THIS!",
            // link: "/link-for-step-1"
        },
        {
            header: "Step 2: Research for Parts",
            description: "Securing the right parts is critical to the success of your electric skateboard. The quality of materials directly affects the board's performance and reliability. Dedicate ample time to research and choose high-quality components. This step is crucial for reducing maintenance and maximizing ride time. We recommend purchasing parts from reputable vendors to ensure quality and support. This meticulous approach will lay a solid foundation for your eboard.",
            categoriesList: [
                {
                    label: "Component Selection",
                    items: [
                        "Identify and list necessary components like decks, trucks, wheels, and motors",
                        "Compare specifications and prices from different vendors",
                        "Check reviews and ratings for reliability and performance",
                        "Ensure parts compatibility for a smooth assembly and operation.",
                        "Check availability for parts warranties",
                        ["Below is a list of the essential parts to get you started:",
                            "<strong>Deck</strong> - 9 PLY is a good balance between stiffness and flexibility. 39+ inch in length recommended to allow for space to mount the enclosure that house the electronics",
                            "<strong>Wheels</strong> - Urethane for more range but require smooth paved roads; pneumatics for all terrain conditions but reduced range",
                            "<strong>Trucks</strong> - The wider the truck, the more stable the ride but with less turning radius",
                            "<strong>Electronic Speed Controller, or ESC</strong> - Typically any R/C car ESC with ABS braking would do; most common and reliable is the Vedder ESC, or VESC",
                            "<strong>Battery</strong> - Typically 10s4p or above ['s' stands for series, 'p' stands for parallel]; the higher the serie (i.e 12s or above), the faster the speed; the higher the parallel (i.e 8p or above), the further the range per charge",
                            "<strong>Remote Controller</strong> - 2.4 GHz is recommended; 3 channel is typically enough but 4+ channels allow for extra controls",
                            "<strong>Motor</strong> - 53mm motor is good for speed; 63mm motor is good for torque; the higher the Kv, the greater the torque (vice versa)",
                            "<strong>Hub motors (optional)</strong> - 70-80 Kv is a good start",
                            "<strong>Motor mount</strong> - Typically compatible with 53 or 63mm motors but need to make sure it is compatible with the type of truck you have",
                            "<strong>Wheel pulleys</strong> - These will depend on the type and size of wheels you have. Urethanes: typically 36T; Pneumatics: typically 72T",
                            "<strong>Timing belt</strong> - These will depend on three things: motor pulley, wheel pulley, and length of motor mount. For best practice, this should be ordered last and after assembly of the drive gear",
                            "<strong>Enclosure</strong> - ABS plastic enclosures are typically good enought. For the highest durability, carbon fiber is recommended"
                        ]
                        ////add more
                    ]
                },
                {
                    label: "Vendor Verification",
                    items: [
                        "Ensure vendors have good customer support and return policies",
                        "Purchase components from vendors known for quality and authenticity",
                        "Be wary of unusually cheap parts that may compromise quality",
                        "Review return and exchange policies",
                        ["List of trusted vendors (with links):",
                            "Coming Soon (contract pending)" // Placeholder text
                            ////add more
                        ]
                    ]
                }
            ],
            // link: "/link-for-step-2"
        },
        {
            header: "Step 3: Prepare a Workspace",
            description: "The next step is setting up a dedicated workspace. After finalizing your design and acquiring the necessary parts, create a conducive environment for assembly. This space should ideally be distraction-free, equipped with a large tabletop, a rolling stool, and easy access to tools and machinery. Prioritize good ventilation to handle dust and fumes safely. Remember, maintaining a safe work environment is paramount throughout the building process.",
            categoriesList: [
                {
                    label: "Machinery",
                    items: [
                        "<strong>Miter Saw</strong>: Used for precise cuts on the deck or any wooden parts.",
                        "<strong>Drill Press</strong>: Used for accurate, perpendicular holes that are crucial for mounting trucks and components.",
                        "<strong>Bench Grinder</strong>: Used for sharpening tools and smoothing rough metal edges.",
                        "<strong>Belt Sander</strong>: Used for smoothing the deck and edges, ensuring a perfect finish.",
                        "<strong>Jigsaw</strong>: Used for cutting complex shapes, if custom deck shapes are desired.",
                        "<strong>Band Saw (optional)</strong>: Useful for cutting thicker materials or making more precise cuts in wood or metal.",
                        "<strong>Router</strong>: Used for creating smooth edges on the deck and cutting slots for wiring if needed.",
                        "<strong>Air Compressor</strong>: Used for powering pneumatic tools and cleaning dust from work surfaces.",
                        "<strong>Soldering Station</strong>: Used for assembling and repairing electronic components with precision."
                        ////add more
                    ]
                }
            ],
            // link: "/link-for-step-3"
        },
        {
            header: "Step 4: Gather Materials & Tools",
            description: `"Man is a tool-using animal. Without tools he is nothing, with tools he is all."\n~Thomas Carlyle.\n\n` +
                "Equipping yourself with the right tools and materials is essential for a successful project. This step involves collecting all necessary items before beginning the assembly. A well-prepared toolkit simplifies the building process and enhances your ability to execute tasks efficiently.",
            categoriesList: [
                {
                    label: "Mechanical Tools",
                    items: [
                        "<strong>Screwdrivers (Phillips and/or Flathead)</strong> - For various screws and adjustments.",
                        "<strong>Allen Wrench Set</strong> - For hex bolts commonly used in skateboard assemblies.",
                        "<strong>Wrench Set (Adjustable and/or Fixed Sizes)</strong> - Needed for tightening and loosening nuts and bolts.",
                        "<strong>Socket Wrench Set</strong> - Useful for specific skateboard hardware that may require deep sockets.",
                        "<strong>Pliers (Needle Nose and/or Standard)</strong> - For gripping and bending small parts.",
                        "<strong>Wire Strippers</strong> - Essential for preparing electrical wires.",
                        "<strong>Wire Cutters</strong> - For cutting wires to the correct length.",
                        "<strong>Soldering Iron and Solder</strong> - For making secure electrical connections.",
                        "<strong>Heat Gun</strong> - For shrinking heat-shrink tubing over soldered connections.",
                        "<strong>Calipers or a Ruler</strong> - For precise measurements.",
                        "<strong>Drill and Drill Bits</strong> - For making holes for mounting components.",
                        "<strong>Tape Measure</strong> - For general measurement tasks.",
                        "<strong>Lubricants (WD-40, Petrolatum Jelly, etc.)</strong> - For reducing friction on moving parts."
                    ]
                },
                {
                    label: "Electrical Tools",
                    items: [
                        "<strong>Multimeter</strong> - For checking electrical continuity and diagnosing electrical issues.",
                        "<strong>Battery Charger (specific to the type of battery used)</strong> - For charging and maintaining the skateboard’s battery.",
                        "<strong>JST-XH Connector Kit</strong> - Often used for balancing lithium battery cells",
                        "<strong>Assorted Electrical Connectors</strong> - Including bullet connectors, spade connectors, and others depending on your design.",
                        "<strong>Screw Terminal Blocks</strong> - For easy connection and disconnection of wires in your setup.",
                        "<strong>Cable Ties</strong> - For managing and securing wiring."
                    ]
                },
                {
                    label: "Safety and Miscellaneous Tools",
                    items: [
                        "<strong>Safety Glasses</strong> - To protect your eyes from flying debris or solder splashes.",
                        "<strong>Work Gloves</strong> - To protect your hands while working with sharp or hot components.",
                        "<strong>Work Light</strong> - For better visibility in poorly lit conditions.",
                        "<strong>Vice or Clamps</strong> - To hold parts securely while working on them.",
                        "<strong>Electric Tape</strong> - For insulating and protecting wired connections.",
                        "<strong>Heat Shrink Tubing</strong> - For protecting wired connections against shorts.",
                        "<strong>Masking Tape</strong> - Useful for marking and temporarily securing parts.",
                        "<strong>Sandpaper</strong> - For smoothing rough edges on metal or wood parts.",
                        "<strong>File Set</strong> - For fine shaping and deburring of cut metal parts.",
                    ]
                }
            ],
            // link: "/link-for-step-4"
        },
        {
            header: "Step 5: Assemble and Secure the Parts",
            description: "Now comes the exciting part—assembly! It's time to bring your ideas to life. Assembling your board correctly is crucial; ensure each component is securely fastened. Use high-quality fasteners like machine screws or nuts and bolts, and for extra security, apply thread-locking fluid or use nylon nuts. These measures help maintain the integrity of your board against the vibrations of the road, minimizing potential breakdowns.",
            categoriesList: [
                {
                    label: "Main Assembly",
                    items: [
                        "<strong>Attach trucks to the deck</strong>: Ensure that the holes align perfectly and use durable bolts",
                        "<strong>Install wheels to the trucks</strong>: Choose the right wheel size and hardness for your intended use",
                        "<strong>Attach the motor mount</strong>: Make sure the motor mount is fastened securely to the truck",
                        "<strong>Mount the motor</strong>: Secure the motor to the motor mount and ensure it aligns with the drivetrain",
                        "<strong>Fit the drive belt or chain</strong>: Adjust tension to avoid slippage or excessive wear",
                        "<strong>Verify component compatibility</strong>: Ensure that each of your purchased components are compatible with one another before assembly",
                        "<strong>**Note: If you are using a hub motor then feel free to skip the motor mount assembly</strong>"
                        ////add more
                    ]
                },
                {
                    label: "Assembly Precautions",
                    items: [
                        "<strong>Ensure</strong> all hardware is tightened to the manufacturer’s specifications to avoid loosening during rides",
                        "<strong>Use</strong> thread-locking compounds, such as Locktite, on all <i><u><strong>critical</strong></u></i> fasteners, especially those subjected to road vibrations",
                        "<strong>Double-check</strong> the alignment of all drivetrain components to prevent wear and inefficiency, apply some lubricate if necessary",
                        "<strong>Regularly inspect</strong> the assembly during initial test runs to adjust and re-tighten components as necessary",
                        ////add more
                    ]
                }
            ],
            // link: "/link-for-step-5"
        },
        {
            header: "Step 6: Install the Battery & Electrical Components",
            description: "With the structure nearly complete, your focus will shift to installing the battery and electrical components. It's essential to handle these components with care, ensuring they're securely housed within a durable enclosure—preferably made of materials like carbon fiber to withstand any impacts from rough terrains. Proper installation safeguards the battery and electronics, paving the way for reliable performance.",
            categoriesList: [
                {
                    label: "Electrical Installation",
                    items: [
                        "<strong>Mount the battery enclosure</strong>: Mount it to the deck, ensuring it does not interfere with riding dynamics, i.e. allowing at least 3-4 inches of clearance from the bottom of the board to the ground.",
                        "<strong>Install the battery</strong>: Securely mount the battery in its enclosure on the deck, ensuring it does not shift during movement",
                        "<strong>Position the ESC</strong>: Place the Electronic Speed Controller close to the battery but ensure adequate space for heat dissipation",
                        "<strong>Include the power switch</strong>: Install a high-amperage toggle switch in an accessible area for easy operation",
                        "<strong>Setup the charging port</strong>: Integrate a charging port that matches your battery's requirements and ensure it is easily accessible",
                        "<strong>Connect the motor to ESC</strong>: Use high-quality, durable wires to connect the motor to the ESC, ensuring secure and clean soldering points",
                        ////add more
                    ]
                },
                {
                    label: "Electrical Safety & Precautions",
                    items: [
                        "<strong>Check for insulation</strong>: Ensure all wiring connections are properly insulated to prevent short circuits",
                        "<strong>Secure wiring</strong>: Use cable management clips to secure wiring along the board, avoiding loose wires that could catch or disconnect",
                        "<strong>Battery management</strong>: Install a battery management system (BMS) for lithium-ion batteries to ensure balanced charging and discharging",
                        "<strong>Regular inspection</strong>: Make it a routine to check all electrical connections and components before and after rides for any signs of wear or loose connections",
                        ////add more
                    ]
                }
            ],
            // link: "/link-for-step-6"
        },
        {
            header: "Step 7: Establish Wiring Connections",
            description: "This critical step involves meticulously connecting your board's electrical components. Make precise connections between the motor, ESC, battery, and remote receiver. Secure and properly match all connections to prevent electrical issues. Use heat-shrink tubing and electrical tape to safely insulate exposed wires, ensuring both functionality and safety. A well-organized wiring setup aids in maintenance and troubleshooting.",
            categoriesList: [
                {
                    label: "Wiring Setup",
                    items: [
                        "<strong>Organize your wiring layout</strong>: Plan and lay out your wires to keep the setup tidy and functional, reducing the chance of entanglements or damage",
                        "<strong>Color-code your wiring</strong>: Use different colors for different connections (e.g., red for positive, black for negative) to avoid confusion",
                        "<strong>Use quality connectors</strong>: Opt for high-quality connectors that can withstand the vibrations and stresses of skateboard operation",
                        "<strong>Secure the remote receiver</strong>: Place the remote receiver in a position where it is protected from impact but still in range of the remote control",
                        ////add more
                    ]
                },
                {
                    label: "Connection Integrity",
                    items: [
                        "<strong>Double check the terminals</strong>: Make sure the poitive and negative terminals are connected properly to avoid frying the electronics and potentially starting a fire",
                        "<strong>Test each connection</strong>: Before finalizing installations, use a multimeter to test each connection for correct voltage and secure contacts",
                        "<strong>Use heat shrink tubing</strong>: Apply heat shrink tubing to all soldered connections to enhance durability and electrical insulation",
                        "<strong>Check motor phase wires</strong>: Ensure the motor phase wires are securely connected to the ESC, as incorrect or loose connections can cause motor malfunctions",
                        "<strong>Order of phase wires</strong>: Generally speaking, the order of the phase wires does not matter for brushless DC motors. This mean they can be connected to the ESC in any order. However, the order of the HALL Sensors DOES matter",
                        "<strong>Verify sensor connections</strong>: For motors with HALL Sensors, double-check the sensor wire connections for accuracy as they are crucial for a smooth rolling start, without the need of an initial push kick",
                        ////add more
                    ]
                }
            ],
            // link: "/link-for-step-7"
        },
        {
            header: "Step 8: Configure the Electronics",
            description: "Now that all physical components are in place and connected, it's time to bring your skateboard's electronics to life. This step involves programming the ESC according to the specific needs of your build, such as setting up the throttle curve, braking strength, and power output. This might require connecting your ESC to a computer and using specialized software provided by the ESC manufacturer. Pay close attention to the settings that match your riding style and the capabilities of your motor and battery. Proper configuration ensures optimal performance, efficiency, and responsiveness of your electric skateboard.",
            categoriesList: [
                {
                    label: "Electronics Configuration",
                    items: [
                        "<strong>Program the ESC</strong>: Use a compatible interface (USB or Bluetooth) to connect the ESC to a computer or smartphone for programming",
                        "<strong>Adjust throttle and brake settings</strong>: Customize the throttle curve and braking power to match your riding style and comfort",
                        "<strong>Set power limits</strong>: Configure power settings according to your motor and battery specifications to prevent overheating and overloading",
                        "<strong>Calibrate the remote</strong>: Ensure the remote control is fully calibrated with the ESC to ensure responsive control over the skateboard",
                        ////add more
                    ]
                },
                {
                    label: "Software and Hardware Checks",
                    items: [
                        "<strong>Firmware updates</strong>: Regularly update the ESC firmware to ensure you have the latest features and optimal performance",
                        "<strong>Sensor calibration</strong>: If using a sensor-equipped motor, perform calibrations to ensure accurate motor behavior and responsiveness",
                        "<strong>Battery health monitoring</strong>: Utilize software tools to monitor the health and performance of your battery pack over time",
                        "<strong>Safety audits</strong>: Regularly review your electronic settings and configurations to ensure they remain safe and within operational parameters",
                        ////add more
                    ]
                }
            ],
            // link: "/link-for-step-8"
        },
        {
            header: "Step 9: Test Run and Fine Tuning",
            description: "The final step before you hit the road is a comprehensive test run. First, begin with a static test run to ensure all components function together without issues—flip the board over and check for throttle response, brake operation, and remote connectivity. When the tests passed accordingly, you can then proceed with a low-speed run in a controlled environment to feel the board's dynamics. Adjust the trucks, tune the ESC further if necessary, and ensure the comfort and responsiveness are to your liking. Fine-tuning these elements will enhance your riding experience and safety. Remember, the first ride is about testing, not pushing the limits. After successful tests and adjustments, your electric skateboard is ready for regular use.",
            categoriesList: [
                {
                    label: "Testing and Adjustment",
                    items: [
                        "<strong>Conduct a bench test</strong>: Perform a static test with the skateboard raised to check wheel and motor operation without load",
                        "<strong>Low-speed tests</strong>: Start with low-speed runs to assess the general performance and stability of the skateboard",
                        "<strong>High-speed tests</strong>: Gradually increase speed under controlled conditions to test the skateboard's performance at higher speeds",
                        "<strong>Adjust as needed</strong>: Fine-tune the truck tightness, wheel alignment, and ESC settings based on test ride feedback",
                        ////add more
                    ]
                },
                {
                    label: "Initial Runs",
                    items: [
                        "<strong>Safety gear</strong>: Always wear appropriate safety gear during test runs, including a helmet, knee pads, and elbow pads",
                        "<strong>Controlled environment</strong>: Choose a smooth, flat area for initial tests to safely evaluate the skateboard's handling and response",
                        "<strong>Obstacle navigation</strong>: Practice maneuvering around obstacles to ensure the skateboard's responsiveness and your comfort with its controls",
                        "<strong>Range testing</strong>: Conduct a range test to determine how far your skateboard can go on a single charge under normal riding conditions",
                        "<strong>Monitoring</strong>: Closely monitor the board's performance for any unusual noises or behaviors. A properly functioning drive system should emit a smooth revving sound that increases in pitch with increased speed. Any irregularities, such as cracking sounds, significant pitch fluctuations, or unusual vibrations, could indicate an improperly adjusted drive mechanism, incorrectly configured ESC motor parameters, or other mechanical issues. Addressing these early can prevent further complications."
                        ////add more
                    ]
                },
                {
                    label: "Key things to keep in mind:",
                    items: [
                        "<strong>Gradual Adjustments</strong>: When tuning, make sure you make adjustments little by little and one variable at a time to isolate the effects of each change. This methodical approach helps in accurately determining which adjustments improve performance and stability",
                        "<strong>Data Logging</strong>: During testing, ensure to log all performance data, such as speed, battery life, and response times. This information is vital for analyzing the board's behavior under various conditions and making informed adjustments",
                        "<strong>Weather Conditions</strong>: Always consider the weather conditions during your test runs. Wet or slippery conditions can affect the board’s handling and braking significantly, and adjustments may need to be made to accommodate different environments",
                        "<strong>Check for Wear and Tear</strong>: Regularly inspect your skateboard for any signs of wear or mechanical degradation. Pay special attention to the wheels, bearings, and deck integrity, especially after rigorous test sessions",
                        "<strong>Battery Health Monitoring</strong>: Keep an eye on the battery's performance and health, noting any unusual depletion rates or heating issues. Regular checks ensure the battery maintains optimal performance and longevity",
                        "<strong>Feedback Collection</strong>: If possible, get feedback from other riders who test your skateboard. Different perspectives can provide insights into how the board handles for various styles and weights of riders",
                        "<strong>Follow Safety Protocols</strong>: Always adhere to safety protocols during testing. This includes not only wearing the proper gear but also ensuring that all electronic systems are shut down properly after testing to avoid accidents or damage",
                        "<strong>Emergency Preparedness</strong>: Have an emergency plan in place in case of mechanical failure or accidents during test runs. This includes knowing basic first aid and having emergency contact numbers readily available",
                        "<strong>Spare Parts</strong>: Keep spare parts handy for quick replacements during testing, especially for components that are prone to wear and tear like belts, wheels, and connectors",
                        ////add more
                    ]
                }
            ],
            // link: "/link-for-step-9"
        },
        {
            header: "Step 10: The Open Road Awaits!",
            description: (
                <>
                    <p>CONGRATULATIONS! You’ve successfully built your very own electric skateboard. Now, the real adventure begins as you take your creation for a spin. As thrilling as it is to ride something you’ve crafted with your own hands, safety must always come first. Always wear a full-faced helmet, knee pads, abrasion-resistant gloves, and a windbreaker jacket to protect against the elements and potential falls. Additionally, consider elbow pads and padded shorts for extra protection.</p>
                    <p>Before you hit the road, familiarize yourself with local traffic laws to ensure you ride legally and safely. Start in a safe, traffic-free area to get a feel for your board’s dynamics. Practice turning, stopping, and handling at various speeds. Remember, each ride not only offers fun but also an opportunity to fine-tune your board’s performance. And don't be discouraged by falls—they're a normal part of the learning curve. With each tumble, you're one step closer to mastering the art of eboarding, just like seasoned riders.</p>
                    <p>The beauty of a DIY electric skateboard is the limitless customization. Now that you've built the foundation, you can modify and enhance your board as you see fit. Want more speed or a smoother ride? Consider upgrading your wheels or adjusting your truck settings. Interested in aesthetics? Add LED lights for a personalized touch or custom graphics to make your board visually striking. The possibilities are endless, and the joy of riding something that truly represents your personality and needs is immensely satisfying. For those eager to learn more about the electronics working behind the scenes, or to dive deeper into upgrades and innovative designs, stay tuned for our <NavLink to="/guide/advanced">'ADVANCED GUIDE'</NavLink> with detailed steps that takes your board to the next level. Embrace this journey of continual improvement and customization, and revel in the freedom that a DIY skateboard provides. Ride on and keep evolving your board to match your growing skills and unique style!</p>
                </>
            ),
            // link: "/link-for-step-10"
        }
    ];

    const guideImages = [
        [require("./images/Step_1_Create_Game_Plan.jpg")],
        [require("./images/Step_2_Research_Parts_pt.1.jpg"), require("./images/Step_2_Research_Parts_pt.2.jpg")],
        [require("./images/Step_3_Workspace.jpg")],
        [require("./images/Step_4_Mats_&_Tools_pt.1.jpg"), require("./images/Step_4_Mats_&_Tools_pt.2.jpg")],
        [require("./images/Step_5_Assembly.jpg")],
        [require("./images/Step_6_Batt_&_Electronics.jpg")],
        [require("./images/Step_7_Wiring_pt.1.jpg"), require("./images/Step_7_Wiring_pt.2.png")],
        [require("./images/Step_8_Config_Electronics.jpg")],
        [require("./images/Step_9_Test_Fine_Tuning_pt.1.jpg"), require("./images/Step_9_Test_Fine_Tuning_pt.2.jpg"), require("./images/Step_9_Test_Fine_Tuning_pt.3.jpg")],
        [require("./images/Step_10_Open_Road_Ahead.jpg")]
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
                        <div className="step-description">
                            {step.description}
                        </div>
                        {step.categoriesList && step.categoriesList.map((category, catIndex) => (
                            <div key={catIndex}>
                                <h3>{category.label}</h3>
                                <ul className="category-list">
                                    {category.items.map((item, itemIndex) => (
                                        Array.isArray(item) ? (
                                            <li key={itemIndex}>
                                                <ul>
                                                    {item.slice(1).map((subItem, subItemIndex) => (
                                                        <li key={subItemIndex} dangerouslySetInnerHTML={{ __html: subItem }}></li>
                                                    ))}
                                                </ul>
                                            </li>
                                        ) : (
                                            <li key={itemIndex} dangerouslySetInnerHTML={{ __html: item }}></li>
                                        )
                                    ))}
                                </ul>
                            </div>
                        ))}
                        {step.list && (
                            <ul className="step-list">
                                {step.list.map((item, itemIndex) => (
                                    <li key={itemIndex} dangerouslySetInnerHTML={{ __html: item }}></li>
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
            <button className="scrollToTopButton" onClick={scrollToTop}>Top</button>
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
