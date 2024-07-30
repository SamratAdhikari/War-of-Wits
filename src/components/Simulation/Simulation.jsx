import Button from "@mui/material/Button";
import Dropdown from "./Dropdown";
import P5Canvas from "../P5Canvas/P5Canvas.jsx";
import simIcon from "../../assets/images/swords.png";
import { useState } from "react";
import "./Simulation.css";

const Simulation = () => {
    const [strategy1, setStrategy1] = useState("");
    const [strategy2, setStrategy2] = useState("");
    const [showCanvas, setShowCanvas] = useState(false);

    const handleSimulation = () => {
        setShowCanvas(!showCanvas);
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
                {showCanvas && (
                    <P5Canvas strategy1={strategy1} strategy2={strategy2} />
                )}
            </div>
        </>
    );
};

export default Simulation;
