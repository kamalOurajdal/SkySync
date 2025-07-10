import React from "react";
import { formatToLocalTime, getIcon } from "../services/WeatherServices";
import {Loader2, MapPin, Droplets, Wind, Sunrise, Sunset} from "lucide-react";

const MapWeatherPanel = ({ weatherData }) => {
  if (!weatherData) {
    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 h-full">
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        </div>
    );
  }

  const {
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    sunrise,
    sunset,
    main,
    icon,
    speed,
    temp,
    timezone,
    lat,
    lon,
  } = weatherData;

  const localeTime = formatToLocalTime(Number(dt), Number(timezone) / 60).split("|");
  const sunsetTime = formatToLocalTime(Number(sunset), timezone / 60, "HH:mm");
  const sunriseTime = formatToLocalTime(Number(sunrise), timezone / 60, "HH:mm");

  return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 h-full">
        <div className="text-center mb-6">
          <div className="text-3xl font-light text-gray-600 mb-1">
            {localeTime[1]}
          </div>
          <div className="text-sm text-gray-500 font-medium">
            {localeTime[0]}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          <h2 className="text-lg font-bold text-gray-800">{name}</h2>
          <MapPin className="w-5 h-5 text-red-500" />
        </div>

        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-800 mb-1">
              {Math.round(temp)}°
            </div>
            <div className="text-sm font-medium text-gray-600 capitalize">
              {main}
            </div>
          </div>
          <img
              src={getIcon(icon)}
              alt={main}
              className="w-16 h-16"
          />
        </div>

        <div className="text-center mb-6">
          <div className="text-sm text-gray-600">
            {Math.round(temp_max)}°/{Math.round(temp_min)}° feels like{" "}
            <span className="font-bold">{Math.round(feels_like)}°</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-600">Humidity</span>
            </div>
            <div className="text-lg font-bold text-gray-800">{humidity}%</div>
          </div>

          <div className="bg-green-50 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Wind className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-gray-600">Wind</span>
            </div>
            <div className="text-lg font-bold text-gray-800">{speed} m/s</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sunrise className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-orange-600">Sunrise</span>
              </div>
              <div className="text-lg font-bold text-gray-800">{sunriseTime}</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sunset className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-600">Sunset</span>
              </div>
              <div className="text-lg font-bold text-gray-800">{sunsetTime}</div>
            </div>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
          View Details
        </button>
      </div>
  );
};

export default MapWeatherPanel;
