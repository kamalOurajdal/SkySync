import React from "react";
import {Droplets, Gauge, Sunrise, Sunset, Wind, AlertCircle} from "lucide-react";

const WeatherWidget = ({ info }) => {
  const iconMap = {
    humidity: Droplets,
    wind: Wind,
    pressure: Gauge,
    sunrise: Sunrise,
    sunset: Sunset,
  };

  if (info.title === "sun") {
    return (
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 shadow-lg border border-orange-100">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sunrise className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium text-orange-600">Sunrise</span>
              </div>
              <div className="text-xl font-bold text-gray-800">
                {info.data.sunriseTime}
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sunset className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-600">Sunset</span>
              </div>
              <div className="text-xl font-bold text-gray-800">
                {info.data.sunsetTime}
              </div>
            </div>
          </div>
        </div>
    );
  }

  const Icon = iconMap[info.title.toLowerCase()] || AlertCircle;
  const colorMap = {
    humidity: "blue",
    wind: "green",
    pressure: "purple",
  };
  const color = colorMap[info.title.toLowerCase()] || "gray";

  return (
      <div className={`bg-${color}-50 rounded-2xl p-6 shadow-lg border border-${color}-100`}>
        <div className="flex items-center gap-3 mb-4">
          <Icon className={`w-6 h-6 text-${color}-500`} />
          <h3 className={`text-sm font-medium text-${color}-600 capitalize`}>
            {info.title}
          </h3>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800">
            {info.data} {info.unit}
          </div>
        </div>
      </div>
  );
};


export default WeatherWidget;
