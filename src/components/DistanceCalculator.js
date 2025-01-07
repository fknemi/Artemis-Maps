import React, { useState } from "react";
import { haversine } from "../utils/haversine";

const DistanceCalculator = ({ points }) => {
  const calculateDistance = () => {
    if (points.length < 2) return null;
    let totalDistance = 0;
    for (let i = 0; i < points.length - 1; i++) {
      totalDistance += haversine(points[i], points[i + 1]);
    }
    return totalDistance.toFixed(2);
  };

  return (
    <div>
      <h3>Shortest Distance</h3>
      <p>
        {points.length >= 2
          ? `Total Distance: ${calculateDistance()} km`
          : "Add at least two points to calculate the distance."}
      </p>
    </div>
  );
};

export default DistanceCalculator;
