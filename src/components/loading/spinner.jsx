import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const SpinnerLoading = () => {
    {/* Customized Circular Progress Spinner */ }
    return (
        <CircularProgress
            size={80} // Size of the spinner
            thickness={4} // Thickness of the spinner line
            sx={{
                color: "transparent", // Hide default color
                "& .MuiCircularProgress-circle": {
                    stroke: "linear-gradient(90deg, #d3d3d3, #a9a9a9, #696969)", // Gradient gray colors
                    animation: "spin 2s linear infinite", // Add spin animation for gradient effect
                },
            }}
        />
    );
};

export default SpinnerLoading;