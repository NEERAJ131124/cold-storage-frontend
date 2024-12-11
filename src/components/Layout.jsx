import { Toaster } from "react-hot-toast";
import { FaMoon, FaSun, FaBars } from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import AppFooter from "./AppFooter";

import { useEffect, useState } from "react";
import { logoutHandler } from "../constants/Functions";
import { NavLinks } from "../constants/NavLinks";

const Layout = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [pictureData, setPictureData] = useState("");
  const [isSidebarHidden, setSidebarHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900); // Screen size state

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleSidebar = () => {
    setSidebarHidden(!isSidebarHidden);
  };

  const handleResize = () => {
    const mobileView = window.innerWidth < 900;
    setIsMobile(mobileView);
    if (!mobileView) {
      setSidebarHidden(false); // Always show sidebar on large screens
    }
  };

  useEffect(() => {
    window.innerWidth < 900 ? setSidebarHidden(true) : setSidebarHidden(false);
  }, []);

  const handleLinkClick = () => {
    if (isMobile) {
      setSidebarHidden(true); // Hide sidebar when a link is clicked in mobile mode
    }
  };

  const getPicture = async () => {
    const picture = localStorage.getItem("employeePicture");
    setPictureData(JSON.parse(picture));
  };

  useEffect(() => {
    if (localStorage.getItem("employeePicture")) {
      getPicture();
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="flex flex-col h-screen w-screen min-h-screen overflow-hidden"
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
      }}
    >
      <Toaster />
      {/* Header */}
      <header
        className="flex h-[11vh] items-center justify-between w-[98%] py-2 m-auto border-b"
        style={{
          backgroundColor: theme.sidebarBackground,
        }}
      >
        <div className="w-full rounded-lg h-full px-2 pl-[2px] flex justify-between items-center">
          <span className="font-semibold text-xl md:text-2xl">
            <div
              onClick={() => navigate("/work/dashboard")}
              className="flex cursor-pointer items-center mr-[8px] md:px-2 bg-white rounded-md overflow-hidden"
            >
              <img
                src={"logo"}
                alt="Logo"
                className="w-full h-10 object-contain"
              />
            </div>
          </span>
          <div className="flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-700 text-white"
              aria-label="Toggle Theme"
            >
              {theme.name === "light" ? <FaMoon /> : <FaSun />}
            </button>

            {/* Sidebar Toggle Button */}
            <button
              onClick={toggleSidebar}
              className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-700 text-white"
              aria-label="Toggle Sidebar"
            >
              <FaBars />
            </button>

            {/* User Icon and Dropdown Menu */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className={`${
                  theme.name === "light"
                    ? "bg-white text-gray-700"
                    : "bg-gray-800 text-gray-100"
                } h-10 w-10 rounded-full flex items-center justify-center`}
                aria-label="User menu"
              >
                <img
                  src={`data:image/png;base64,${pictureData}`}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </button>
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div
                  className={`${
                    theme.name === "light" ? "bg-white" : "bg-gray-800"
                  } absolute z-10 right-0 flex flex-col mt-2 w-40 border-[1px] `}
                  style={{
                    backgroundColor: theme.dropdownBackground,
                    color: theme.textColor,
                    // border: `1px solid ${theme.textColor}`,
                  }}
                >
                  <NavLink
                    to="profile"
                    className={`block btn_cont text-sm w-full hover:scale-[1.09] transition-all ease-out ${
                      theme.name === "light" ? "text-black" : "text-gray-100"
                    }`}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <button className="btn-4">
                      <span
                        className={`p-0 m-0 flex items-left py-2 pr-2 pl-2 w-[148px]`}
                        style={{ color: theme.textColor }}
                      >
                        Profile
                      </span>
                    </button>
                  </NavLink>
                  <div
                    className="block cursor-pointer btn_cont hover:scale-[1.09] transition-all ease-out"
                    onClick={() => logoutHandler()}
                  >
                    <button className="btn-4">
                      <span
                        className={`p-0 m-0 flex items-left py-2 pr-2 pl-2 w-[148px]`}
                        style={{ color: theme.textColor }}
                      >
                        Logout
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-row flex-grow h-[77vh] md:h-[79vh] mt-2">
        {/* Sidebar */}
        {!isSidebarHidden && (
          <aside
            className={`${
              isMobile
                ? "fixed top-0 -left-[1.2vw] h-full min-w-[50vw] z-20"
                : "min-w-[240px] h-[77vh] md:h-[79vh]"
            } border-r transition-transform duration-300 w-fit`}
            style={{
              backgroundColor: theme.sidebarBackground,
            }}
          >
            {/* Navigation */}
            <nav className="space-y-2 p-2 w-fit overflow-x-hidden min-w-[230px]">
              {NavLinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.to}
                  className={({ isActive }) =>
                    `w-fit rounded min-w-[220px] hover:scale-[1.05] ease-out  flex outline-none transition duration-200 ${
                      isActive ? "bg-[#405494] nav-link-active text-[#fff]" : ""
                    }`
                  }
                  onClick={handleLinkClick}
                >
                  <div className="btn_cont">
                    <button className="btn-4">
                      <span
                        className={`p-0 m-0 flex items-center justify-start py-2 pr-2 pl-2 w-[220px]`}
                      >
                        <span className="w-4 mr-[4px]">{link.icon}</span>
                        <span className="responsive-sm-text uppercase">
                          {link.label}
                        </span>
                      </span>
                    </button>
                  </div>
                </NavLink>
              ))}
            </nav>
          </aside>
        )}

        {/* Main Outlet */}
        <main
          className={`${
            isSidebarHidden ? "w-full" : "flex-grow"
          } h-[77vh] md:h-[79vh] overflow-y-auto pl-[5px]`}
          style={{
            backgroundColor: theme.sidebarBackground,
            color: theme.textColor,
            borderColor: theme.textColor,
          }}
        >
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <AppFooter position="fixed" />
    </div>
  );
};

export default Layout;
