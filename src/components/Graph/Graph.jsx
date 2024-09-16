import { Line, Bar } from "react-chartjs-2";
import PropTypes from "prop-types";
import "./Graph.css";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register chart components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Graph = ({ strategy1, strategy2, points1, points2 }) => {
    const lineData = {
        labels: Array.from({ length: 31 }, (_, i) => `${i + 1}`),
        datasets: [
            {
                label: strategy1,
                data: points1,
                borderColor: "purple",
                backgroundColor: "rgba(130, 92, 219, 0.2)",
                fill: false,
            },
            {
                label: strategy2,
                data: points2,
                borderColor: "orange",
                backgroundColor: "rgba(255, 165, 0, 0.2)",
                fill: false,
            },
        ],
    };

    const totalPoints1 = points1.reduce((a, b) => a + b, 0);
    const totalPoints2 = points2.reduce((a, b) => a + b, 0);

    const barData = {
        labels: [strategy1, strategy2],
        datasets: [
            {
                data: [totalPoints1, totalPoints2],
                backgroundColor: ["purple", "orange"],
                borderColor: ["rgba(128, 0, 128, 1)", "rgba(255, 165, 0, 1)"],
                borderWidth: 1,
                barThickness: 70,
            },
        ],
    };

    const barTextPlugin = {
        id: "barTextPlugin",
        afterDatasetsDraw(chart) {
            const { ctx, data } = chart;
            ctx.font = "bold 14px"; // Use the default font-family
            ctx.textAlign = "center";
            ctx.fillStyle = "#000";
            data.datasets[0].data.forEach((value, index) => {
                const meta = chart.getDatasetMeta(0);
                const bar = meta.data[index];
                ctx.fillText(value, bar.x, bar.y - 5);
            });
        },
    };

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                min: 0,
                max: 31,
            },
            y: {
                min: -1,
                max: 6,
            },
        },
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 110,
            },
            x: {
                ticks: {
                    font: {
                        weight: "bold",
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            barTextPlugin: barTextPlugin,
        },
    };

    return (
        <div className="graph-container">
            <div className="line-graph">
                <Line data={lineData} options={lineOptions} />
            </div>
            <div className="bar-graph">
                <Bar
                    data={barData}
                    options={barOptions}
                    plugins={[barTextPlugin]}
                />
            </div>
        </div>
    );
};

Graph.propTypes = {
    strategy1: PropTypes.string.isRequired,
    strategy2: PropTypes.string.isRequired,
    points1: PropTypes.array.isRequired,
    points2: PropTypes.array.isRequired,
};

export default Graph;
