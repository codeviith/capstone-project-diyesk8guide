import React, { useState, useEffect } from 'react';

// Import images
import st_img1 from './images/ID1.jpg';
import st_img2 from './images/ID2.jpeg';
import st_img3 from './images/ID5.jpeg';
import st_img4 from './images/ID6.jpeg';
import at_img1 from './images/ID7.jpg';
import at_img2 from './images/ID4.jpeg';
import at_img3 from './images/ID3.jpg';


///////NEED TO ADD MORE IMAGES!!!!!!!
///////NEED TO ADD MORE IMAGES!!!!!!!
///////NEED TO ADD MORE IMAGES!!!!!!!
///////NEED TO ADD MORE IMAGES!!!!!!!
///////NEED TO ADD MORE IMAGES!!!!!!!




/////Random and non-repeating image code:
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getRandomImageGenerator(images) {
  let shuffledImages = shuffleArray([...images]);
  let currentIndex = 0;

  return function getNextRandomImage() {
    if (currentIndex >= shuffledImages.length) {
      // Reshuffle when all images have been used
      shuffledImages = shuffleArray([...images]);
      currentIndex = 0;
    }
    return shuffledImages[currentIndex++];
  };
}

//Creating variable to be put into main code:
const getNextRandomStreetImage = getRandomImageGenerator([st_img1, st_img2, st_img3, st_img4]);
const getNextRandomAllTerrainImage = getRandomImageGenerator([at_img1, at_img2, at_img3]);



/////Component code:
function Generate() {
  const [boardsData, setBoardsData] = useState([]);
  const [riderLevel, setRiderLevel] = useState('');
  const [motorPower, setMotorPower] = useState('');
  const [terrainType, setTerrainType] = useState('');
  const [rangeType, setRangeType] = useState('');

  const [deckType, setDeckType] = useState('');
  const [deckLength, setDeckLength] = useState('');
  const [deckMaterial, setDeckMaterial] = useState('');
  const [truckType, setTruckType] = useState('');
  const [truckWidth, setTruckWidth] = useState('');
  const [controllerFeature, setControllerFeature] = useState('');
  const [controllerType, setControllerType] = useState('');
  const [remoteFeature, setRemoteFeature] = useState('');
  const [remoteType, setRemoteType] = useState('');
  const [motorSize, setMotorSize] = useState('');
  const [motorKv, setMotorKv] = useState('');
  const [wheelSize, setWheelSize] = useState('');
  const [wheelType, setWheelType] = useState('');
  const [batteryVoltage, setBatteryVoltage] = useState('');
  const [batteryType, setBatteryType] = useState('');
  const [batteryCapacity, setBatteryCapacity] = useState('');
  const [batteryConfiguration, setBatteryConfiguration] = useState('');
  const [mileage, setMileage] = useState('');
  const [imageURL, setImageURL] = useState('')


  useEffect(() => {
    const updateBoardData = async () => {
      // Post user's input to the Flask backend
      await fetch('/update_board', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deckType,
          deckLength,
          deckMaterial,
          truckType,
          truckWidth,
          controllerFeature,
          controllerType,
          remoteFeature,
          remoteType,
          motorSize,
          motorKv,
          wheelSize,
          wheelType,
          batteryVoltage,
          batteryType,
          batteryCapacity,
          batteryConfiguration,
          mileage,
          imageURL,
        }),
      });

      // Fetch the latest board
      const response = await fetch('/latest_boards');
      if (response.ok) {
        const latestBoard = await response.json();

        // Set the latest board in the state
        setBoardsData([latestBoard]);
      } else {
        // Handle the case where the latest board is not found
        console.error('Error fetching latest board');
      }
    };

    // Check if any of the relevant state variables have changed
    if (
      deckType !== '' ||
      deckLength !== '' ||
      deckMaterial !== '' ||
      truckType !== '' ||
      truckWidth !== '' ||
      controllerFeature !== '' ||
      controllerType !== '' ||
      remoteFeature !== '' ||
      remoteType !== '' ||
      motorSize !== '' ||
      motorKv !== '' ||
      wheelSize !== '' ||
      wheelType !== '' ||
      batteryVoltage !== '' ||
      batteryType !== '' ||
      batteryCapacity !== '' ||
      batteryConfiguration !== '' ||
      mileage !== '' ||
      imageURL !== ''
    ) {
      // If any of the state variables have changed, update the board data
      updateBoardData();
    }
  }, [
    deckType,
    deckLength,
    deckMaterial,
    truckType,
    truckWidth,
    controllerFeature,
    controllerType,
    remoteFeature,
    remoteType,
    motorSize,
    motorKv,
    wheelSize,
    wheelType,
    batteryVoltage,
    batteryType,
    batteryCapacity,
    batteryConfiguration,
    mileage,
    imageURL,
  ]);



  const handleGenerateBoard = async () => {
    // Set values for board spec based on user's selection input
    if (riderLevel === 'Beginner') {
      setTruckType('Single Kingspin'); 
      setTruckWidth('10in.');
      setControllerFeature('Low Voltage Cutoff, Overheat Protection, Battery Eliminator Circuit, ABS Braking');
      setControllerType('Flipsky ESC');
      setRemoteFeature('Regen Braking, Reverse, LCD Display');
      setRemoteType('Thumb-Style Throttle');
      setDeckType('Kicktail Cruiser');
      setDeckLength('38in.');
      setDeckMaterial('7-ply plywood');
    } else if (riderLevel === 'Intermediate') {
      setTruckType('Double Kingspin');
      setTruckWidth('12in.');
      setControllerFeature('Over-Voltage Protection, 3-12S, BEC, Low-Current Shunt, BLDC Mode, 80A Peak Current');
      setControllerType('VESC 4.6');
      setRemoteFeature('Regen Braking, Reverse, Cruise-Control, LCD Display, Macro Buttons');
      setRemoteType('Trigger-Style Throttle');
      setDeckType('Drop-Through Carver');
      setDeckLength('42in.');
      setDeckMaterial('Carbon Fiber');
    } else if (riderLevel === 'Expert') {
      setTruckType('MTB Spring Loaded');
      setTruckWidth('16in.');
      setControllerFeature('Over-Voltage Protection, 3-12S, BEC, Low-Current Shunt, BLDC Mode, FOC Mode, 120A Peak Current, Sensorless Acceleration, Full Torque from 0RPM, Overheat Protection, Aluminum heatsink MOSFET');
      setControllerType('VESC 6.1');
      setRemoteFeature('Regen Braking, Reverse, Cruise Control, LCD Display, Macro Buttons, Ride Mode Toggle');
      setRemoteType('Trigger-Style Throttle');
      setDeckType('35 Degrees MTB Flex');
      setDeckLength('42in.');
      setDeckMaterial('Carbon Fiber 16-Ply');
    }

    if (motorPower === 'Drag Racing') {
      setMotorSize('6374');
      setMotorKv('235kv');
    } else if (motorPower === 'Casual Cruising') {
      setMotorSize('6356');
      setMotorKv('190kv');
    } else if (motorPower === 'Hill Climbing') {
      setMotorSize('6384');
      setMotorKv('170kv');
    }

    if (terrainType === 'Street') {
      setWheelSize('90mm');
      setWheelType('78A');
      setImageURL(getNextRandomStreetImage())
    } else if (terrainType === 'All Terrain') {
      setWheelSize('175mm');
      setWheelType('Pneumatic');
      setImageURL(getNextRandomAllTerrainImage())
    }

    if (rangeType === 'Normal') {
      setBatteryVoltage('37v Nominal');
      setBatteryType('18650 li-ion');
      setBatteryCapacity('3500mah per cell');
      setBatteryConfiguration('10s4p');
      setMileage('Approx. 22 miles per charge. Note that mileage will depend on a lot of factors such as: type of wheel, terrain conditions, motor configuration, etc.');
    } else if (rangeType === 'Extended') {
      setBatteryVoltage('44.4v Nominal');
      setBatteryType('21700 li-ion');
      setBatteryCapacity('4500mah per cell');
      setBatteryConfiguration('12s8p');
      setMileage('Approx. 45 miles per charge. Note that mileage will depend on a lot of factors such as: type of wheel, terrain conditions, motor configuration, etc.');
    }
  }


  const renderImageContainer = () => (
    <div className='render_image_container'>
      <p></p>
      {boardsData.length > 0 ? (
        <>
          {boardsData.map((board, index) => (
            <div key={index}>
              {board.wheel_type.toLowerCase().includes('pneumatic') ? (
                <img src={imageURL} alt="All Terrain Board" style={{ maxWidth: '100%' }} />
              ) : (
                <img src={imageURL} alt="Street Board" style={{ maxWidth: '100%' }} />
              )}
            </div>
          ))}
        </>
      ) : (
        <p>No board data available. Click <strong>"Generate Board"</strong> to fetch data.</p>
      )}
    </div>
  );

  const renderBoardSpecs = () => (
    <div className='render_board_specs'>
      <h2>Build Specs</h2>
      {boardsData.length > 0 ? (
        <ul>
          {boardsData.map((board, index) => (
            <div key={index}>
              <ul>
              <strong> Deck </strong>
                <li>Deck Type: {board.deck_type}</li>
                <li>Deck Length: {board.deck_length}</li>
                <li>Deck Material: {board.deck_material}</li>
              <strong> Truck </strong>
                <li>Truck Type: {board.truck_type}</li>
                <li>Truck Width: {board.truck_width}</li>
              <strong> Controller </strong>
                <li>Controller Feature: {board.controller_feature}</li>
                <li>Controller Type: {board.controller_type}</li>
              <strong> Remote </strong>
                <li>Remote Feature: {board.remote_feature}</li>
                <li>Remote Type: {board.remote_type}</li>
              <strong> Motor </strong>
                <li>Motor Size: {board.motor_size}</li>
                <li>Motor Kv: {board.motor_kv}</li>
              <strong> Wheel </strong>
                <li>Wheel Size: {board.wheel_size}</li>
                <li>Wheel Type: {board.wheel_type}</li>
              <strong> Battery </strong>
                <li>Battery Voltage: {board.battery_voltage}</li>
                <li>Battery Type: {board.battery_type}</li>
                <li>Battery Capacity: {board.battery_capacity}</li>
                <li>Battery Configuration: {board.battery_configuration}</li>
              <strong> Range </strong>
                <li>Range: {board.range_mileage}</li>
              </ul>
            </div>
          ))}
        </ul>
      ) : (
        <p>No board data available. Click <strong>"Generate Board"</strong> to fetch data.</p>
      )}
    </div>
  );

  return (
    <div className='generate'>
      <h2>Build Generator</h2>

      {/* Dropdowns */}
      <label>
        <strong>Rider Level: </strong>
        <select value={riderLevel} onChange={(e) => setRiderLevel(e.target.value)}>
          <option value="">Select Rider Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Expert">Expert</option>
        </select>
      </label>
      <br />

      <label>
        <strong>Rider Style: </strong>
        <select value={motorPower} onChange={(e) => setMotorPower(e.target.value)}>
          <option value="">Select Rider Style</option>
          <option value="Drag Racing">Drag Racing</option>
          <option value="Casual Cruising">Casual Cruising</option>
          <option value="Hill Climbing">Hill Climbing</option>
        </select>
      </label>
      <br />

      <label>
        <strong>Terrain Type: </strong>
        <select value={terrainType} onChange={(e) => setTerrainType(e.target.value)}>
          <option value="">Select Terrain Type</option>
          <option value="Street">Street</option>
          <option value="All Terrain">All Terrain</option>
        </select>
      </label>
      <br />

      <label>
        <strong>Range Type: </strong>
        <select value={rangeType} onChange={(e) => setRangeType(e.target.value)}>
          <option value="">Select Range Type</option>
          <option value="Normal">Normal</option>
          <option value="Extended">Extended</option>
        </select>
      </label>
      <br />

      {/* Generate Board Button */}
      <button onClick={ handleGenerateBoard }>Generate Board</button>

      {/* Display Images (To be added later) */}
      { renderImageContainer() }

      {/* Display Board Specs */}
      { renderBoardSpecs() }

    </div>
  );
};

export default Generate;










// import React, { useState, useEffect } from 'react';

// // Import images
// import st_img1 from './images/ID1.jpg';
// import st_img2 from './images/ID2.jpeg';
// import st_img3 from './images/ID5.jpeg';
// import st_img4 from './images/ID6.jpeg';
// import at_img1 from './images/ID7.jpg';
// import at_img2 from './images/ID4.jpeg';
// import at_img3 from './images/ID3.jpg';


// function Generate() {
//   const [boardsData, setBoardsData] = useState([]);
//   const [riderLevel, setRiderLevel] = useState('');
//   const [motorPower, setMotorPower] = useState('');
//   const [terrainType, setTerrainType] = useState('');
//   const [rangeType, setRangeType] = useState('');

//   const [deckType, setDeckType] = useState('');
//   const [deckLength, setDeckLength] = useState('');
//   const [deckMaterial, setDeckMaterial] = useState('');
//   const [truckType, setTruckType] = useState('');
//   const [truckWidth, setTruckWidth] = useState('');
//   const [controllerFeature, setControllerFeature] = useState('');
//   const [controllerType, setControllerType] = useState('');
//   const [remoteFeature, setRemoteFeature] = useState('');
//   const [remoteType, setRemoteType] = useState('');
//   const [motorSize, setMotorSize] = useState('');
//   const [motorKv, setMotorKv] = useState('');
//   const [wheelSize, setWheelSize] = useState('');
//   const [wheelType, setWheelType] = useState('');
//   const [batteryVoltage, setBatteryVoltage] = useState('');
//   const [batteryType, setBatteryType] = useState('');
//   const [batteryCapacity, setBatteryCapacity] = useState('');
//   const [batteryConfiguration, setBatteryConfiguration] = useState('');
//   const [mileage, setMileage] = useState('');

//   const handleGenerateBoard = async () => {
//     // Set values for board spec based on user's selection input
//     if (riderLevel === 'Beginner') {
//       setTruckType('Single Kingspin'); 
//       setTruckWidth('10in.');
//       setControllerFeature('test');  ///research what this feature is!!!
//       setControllerType('Meepo ESC');  ////research on available branded ESCs!!!
//       setRemoteFeature('Regen Braking, Reverse, LCD Display');
//       setRemoteType('Thumb-Style Throttle');
//       setDeckType('test');  ///look up a beginner board!!
//       setDeckLength('38in.');
//       setDeckMaterial('7-ply plywood');
//     } else if (riderLevel === 'Intermediate') {
//       setTruckType('Double Kingspin');
//       setTruckWidth('12in.');
//       setControllerFeature('test');  ///research what this feature is!!!
//       setControllerType('VESC 4.6');
//       setRemoteFeature('Regen Braking, Reverse, Cruise-Control, LCD Display, Macro Buttons');
//       setRemoteType('Trigger-Style Throttle');
//       setDeckType('Drop-Thru');
//       setDeckLength('42in.');
//       setDeckMaterial('Carbon Fiber');
//     } else if (riderLevel === 'Expert') {
//       setTruckType('MTB Spring Loaded');
//       setTruckWidth('16in.');
//       setControllerFeature('test');  ///research what this feature is!!!
//       setControllerType('VESC 6.1');
//       setRemoteFeature('Regen Braking, Reverse, Cruise Control, LCD Display, Macro Buttons, Ride Mode Toggle');
//       setRemoteType('Trigger-Style Throttle');
//       setDeckType('MTB Flex Board'); ///research on the type!!!
//       setDeckLength('42in.');
//       setDeckMaterial('test'); ////research on this!!!
//     }

//     if (motorPower === 'Drag Racing') {
//       setMotorSize('6374');
//       setMotorKv('235kv');
//     } else if (motorPower === 'Casual Cruising') {
//       setMotorSize('6356');
//       setMotorKv('190kv');
//     } else if (motorPower === 'Hill Climbing') {
//       setMotorSize('6384');
//       setMotorKv('170kv');
//     }

//     if (terrainType === 'Street') {
//       setWheelSize('90mm');
//       setWheelType('78A');
//     } else if (terrainType === 'All Terrain') {
//       setWheelSize('175mm');
//       setWheelType('Pneumatic');
//     }

//     if (rangeType === 'Normal') {
//       setBatteryVoltage('37v Nominal');
//       setBatteryType('18650 li-ion');
//       setBatteryCapacity('3500mah per cell');
//       setBatteryConfiguration('10s4p');
//       setMileage('Approx. 20 miles per charge. Note that mileage will depend on a lot of factors such as: type of wheel, terrain conditions, motor configuration, etc.');
//     } else if (rangeType === 'Extended') {
//       setBatteryVoltage('44.4v Nominal');
//       setBatteryType('21700 li-ion');
//       setBatteryCapacity('4500mah per cell');
//       setBatteryConfiguration('12s6p');
//       setMileage('Approx. 35 miles per charge. Note that mileage will depend on a lot of factors such as: type of wheel, terrain conditions, motor configuration, etc.');
//     }


//     useEffect(() => {
//       const updateBoardData = async () => {
//         // Post user's input to the Flask backend
//         await fetch('/update_board', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             deckType,
//             deckLength,
//             deckMaterial,
//             truckType,
//             truckWidth,
//             controllerFeature,
//             controllerType,
//             remoteFeature,
//             remoteType,
//             motorSize,
//             motorKv,
//             wheelSize,
//             wheelType,
//             batteryVoltage,
//             batteryType,
//             batteryCapacity,
//             batteryConfiguration,
//             mileage,
//           }),
//         });
  
//         // Fetch the latest board
//         const response = await fetch('/latest_boards');
//         if (response.ok) {
//           const latestBoard = await response.json();
  
//           // Set the latest board in the state
//           setBoardsData([latestBoard]);
//         } else {
//           // Handle the case where the latest board is not found
//           console.error('Error fetching latest board');
//         }
//       };
  
//       // Check if any of the relevant state variables have changed
//       if (
//         deckType !== '' ||
//         deckLength !== '' ||
//         deckMaterial !== '' ||
//         truckType !== '' ||
//         truckWidth !== ''
//         // ... (Check other state variables as needed)
//       ) {
//         // If any of the state variables have changed, update the board data
//         updateBoardData();
//       }
//     }, [deckType, deckLength, deckMaterial, truckType, truckWidth /* ... (Other dependencies) */]);
//   }
  

//   let street_images = [st_img1, st_img2, st_img3, st_img4]
//   let all_terrain_images = [at_img1, at_img2, at_img3]

//   let random_ST_index = Math.floor(Math.random() * street_images.length);
//   let random_ST_Image = street_images[random_ST_index];

//   let random_AT_index = Math.floor(Math.random() * all_terrain_images.length);
//   let random_AT_Image = all_terrain_images[random_AT_index];


//   const renderImageContainer = () => (
//     <div>
//       <h2>Image goes here</h2>
//       {boardsData.length > 0 ? (
//         <>
//           {boardsData.map((board, index) => (
//             <div key={index}>
//               {board.wheel_type.toLowerCase().includes('pneumatic') ? (
//                 <img src={random_AT_Image} alt="All Terrain Board" style={{ maxWidth: '100%' }} />
//               ) : (
//                 <img src={random_ST_Image} alt="Street Board" style={{ maxWidth: '100%' }} />
//               )}
//             </div>
//           ))}
//         </>
//       ) : (
//         <p>No board data available. Click "Generate Board" to fetch data.</p>
//       )}
//     </div>
//   );



//   const renderBoardSpecs = () => (
//     <div>
//       <h2>Sample Board Build</h2>
//       {boardsData.length > 0 ? (
//         <ul>
//           {boardsData.map((board, index) => (
//             <div key={index}>
//               <strong>Sample Specs</strong>
//               <ul>
//                 <li>Deck Type: {board.deck_type}</li>
//                 <li>Deck Length: {board.deck_length}</li>
//                 <li>Deck Material: {board.deck_material}</li>
//                 <li>Truck Type: {board.truck_type}</li>
//                 <li>Truck Width: {board.truck_width}</li>
//                 <li>Controller Feature: {board.controller_feature}</li>
//                 <li>Controller Type: {board.controller_type}</li>
//                 <li>Remote Feature: {board.remote_feature}</li>
//                 <li>Remote Type: {board.remote_type}</li>
//                 <li>Motor Size: {board.motor_size}</li>
//                 <li>Motor Kv: {board.motor_kv}</li>
//                 <li>Wheel Size: {board.wheel_size}</li>
//                 <li>Wheel Type: {board.wheel_type}</li>
//                 <li>Battery Voltage: {board.battery_voltage}</li>
//                 <li>Battery Type: {board.battery_type}</li>
//                 <li>Battery Capacity: {board.battery_capacity}</li>
//                 <li>Battery Configuration: {board.battery_configuration}</li>
//                 <li>Range: {board.range_mileage}</li>
//               </ul>
//             </div>
//           ))}
//         </ul>
//       ) : (
//         <p>No board data available. Click "Generate Board" to fetch data.</p>
//       )}
//     </div>
//   );

//   return (
//     <div>
//       <h2>Sample Build Generator</h2>

//       {/* Dropdowns */}
//       <label>
//         Rider Level:
//         <select value={riderLevel} onChange={(e) => setRiderLevel(e.target.value)}>
//           <option value="">Select Rider Level</option>
//           <option value="Beginner">Beginner</option>
//           <option value="Intermediate">Intermediate</option>
//           <option value="Expert">Expert</option>
//         </select>
//       </label>
//       <br />

//       <label>
//         Rider Style:
//         <select value={motorPower} onChange={(e) => setMotorPower(e.target.value)}>
//           <option value="">Select Rider Style</option>
//           <option value="Drag Racing">Drag Racing</option>
//           <option value="Casual Cruising">Casual Cruising</option>
//           <option value="Hill Climbing">Hill Climbing</option>
//         </select>
//       </label>
//       <br />

//       <label>
//         Terrain Type:
//         <select value={terrainType} onChange={(e) => setTerrainType(e.target.value)}>
//           <option value="">Select Terrain Type</option>
//           <option value="Street">Street</option>
//           <option value="All Terrain">All Terrain</option>
//         </select>
//       </label>
//       <br />

//       <label>
//         Range Type:
//         <select value={rangeType} onChange={(e) => setRangeType(e.target.value)}>
//           <option value="">Select Range Type</option>
//           <option value="Normal">Normal</option>
//           <option value="Extended">Extended</option>
//         </select>
//       </label>
//       <br />

//       {/* Generate Board Button */}
//       <button onClick={handleGenerateBoard}>Generate Board</button>

//       {/* Display Images (To be added later) */}
//       {renderImageContainer()}

//       {/* Display Board Specs */}
//       {renderBoardSpecs()}

//     </div>
//   );
// };

// export default Generate;























    // useEffect(() => {
    //   const updateBoardData = async () => {
    //     // Post user's input to the Flask backend
    //     await fetch('/update_board', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         deckType,
    //         deckLength,
    //         deckMaterial,
    //         truckType,
    //         truckWidth,
    //         controllerFeature,
    //         controllerType,
    //         remoteFeature,
    //         remoteType,
    //         motorSize,
    //         motorKv,
    //         wheelSize,
    //         wheelType,
    //         batteryVoltage,
    //         batteryType,
    //         batteryCapacity,
    //         batteryConfiguration,
    //         mileage,
    //       }),
    //     });

    //     // Fetch the latest board
    //     const response = await fetch('/latest_boards');
    //     if (response.ok) {
    //       const latestBoard = await response.json();

    //       // Set the latest board in the state
    //       setBoardsData([latestBoard]);
    //     } else {
    //       // Handle the case where the latest board is not found
    //       console.error('Error fetching latest board');
    //     }
    //   };

    //     // Check if any of the relevant state variables have changed
    //     if (
    //       deckType !== '' ||
    //       deckLength !== '' ||
    //       deckMaterial !== '' ||
    //       truckType !== '' ||
    //       truckWidth !== '' ||
    //       controllerFeature !== ''// ... (Check other state variables as needed)
    //     ) {
    //       // If any of the state variables have changed, update the board data
    //       updateBoardData();
    //     }
    //   }, [deckType, deckLength, deckMaterial, truckType, truckWidth /* ... (Other dependencies) */]);



















/*
  useEffect(() => {
    // Fetch data for initial dropdown options or other data if needed
    // ...

    // For demonstration purposes, using a placeholder array for board data
    setBoardsData([
      { id: 1, name: 'All Around Cruiser', specs: 'Specs for {boardsData.name}' }
      // Add more board data as needed
    ]);
  }, []);
*/




  // const handleGenerateBoard = () => {
  //   // Fetch data from 'Boards' model in Flask
  //   fetch('/boards')
  //     .then(response => response.json())
  //     .then(data => setBoardsData(data))
  //     .catch(error => console.error('Error fetching board data:', error));
  // };




  // const handleGenerateBoard = () => {
  //   // Fetch data from 'Boards' model in Flask based on selected options
  //   const queryString = `?rider_level=${riderLevel}&terrain_type=${terrainType}&range_type=${rangeType}`;

  //   fetch(`/boards${queryString}`)
  //     .then(response => response.json())
  //     .then(data => setBoardsData(data))
  //     .catch(error => console.error('Error fetching board data:', error));
  // };






  /*

  let street_images = [st_img1, st_img2, st_img3, st_img4]
  let all_terrain_images = [at_img1, at_img2, at_img3]

  let random_ST_index = Math.floor(Math.random() * street_images.length);
  let random_ST_Image = street_images[random_ST_index];

  let random_AT_index = Math.floor(Math.random() * all_terrain_images.length);
  let random_AT_Image = all_terrain_images[random_AT_index];

  const selectImage = (terrainType) => {
    // Add logic to match board specs and return the appropriate image
    if (terrainType === 'Street') {
      return random_ST_Image;
    } else if (terrainType === 'All Terrain') {
      return random_AT_Image;
    }
    // Add more cases for other board specs
  };
  
*/

