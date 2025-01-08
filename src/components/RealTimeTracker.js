import React, { useRef, useEffect, useState } from "react";
import L from "leaflet";

const RealTimeTracker = () => {
    const [location, setLocation] = useState({ lat: 51.505, lng: -0.09 });
    const mapRef = useRef(null); // Reference to the map container
    const markerRef = useRef(null); // Reference to the marker
    const mapInstance = useRef(null); // Reference to the map instance

    useEffect(() => {
        // Initialize the map only once
        if (!mapInstance.current && mapRef.current) {
            // Initialize the map if it's not already created
            mapInstance.current = L.map(mapRef.current).setView(
                [location.lat, location.lng],
                13
            );

            // Add OpenStreetMap tile layer
            L.tileLayer(
                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ).addTo(mapInstance.current);

            // Create and add the marker to the map
            markerRef.current = L.marker([location.lat, location.lng]).addTo(
                mapInstance.current
            );
        }

        // Real-time tracking simulation: updating the location every second
        const interval = setInterval(() => {
            setLocation((prevLocation) => {
                const newLat =
                    prevLocation.lat + (Math.random() * 0.001 - 0.0005); // Random change in lat
                const newLng =
                    prevLocation.lng + (Math.random() * 0.001 - 0.0005); // Random change in lng
                return { lat: newLat, lng: newLng };
            });
        }, 1000); // Update every second

        return () => clearInterval(interval); // Clean up on unmount
    }, [location]);

    useEffect(() => {
        // Update the marker position whenever the location changes
        if (markerRef.current) {
            markerRef.current.setLatLng([location.lat, location.lng]);
        }
    }, [location]);

    return <div ref={mapRef} style={{ height: "500px", width: "100%" }} />;
};

export default RealTimeTracker;
