import React, { useEffect, useState } from "react";
// import MapboxDirections from 'mapbox-gl-directions';
import mapboxgl from 'mapbox-gl';
import Directions from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';



const DistanceDisplay = () => {
    const [distanceText, setDistanceText] = useState("");

    useEffect(() => {
        const directionsControl = new Directions({
            accessToken: mapboxgl.accessToken,
        });

        directionsControl.on("route", (e) => {
            if (e.route.length > 0) {
                const distance = e.route[0].distance;
                const duration = e.route[0].duration;
                const distanceInMiles = (distance / 1609.34).toFixed(2);
                const durationInMinutes = (duration / 60).toFixed(1);
                setDistanceText(
                    `Distance: ${distanceInMiles} mi | Duration: ${durationInMinutes} min`
                );
            }
        });
    }, []);

    return <div id="distance">{distanceText}</div>;
};

export default DistanceDisplay;
