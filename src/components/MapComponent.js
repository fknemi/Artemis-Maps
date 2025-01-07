import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ points, onMapClick }) => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    mapRef.current = L.map(mapContainer.current, {
      center: [51.505, -0.09],
      zoom: 13,
    });
console.log(mapRef.current)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapRef.current);

    mapRef.current.on("click", (e) => {
      const latLng = e.latlng;
      onMapClick(latLng); // Notify parent to add points
    });

    return () => mapRef.current.remove();
  }, [onMapClick]);

  useEffect(() => {
    if (points.length > 0) {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = points.map((point) => {
        const marker = L.marker([point.lat, point.lng]).addTo(mapRef.current);
        return marker;
      });
    }
  }, [points]);

  return <div ref={mapContainer} style={{ height: "500px" }}></div>;
};

export default MapComponent;
