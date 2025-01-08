import React, { useState } from "react";
import MapComponent from "../components/MapComponent";
import DistanceCalculator from "../components/DistanceCalculator";
import RealTimeTracker from "../components/RealTimeTracker";
import ThemeToggle from "../components/ThemeToggle";

const DemoPage = () => {
  const [points, setPoints] = useState([]);

  const handleMapClick = (latLng) => {
    setPoints([...points, latLng]);
  };

  return (
    <div className="demo-page">
      <ThemeToggle />
      <MapComponent points={points} onMapClick={handleMapClick} />
      <DistanceCalculator points={points} />
      <RealTimeTracker />
    </div>
  );
};

export default DemoPage;
