import React from "react";
import { formatToLocalTime } from "../services/WeatherServices";

function MapWeatherPanel({ weatherData }) {
  const {
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    main,
    icon,
    speed,
    description,
    temp,
    pressure,
    timezone,
  } = weatherData ? weatherData : "";
  console.log("Weather ", weatherData);
  const localeTime = formatToLocalTime(Number(dt), Number(timezone) / 60).split(
    "|"
  );
  return (
    <div className="w-60 pl-3 bg-white bg-opacity-50 rounded-xl pt-4 h-full mt-4 ">
      {weatherData && (
        <div>
          <p className="text-3xl font-bold text-center text-gray-500">
            {localeTime[1]}
          </p>
          <div className="mt-3 flex ">
            <div className="">
              <p className="text-6xl font-bold ">
                {Math.round(weatherData.temp)}°
              </p>
            </div>

            <img
              className="w-40  "
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            />
          </div>
          <p>{weatherData.description}</p>
          <p>{weatherData.name}</p>
          <p className=" text-sm">
            {description}: {Math.round(temp_max)}/{Math.round(temp_min)}
          </p>
        </div>
      )}
    </div>
  );
}

export default MapWeatherPanel;
