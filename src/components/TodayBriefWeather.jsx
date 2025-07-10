import React from "react";
import { formatToLocalTime, getIcon } from "../services/WeatherServices";
import {MapPin} from "lucide-react"

const TodayBriefWeather = ({ currentWeather }) => {
  if (!currentWeather) return null;

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

  const localeTime = formatToLocalTime(Number(dt), Number(timezone) / 60).split("|");

  return (
      <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white rounded-2xl p-8 shadow-xl mb-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="text-7xl font-bold mb-2">
              {Math.round(temp)}°
            </div>
            <div className="text-xl font-medium opacity-90 capitalize mb-4">
              {main}
            </div>

            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">{name}, {country}</h2>
              <MapPin className="w-6 h-6 text-red-300" />
            </div>

            <div className="text-lg opacity-90">
              {Math.round(temp_max)}° / {Math.round(temp_min)}° feels like {Math.round(feels_like)}°
            </div>
          </div>

          <div className="text-center">
            <div className="text-4xl font-light mb-2">
              {localeTime[1]}
            </div>
            <div className="text-sm font-medium opacity-90">
              {localeTime[0]}
            </div>
          </div>

          <img
              src={getIcon(icon)}
              alt={main}
              className="w-32 h-32 ml-6"
          />
        </div>
      </div>
  );
};


export default TodayBriefWeather;
