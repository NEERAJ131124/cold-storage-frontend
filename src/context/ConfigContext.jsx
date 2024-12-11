import React, { createContext, useContext, useState, useEffect } from "react";

const ConfigContext = createContext();

export const useConfig = () => useContext(ConfigContext);

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("/config.json");
        const data = await response.json();
        setConfig(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching config:", error);
      }
    };

    fetchConfig();
  }, []);

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};
