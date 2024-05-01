import React from "react";
import WeatherWidget from "./WeatherWidget";
import humidity_icon from "../assets/icons/humidity_icon.png";
import wind_icon from "../assets/icons/wind_icon.png";
import sunset_icon from "../assets/icons/sunset_icon.png";
import sunrise_icon from "../assets/icons/sunrise_icon.png";
import pressure_icon from "../assets/icons/pressure_icon2.png";
import { formatToLocalTime } from "../services/WeatherServices";

function TodayWeatherDetails({ currentWeather }) {
  const {
    humidity,
    pressure,
    sunrise,
    sunset,
    speed,
    timezone,
  } = currentWeather;

  const sunsetTime = formatToLocalTime(sunset, timezone / 60, "HH:mm");
  const sunriseTime = formatToLocalTime(sunrise, timezone / 60, "HH:mm ");

  return (
    <div className=" mt-3 grid grid-cols-2 gap-2">
        <WeatherWidget
          siz
          info={{
            title: "Humidity",
            unit: "%",
            data: humidity,
            icon: humidity_icon,
          }}
        />
        <WeatherWidget
          info={{ title: "Wind", unit: "m/s", data: speed, icon: wind_icon }}
        />
        <WeatherWidget
          info={{
            title: "Pressure",
            unit: "hPa",
            data: pressure,
            icon: pressure_icon,
          }}
        />
        <WeatherWidget
          info={{
            title: "sun",
            data: { sunsetTime, sunriseTime },
            sunsetIcon: sunset_icon,
            sunriseIcon: sunrise_icon,
          }}
        />
    </div>
  );
}

export default TodayWeatherDetails;
