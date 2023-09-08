import React from "react";
import WeatherWidget from "./WeatherWidget";
import humidity_icon from "./../media/icons/humidity_icon.png";
import wind_icon from "./../media/icons/wind_icon.png";
import sunset_icon from "./../media/icons/sunset_icon.png";
import sunrise_icon from "./../media/icons/sunrise_icon.png";
import pressure_icon from "./../media/icons/pressure_icon2.png";
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
    <div className=" mt-3 flex justify-between  h-60">
      <div className=" flex flex-col justify-between ">
        <WeatherWidget
          siz
          info={{
            title: "humidity",
            unit: "%",
            data: humidity,
            icon: humidity_icon,
          }}
        />
        <WeatherWidget
          info={{ title: "wind", unit: "m/s", data: speed, icon: wind_icon }}
        />
      </div>
      <div className=" flex flex-col justify-between ">
        <WeatherWidget
          info={{
            title: "pressure",
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
    </div>
  );
}

export default TodayWeatherDetails;
