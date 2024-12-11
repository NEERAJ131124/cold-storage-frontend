import { Toaster } from "react-hot-toast";
import {
  FaHome,
  FaChartLine,
  FaCalendarAlt,
  FaFileAlt,
  FaGift,
  FaUsersCog,
  FaProjectDiagram,
  FaInfoCircle,
  FaMoon,
  FaSun,
  FaBars,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import AppFooter from "./AppFooter";
import logo from "../assets/brand/logo.png";
import "../scss/Button.scss";
import { useEffect, useState } from "react";
import { logoutHandler } from "../constants/Functions";

const AdminLayout = () => {
  const { theme, toggleTheme } = useTheme();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [pictureData, setPictureData] = useState("");
  const [isSidebarHidden, setSidebarHidden] = useState(true); // Sidebar is initially hidden
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
      <header className="flex items-center justify-between px-2 py-2 w-full rounded-md">
        <div
          className="border-[1px] shadow-lg w-full rounded-lg h-full px-4 flex justify-between items-center mb-2"
          style={{ backgroundColor: theme.sidebarBackground }}
        >
          <span className="font-semibold text-xl md:text-2xl">
            <div className="flex items-center px-2 bg-white rounded-md">
              <img src={logo} alt="Logo" className="w-full h-10" />
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
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                />
              </button>
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div
                  className={`
                    ${
                      theme.name === "light" ? "bg-white" : "bg-gray-800"
                    } absolute z-10 right-0 mt-2 w-40 rounded-md shadow-lg`}
                  style={{
                    backgroundColor: theme.dropdownBackground,
                    color: theme.textColor,
                  }}
                >
                  <NavLink
                    to="profile"
                    className={`block px-4 py-2 text-sm hover:bg-gray-400 ${
                      theme.name === "light" ? "text-black" : "text-gray-100"
                    }`}
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </NavLink>
                  <div
                    className="block cursor-pointer px-4 py-2 text-sm hover:bg-gray-400 "
                    onClick={() => logoutHandler()}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-row flex-grow">
        {/* Sidebar */}
        {!isSidebarHidden && (
          <aside
            className={`${
              isMobile
                ? "fixed top-0 -left-[1.2vw] h-full w-[70vw] z-20 shadow-lg"
                : "w-[20vw] h-[77vh]"
            } rounded-md shadow-lg border-[1px] mx-2 transition-transform duration-300`}
            style={{
              backgroundColor: theme.sidebarBackground,
              color: theme.textColor,
            }}
          >
            {/* Navigation */}
            <nav className="space-y-2 p-2">
              {[
                { to: "dashboard", icon: <FaHome />, label: "Home" },
                {
                  to: "employee",
                  icon: <FaChartLine />,
                  label: "Employees",
                },
                { to: "leaves", icon: <FaCalendarAlt />, label: "Leaves" },
                // { to: "docs", icon: <FaFileAlt />, label: "Documents" },
                // { to: "holidays", icon: <FaGift />, label: "Holidays" },
                // { to: "team", icon: <FaUsersCog />, label: "Our Team" },
                // {
                //   to: "projects",
                //   icon: <FaProjectDiagram />,
                //   label: "Projects",
                // },
                // { to: "info", icon: <FaInfoCircle />, label: "Information" },
              ].map((link, index) => (
                <NavLink
                  key={index}
                  to={link.to}
                  className={({ isActive }) =>
                    `py-2.5 rounded text-sm lg:text-md flex btn btn--hoverEffect outline-none transition duration-200 ${
                      isActive ? "bg-[#405494] text-white" : ""
                    }`
                  }
                  style={({ isActive }) => ({
                    backgroundColor: isActive
                      ? theme.linkHoverBackground
                      : "transparent",
                    color: isActive ? theme.linkHoverText : theme.textColor,
                  })}
                  onClick={handleLinkClick}
                >
                  {link.icon}
                  <span className="ml-2">{link.label}</span>
                </NavLink>
              ))}
            </nav>
          </aside>
        )}

        {/* Main Outlet */}
        <main
          className={`${
            isSidebarHidden ? "w-full" : "flex-grow"
          } h-[calc(88vh-60px)] overflow-y-auto border-[1px] py-2 overflow-x-auto rounded-md shadow-lg mx-2`}
          style={{
            backgroundColor: theme.sidebarBackground,
            color: theme.textColor,
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

export default AdminLayout;
