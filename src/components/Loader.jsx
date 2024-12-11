import React from "react";
import logo from "../assets/brand/icon.png";

const Loader = () => {
  return (
    <div className="loader-container flex items-center justify-center h-full w-full">
      <div className="loader"></div> {/* Rotating border */}
      <div className="loader-image absolute">
        <img src={logo} alt="Logo" className="object-contain" />
      </div>
    </div>
  );
};

export default Loader;
