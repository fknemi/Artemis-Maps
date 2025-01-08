import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import Directions from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions"; // Temporary Workaround See https://github.com/mapbox/mapbox-gl-directions/issues/157

const Map = () => {
    const { isDarkMode } = useContext(DarkModeContext);

    const point1 = [75.88104, 22.76251];
    const point2 = [75.88305, 22.7659];

    useEffect(() => {
        mapboxgl.accessToken = "";

        const map = new mapboxgl.Map({
            container: "map",
            style: isDarkMode
                ? "mapbox://styles/mapbox/dark-v10"
                : "mapbox://styles/mapbox/satellite-streets-v11",
            center: point1,
            zoom: 15,
        });

        const navigationControls = new mapboxgl.NavigationControl();
        map.addControl(navigationControls, "top-left");

        const directionsControl = new Directions({
            accessToken: mapboxgl.accessToken,
            unit: "imperial",
        });

        map.addControl(directionsControl, "top-left");

        directionsControl.setOrigin(point1);
        directionsControl.setDestination(point2);

        map.on("load", function () {
            addLineBetweenPoints(map, point1, point2);
        });

        return () => map.remove();
    }, [isDarkMode]);

    const addLineBetweenPoints = (map, start, end) => {
        const lineData = {
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: [start, end],
            },
        };

        if (!map.getLayer("route")) {
            map.addSource("route", {
                type: "geojson",
                data: lineData,
            });

            map.addLayer({
                id: "route",
                type: "line",
                source: "route",
                layout: {
                    "line-join": "round",
                    "line-cap": "round",
                },
                paint: {
                    "line-color": "#ff0000",
                    "line-width": 5,
                },
            });
        } else {
            map.getSource("route").setData(lineData);
        }
    };

    return <div id="map"></div>;
};

export default Map;
