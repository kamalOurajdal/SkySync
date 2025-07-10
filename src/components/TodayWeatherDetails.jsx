import React from "react";
import WeatherWidget from "./WeatherWidget";
import { formatToLocalTime } from "../services/WeatherServices";

const TodayWeatherDetails = ({ currentWeather }) => {
    if (!currentWeather) return null;

    const {
        humidity,
        pressure,
        sunrise,
        sunset,
        speed,
        timezone,
    } = currentWeather;

    const sunsetTime = formatToLocalTime(sunset, timezone / 60, "HH:mm");
    const sunriseTime = formatToLocalTime(sunrise, timezone / 60, "HH:mm");

    const widgets = [
        { title: "Humidity", unit: "%", data: humidity },
        { title: "Wind", unit: "m/s", data: speed },
        { title: "Pressure", unit: "hPa", data: pressure },
        { title: "sun", data: { sunsetTime, sunriseTime } },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {widgets.map((widget, index) => (
                <WeatherWidget key={index} info={widget} />
            ))}
        </div>
    );
};


export default TodayWeatherDetails;
