import Button from "@mui/material/Button";
import Dropdown from "./Dropdown";
import Sketch from "../Sketch/Sketch.jsx";
import simIcon from "../../assets/images/swords.png";
import { useState } from "react";

import "./Simulation.css";

const Simulation = () => {
    const [strategy1, setStrategy1] = useState("");
    const [strategy2, setStrategy2] = useState("");
    const [showCanvas, setShowCanvas] = useState(false);

    const handleSimulation = () => {
        if (strategy1 && strategy2) {
            setShowCanvas(!showCanvas);
        }
    };

    return (
        <>
            <div className="strategy-container">
                <Dropdown label="Strategy 1" onChange={setStrategy1} />
                <Button
                    variant="text"
                    className="sim-button"
                    onClick={handleSimulation}
                >
                    <img
                        className="sim-button-img"
                        src={simIcon}
                        alt="Button Icon"
                    />
                </Button>
                <Dropdown label="Strategy 2" onChange={setStrategy2} />
            </div>

            <div>
                {showCanvas && <Sketch name1={strategy1} name2={strategy2} />}
            </div>
        </>
    );
};

export default Simulation;
