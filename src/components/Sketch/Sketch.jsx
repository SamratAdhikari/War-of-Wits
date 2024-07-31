import PropTypes from "prop-types";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { useState, useEffect, useRef } from "react";
import StrategyManager from "./StrategyManager";
import strategyList from "../../assets/strategy_list.json";
import "./Sketch.css";

const bindStrategyFunction = (strategyName, choices) => {
    const strategy = strategyList.find((s) => s.name === strategyName);
    const funcName = strategy.func;

    const strategyManager = new StrategyManager(choices);

    return strategyManager[funcName].bind(strategyManager);
};

const Sketch = ({ name1, name2 }) => {
    const CANVAS_WIDTH = 810;
    const CANVAS_HEIGHT = 35;
    const CELL_SIZE = 20;
    const MARGIN = 5;
    const ROW_OFFSET = 10;
    const COL_OFFSET = 10;
    const ITERATIONS = 31;
    const delay = 1000;

    const [strategyChoices1, setStrategyChoices1] = useState([true]);
    const [strategyChoices2, setStrategyChoices2] = useState([true]);
    const [currentIteration, setCurrentIteration] = useState(0);

    const strategyFunc1 = useRef(bindStrategyFunction(name1, strategyChoices2));
    const strategyFunc2 = useRef(bindStrategyFunction(name2, strategyChoices1));

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentIteration >= ITERATIONS) {
                clearInterval(interval);
                return;
            }

            const newChoice1 = strategyFunc1.current();
            const newChoice2 = strategyFunc2.current();

            setStrategyChoices1((prev) => [...prev, newChoice1]);
            setStrategyChoices2((prev) => [...prev, newChoice2]);
            setCurrentIteration((prev) => prev + 1);
        }, delay);

        return () => clearInterval(interval);
    }, [currentIteration]);

    const sketch1 = (p) => {
        let previousIteration = 0;

        p.setup = () => {
            p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
        };

        p.draw = () => {
            for (let i = previousIteration; i < currentIteration; i++) {
                const x = COL_OFFSET + i * (CELL_SIZE + MARGIN);
                const y = ROW_OFFSET;
                p.fill(strategyChoices1[i] ? "green" : "red");
                p.rect(x, y, CELL_SIZE, CELL_SIZE);
            }
            previousIteration = currentIteration;
        };
    };

    const sketch2 = (p) => {
        let previousIteration = 0;

        p.setup = () => {
            p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
        };

        p.draw = () => {
            for (let i = previousIteration; i < currentIteration; i++) {
                const x = COL_OFFSET + i * (CELL_SIZE + MARGIN);
                const y = ROW_OFFSET;
                p.fill(strategyChoices2[i] ? "green" : "red");
                p.rect(x, y, CELL_SIZE, CELL_SIZE);
            }
            previousIteration = currentIteration;
        };
    };

    return (
        <div className="main-container">
            <div className="canvas-container">
                <div className="strategy-name">{name1}</div>
                <div className="strategy-squares">
                    <ReactP5Wrapper sketch={sketch1} />
                </div>
            </div>
            <div className="canvas-container">
                <div className="strategy-name">{name2}</div>
                <div className="strategy-squares">
                    <ReactP5Wrapper sketch={sketch2} />
                </div>
            </div>
        </div>
    );
};

Sketch.propTypes = {
    name1: PropTypes.string.isRequired,
    name2: PropTypes.string.isRequired,
};

export default Sketch;
