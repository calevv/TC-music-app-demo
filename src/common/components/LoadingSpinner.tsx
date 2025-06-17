import React from "react";
import { HashLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <HashLoader color="#1ed760" size={50} speedMultiplier={1} />
    </div>
  );
};

export default LoadingSpinner;
