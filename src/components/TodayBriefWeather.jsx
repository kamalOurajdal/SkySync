import React from "react";
import { UilMapMarker } from "@iconscout/react-unicons";
import { formatToLocalTime, getIcon } from "../services/WeatherServices";

function TodayBriefWeather({ currentWeather }) {
  const {
    feels_like,
    temp_min,
    temp_max,
    name,
    dt,
    country,
    main,
    icon,
    temp,
    timezone,
  } = currentWeather;
  const localeTime = formatToLocalTime(Number(dt), Number(timezone) / 60).split(
    "|"
  );

  return (
    <div className="mt-2">
      <div className="flex justify-between items-start ">
        <div>
          <p className="leading-normal">
            <p className="font-bold text-6xl  text-gray-700">
              {Math.round(temp)}°
            </p>
            <p className="text-gray-600 text-md font-medium">{main} </p>
          </p>
          <p className="leading-7 mt-2">
            <p className="font-bold text-xl flex items-center text-gray-700 ">
              {name}, {country}{" "}
              <UilMapMarker size={20} className="ml-2 text-red-500" />
            </p>

            <p className="text-gray-600 text-md font-medium">
              {Math.round(temp_max)}° / {Math.round(temp_min)}° feels like{" "}
              {Math.round(feels_like)}°
            </p>
          </p>
        </div>
        <p className="text-center ">
          <p className="text-4xl flex justify-center items-end text-gray-500">
            {localeTime[1]}
          </p>
          <p className="text-sm font-bold  text-gray-500">{localeTime[0]}</p>
        </p>
        <img className="w-36 mr-2  mt-3" src={getIcon(icon)} />
      </div>
    </div>
  );
}

export default TodayBriefWeather;
