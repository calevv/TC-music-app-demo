import React from "react";
import { HashLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div
      style={{
        position: "fixed",
        transform: "translate(-50%,-50%)",
        top: "50%",
        left: "50%",
      }}
    >
      <HashLoader color="#1ed760" size={50} speedMultiplier={1} />
    </div>
  );
};

export default LoadingSpinner;
