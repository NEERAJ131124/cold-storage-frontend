import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const AppFooter = ({ position, color }) => {
  const { theme } = useTheme();
  return (
    <footer
      className="w-full left-0 bottom-0 overflow-x-hidden z-1 h-fit max-h-[12vh] md:max-h-[9vh] p-[8px] md:pb-0 md:p-2 lg:p-2 px-0"
      style={{
        position: position,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)",
        zIndex: 1,
      }}
    >
      <div
        style={{ color: color }}
        className={`overflow-hidden w-full py-[2px] h-full flex items-center justify-center md:justify-around flex-wrap `}
      >
        {/* Footer Text */}
        <div className=" text-center responsive-sm-text">
          © 2023 Anthem Infotech Private Limited. All rights reserved.
        </div>

        {/* Powered By */}
        <div className="responsive-sm-text text-center">
          Powered By{" "}
          <NavLink
            to="https://www.antheminfotech.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              backgroundColor: "#03045e",
              color: "#fff",
              borderRadius: "5px",
              padding: "0.25rem 0.5rem",
            }}
          >
            Anthem Infotech Pvt. Ltd.
          </NavLink>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(AppFooter);
