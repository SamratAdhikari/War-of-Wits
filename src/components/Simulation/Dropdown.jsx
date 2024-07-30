import { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import strategy_list from "../../assets/strategy_list.json";

const Dropdown = ({ label, onChange }) => {
    const [strategy, setStrategy] = useState("");

    const handleStrategyChange = (event) => {
        const newStrategy = event.target.value;
        setStrategy(newStrategy);
        onChange(newStrategy);
    };

    return (
        <Box sx={{ minWidth: 250 }}>
            <FormControl fullWidth>
                <InputLabel
                    id="strategy-select-label"
                    sx={{
                        color: "#5e3d31", // Color for the label
                        fontWeight: "bold", // Bold font for the label
                    }}
                >
                    {label}
                </InputLabel>
                <Select
                    labelId="strategy-select-label"
                    id="strategy-select"
                    value={strategy}
                    label={label}
                    onChange={handleStrategyChange}
                    sx={{
                        "& .MuiSelect-select": {
                            color: "#5e3d31", // Color for the selected value
                            fontWeight: "bold", // Bold font for the selected value
                        },
                        "& .MuiMenuItem-root": {
                            color: "#5e3d31", // Color for menu items
                            fontWeight: "bold", // Bold font for menu items
                        },
                        "& .MuiInputBase-root": {
                            color: "#5e3d31", // Color for the input field
                            fontWeight: "bold", // Bold font for the input field
                        },
                    }}
                >
                    {strategy_list.map(({ id, name }) => (
                        <MenuItem key={id} value={name}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

Dropdown.propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Dropdown;
