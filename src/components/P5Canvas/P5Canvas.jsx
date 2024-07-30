import PropTypes from "prop-types";
import "./P5Canvas.css";

const P5Canvas = ({ strategy1, strategy2 }) => {
    return (
        <div>
            <h2>Simulation Results</h2>
            <p>Strategy 1: {strategy1}</p>
            <p>Strategy 2: {strategy2}</p>
        </div>
    );
};

P5Canvas.propTypes = {
    strategy1: PropTypes.string.isRequired,
    strategy2: PropTypes.string.isRequired,
};

export default P5Canvas;
