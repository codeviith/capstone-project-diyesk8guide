import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

/////MAIN COMPONENT CODE:
function Generate() {
  const [boardsData, setBoardsData] = useState([]);
  const [riderLevel, setRiderLevel] = useState("");
  const [motorPower, setMotorPower] = useState("");
  const [terrainType, setTerrainType] = useState("");
  const [rangeType, setRangeType] = useState("");
  const [deckType, setDeckType] = useState("");
  const [deckLength, setDeckLength] = useState("");
  const [deckMaterial, setDeckMaterial] = useState("");
  const [truckType, setTruckType] = useState("");
  const [truckWidth, setTruckWidth] = useState("");
  const [controllerFeature, setControllerFeature] = useState("");
  const [controllerType, setControllerType] = useState("");
  const [remoteFeature, setRemoteFeature] = useState("");
  const [remoteType, setRemoteType] = useState("");
  const [motorSize, setMotorSize] = useState("");
  const [motorKv, setMotorKv] = useState("");
  // const [speed, setSpeed] = useState(""); 
  const [wheelSize, setWheelSize] = useState("");
  const [wheelType, setWheelType] = useState("");
  const [batteryVoltage, setBatteryVoltage] = useState("");
  const [batteryType, setBatteryType] = useState("");
  const [batteryCapacity, setBatteryCapacity] = useState("");
  const [batteryConfiguration, setBatteryConfiguration] = useState("");
  const [mileage, setMileage] = useState("");
  const [boardGenerated, setBoardGenerated] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { isLoggedIn } = useContext(AuthContext);
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:5555';


  useEffect(() => {
    const updateBoardData = async () => {
      await fetch("/update_board", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
          // speed,
          wheelSize,
          wheelType,
          batteryVoltage,
          batteryType,
          batteryCapacity,
          batteryConfiguration,
          mileage
        }),
      });

      const response = await fetch("/latest_boards");
      if (response.ok) {
        const latestBoard = await response.json();

        setBoardsData([latestBoard]);
      } else {
        console.error("Error fetching latest board");
      }
    };

    if (
      deckType !== "" ||
      deckLength !== "" ||
      deckMaterial !== "" ||
      truckType !== "" ||
      truckWidth !== "" ||
      controllerFeature !== "" ||
      controllerType !== "" ||
      remoteFeature !== "" ||
      remoteType !== "" ||
      motorSize !== "" ||
      motorKv !== "" ||
      // speed !== "" ||
      wheelSize !== "" ||
      wheelType !== "" ||
      batteryVoltage !== "" ||
      batteryType !== "" ||
      batteryCapacity !== "" ||
      batteryConfiguration !== "" ||
      mileage !== ""
    ) {
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
    // speed,
    wheelSize,
    wheelType,
    batteryVoltage,
    batteryType,
    batteryCapacity,
    batteryConfiguration,
    mileage
  ]);

  const handleGenerateBoard = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    if (!isLoggedIn) {
      alert("Please log in to use the Generate feature.");
      return;
    }

    const selections = [
      { value: riderLevel, name: "Rider Level" },
      { value: motorPower, name: "Rider Style" },
      { value: terrainType, name: "Terrain Type" },
      { value: rangeType, name: "Range Type" }
    ];

    const missingSelection = selections.find(selection => !selection.value);

    if (missingSelection) {
      setErrorMessage(`Please select an option for ${missingSelection.name}`);
      return;
    }

    try {
      if (riderLevel === "Beginner") {
        setTruckType("Single Kingspin");
        setTruckWidth("10in.");
        setControllerFeature(
          "Low Voltage Cutoff, Overheat Protection, Battery Eliminator Circuit, ABS Braking"
        );
        setControllerType("Flipsky ESC");
        setRemoteFeature("Regen Braking, Reverse, LCD Display");
        setRemoteType("Thumb-Style Throttle");
        setDeckType("Kicktail Cruiser");
        setDeckLength("38in.");
        setDeckMaterial("7-ply plywood");
      } else if (riderLevel === "Intermediate") {
        setTruckType("Double Kingspin");
        setTruckWidth("12in.");
        setControllerFeature(
          "Over-Voltage Protection, 3-12S, BEC, Low-Current Shunt, BLDC Mode, 80A Peak Current"
        );
        setControllerType("VESC 4.6");
        setRemoteFeature(
          "Regen Braking, Reverse, Cruise-Control, LCD Display, Macro Buttons"
        );
        setRemoteType("Trigger-Style Throttle");
        setDeckType("Drop-Through Carver");
        setDeckLength("42in.");
        setDeckMaterial("Carbon Fiber");
      } else if (riderLevel === "Expert") {
        setTruckType("MTB Spring Loaded");
        setTruckWidth("16in.");
        setControllerFeature(
          "Over-Voltage Protection, 3-12S, BEC, Low-Current Shunt, BLDC Mode, FOC Mode, 120A Peak Current, Sensorless Acceleration, Full Torque from 0RPM, Overheat Protection, Aluminum heatsink MOSFET"
        );
        setControllerType("VESC 6.1");
        setRemoteFeature(
          "Regen Braking, Reverse, Cruise Control, LCD Display, Macro Buttons, Ride Mode Toggle"
        );
        setRemoteType("Trigger-Style Throttle");
        setDeckType("35 Degrees MTB Flex");
        setDeckLength("42in.");
        setDeckMaterial("Carbon Fiber 16-Ply");
      }

      if (motorPower === "Drag Racing") {
        setMotorSize("6374");
        setMotorKv("235kv");
        // setSpeed("35mph");
      } else if (motorPower === "Casual Cruising") {
        setMotorSize("6356");
        setMotorKv("190kv");
        // setSpeed("28mph");
      } else if (motorPower === "Hill Climbing") {
        setMotorSize("6384");
        setMotorKv("170kv");
        // setSpeed("25mph");
      }

      if (terrainType === "Street") {
        setWheelSize("90mm");
        setWheelType("78A");
      } else if (terrainType === "All Rounded") {
        setWheelSize("107mm");
        setWheelType("Rubber");
      } else if (terrainType === "All Terrain") {
        setWheelSize("175mm");
        setWheelType("Pneumatic");
      } else if (terrainType === "Off-Road") {
        setWheelSize("228mm");
        setWheelType("Pneumatic");
      }

      if (rangeType === "Portable") {
        setBatteryVoltage("37v Nominal");
        setBatteryType("18650 li-ion");
        setBatteryCapacity("3000mah per cell");
        setBatteryConfiguration("10s2p");
        setMileage(
          "Approx. 15 miles per charge. Note that mileage will depend on a lot of factors such as: type of wheel, terrain conditions, motor configuration, etc."
        );
      } else if (rangeType === "Normal") {
        setBatteryVoltage("37v Nominal");
        setBatteryType("18650 li-ion");
        setBatteryCapacity("3500mah per cell");
        setBatteryConfiguration("10s4p");
        setMileage(
          "Approx. 22 miles per charge. Note that mileage will depend on a lot of factors such as: type of wheel, terrain conditions, motor configuration, etc."
        );
      } else if (rangeType === "Extended") {
        setBatteryVoltage("44.4v Nominal");
        setBatteryType("21700 li-ion");
        setBatteryCapacity("4500mah per cell");
        setBatteryConfiguration("12s8p");
        setMileage(
          "Approx. 45 miles per charge. Note that mileage will depend on a lot of factors such as: type of wheel, terrain conditions, motor configuration, etc."
        );
      }

      setSuccessMessage("Board generated successfully.");
      setTimeout(() => { setSuccessMessage("") }, 3000)

      setBoardGenerated(true);
    } catch (error) {
      setErrorMessage("Failed to generate board. Please try again.");
    }
  };

  const renderBoardSpecs = () => {
    return boardGenerated && (
      <div className="render-board-specs">
        <h2>Build Specs</h2>
        {boardsData.length > 0 ? (
          <ul>
            {boardsData.map((board, index) => (
              <div className="generate-board-div" key={index}>
                <ul className="generate-board-spec">
                  <strong className="generate-board-strong"> Deck </strong>
                  <div className="board-list-div">
                    <li>Deck Type: {board.deck_type}</li>
                    <li>Deck Length: {board.deck_length}</li>
                    <li>Deck Material: {board.deck_material}</li>
                  </div>
                  <strong className="generate-board-strong"> Truck </strong>
                  <div className="board-list-div">
                    <li>Truck Type: {board.truck_type}</li>
                    <li>Truck Width: {board.truck_width}</li>
                  </div>
                  <strong className="generate-board-strong"> Controller </strong>
                  <div className="board-list-div">
                    <li>Controller Feature: {board.controller_feature}</li>
                    <li>Controller Type: {board.controller_type}</li>
                  </div>
                  <strong className="generate-board-strong"> Remote </strong>
                  <div className="board-list-div">
                    <li>Remote Feature: {board.remote_feature}</li>
                    <li>Remote Type: {board.remote_type}</li>
                  </div>
                  <strong className="generate-board-strong"> Motor </strong>
                  <div className="board-list-div">
                    <li>Motor Size: {board.motor_size}</li>
                    <li>Motor Kv: {board.motor_kv}</li>
                  </div>
                  <strong className="generate-board-strong"> Wheel </strong>
                  <div className="board-list-div">
                    <li>Wheel Size: {board.wheel_size}</li>
                    <li>Wheel Type: {board.wheel_type}</li>
                  </div>
                  <strong className="generate-board-strong"> Battery </strong>
                  <div className="board-list-div">
                    <li>Battery Voltage: {board.battery_voltage}</li>
                    <li>Battery Type: {board.battery_type}</li>
                    <li>Battery Capacity: {board.battery_capacity}</li>
                    <li>Battery Configuration: {board.battery_configuration}</li>
                  </div>
                  {/* <strong className="generate-board-strong"> Speed </strong>
                  <li>{board.speed}</li> */}
                  <strong className="generate-board-strong"> Range </strong>
                  <div className="board-list-div">
                    <li>{board.range_mileage}</li>
                  </div>
                </ul>
              </div>
            ))}
          </ul>
        ) : null}
      </div>
    );
  };


  return (
    <div className="generate">
      {isLoggedIn ? (
        <>
          <h2>Build Generator</h2>

          {/* Dropdowns */}
          <label>
            <strong>Rider Level: </strong>
            <select
              value={riderLevel}
              onChange={(e) => setRiderLevel(e.target.value)}
            >
              <option value="">Select Rider Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </label>
          <br />

          <label>
            <strong>Rider Style: </strong>
            <select
              value={motorPower}
              onChange={(e) => setMotorPower(e.target.value)}
            >
              <option value="">Select Rider Style</option>
              <option value="Drag Racing">Drag Racing</option>
              <option value="Casual Cruising">Casual Cruising</option>
              <option value="Hill Climbing">Hill Climbing</option>
            </select>
          </label>
          <br />

          <label>
            <strong>Terrain Type: </strong>
            <select
              value={terrainType}
              onChange={(e) => setTerrainType(e.target.value)}
            >
              <option value="">Select Terrain Type</option>
              <option value="Street">Street</option>
              <option value="All Rounded">All Rounded</option>
              <option value="All Terrain">All Terrain</option>
              <option value="Off-Road">Off-Road</option>
            </select>
          </label>
          <br />

          <label>
            <strong>Range Type: </strong>
            <select
              value={rangeType}
              onChange={(e) => setRangeType(e.target.value)}
            >
              <option value="">Select Range Type</option>
              <option value="Portable">Portable</option>
              <option value="Normal">Normal</option>
              <option value="Extended">Extended</option>
            </select>
          </label>
          <br />

          {/* Display success or error messages */}
          {successMessage && <div className="success-message">{successMessage}</div>}
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          {/* Generate Board Button */}
          <button onClick={handleGenerateBoard}>Generate Board</button>

          {/* Display Board Specs */}
          {renderBoardSpecs()}
        </>
      ) : (
        <p>Please log in to access the Generate feature.</p>
      )}
    </div>
  );
}

export default Generate;

