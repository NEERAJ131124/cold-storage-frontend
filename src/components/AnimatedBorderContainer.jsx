import React from "react";
import "../scss/AnimatedBorderContainer.css"; // We will create this CSS file

const AnimatedBorderContainer = ({ children }) => {
  return (
    <>
      {children ? (
        <figure className="animated-border-container">
          <div className="chart-circle">{children}</div>
        </figure>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default AnimatedBorderContainer;
