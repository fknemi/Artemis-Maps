import React, { useState } from "react";
import Map from "./components/Map";
import StyleButtons from "./components/StyleButtons";
import DistanceDisplay from "./components/DistanceDisplay";
import { DarkModeContext } from "./context/DarkModeContext";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <div>
        <Map />
        <StyleButtons />
        <DistanceDisplay />
      </div>
    </DarkModeContext.Provider>
  );
};

export default App;
