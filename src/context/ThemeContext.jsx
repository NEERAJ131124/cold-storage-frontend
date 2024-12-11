import React, { createContext, useState, useContext, useEffect } from "react";

// Theme styles for light and dark modes
const themeStyles = {
  light: {
    name: "light",
    backgroundColor: "#ffffff",
    bgColor: "#bbbbbb",
    textColor: "#343a40",
    stextColor: "#718096",
    headerBackground: "#ffffff",
    sidebarBackground: "#ffffff",
    linkHoverBackground: "#405494",
    linkHoverText: "#ffffff",
    shadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  dark: {
    name: "dark",
    backgroundColor: "#121212",
    bgColor: "#333333",
    textColor: "#ffffff",
    stextColor: "rgb(156 163 175)",
    headerBackground: "#1e1e1e",
    sidebarBackground: "#1e1e1e",
    linkHoverBackground: "#4b7bec",
    linkHoverText: "#ffffff",
    shadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
  },
};

// Create Theme Context
const ThemeContext = createContext();

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  // Check localStorage for saved theme, default to 'light' if not found
  const savedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(savedTheme);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Save theme to localStorage
  };

  useEffect(() => {
    // When the component mounts, we check and apply the saved theme from localStorage
    document.body.style.backgroundColor = themeStyles[theme].backgroundColor;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: themeStyles[theme], toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom Hook to use Theme Context
export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
