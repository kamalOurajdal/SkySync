import React from "react";
import { formatToLocalTime, getIcon } from "../services/WeatherServices";
import { UilMapMarker } from '@iconscout/react-unicons'
import sunny_icon from "./../media/icons/weather_icon/01d.png";

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
  const sunsetTime = formatToLocalTime(Number(sunset), timezone / 60, "HH:mm");
  const sunriseTime = formatToLocalTime(
    Number(sunrise),
    timezone / 60,
    "HH:mm "
  );

  return (
    <div className="w-60 p-2 bg-white bg-opacity-50 rounded-xl  h-full mt-4 ">
      {weatherData && (
        <div>
          <p className="text-6xl  text-center text-gray-500">{localeTime[1]}</p>
          <p className="text-xl font-bold text-center text-gray-500">
            {localeTime[0]}
          </p>
          <p className="mt-6 flex items-center justify-center  text-lg font-bold">{weatherData.name} <UilMapMarker size={20}/></p>
          <div className="mt-4 flex justify-between">
            
            <div className="">
              <p className="text-6xl font-bold ">
                {Math.round(weatherData.temp)}°
              </p>
              <p className=" text-gray-600">{weatherData.description}</p>
            </div>
            <img
              className="h-20"
              // src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              src={getIcon(icon)}
            />
          </div>
          <div className="text-center font-medium text-gray-800">
            
            <p className=" text-sm">{Math.round(temp_max)}°/{Math.round(temp_min)}° feels like <span className="font-bold">{Math.round(feels_like)}°</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MapWeatherPanel;
