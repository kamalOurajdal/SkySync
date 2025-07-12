import React from "react";
import {Droplets, Gauge, Sunrise, Sunset, Wind, AlertCircle} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const WeatherWidget = ({ info }) => {
  const { isDark } = useTheme();
  
  const iconMap = {
    humidity: Droplets,
    wind: Wind,
    pressure: Gauge,
    sunrise: Sunrise,
    sunset: Sunset,
  };

  if (info.title === "sun") {
    return (
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-2xl p-6 shadow-lg border border-orange-100/50 dark:border-orange-500/20 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sunrise className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium text-orange-600 dark:text-orange-400 transition-colors duration-300">Sunrise</span>
              </div>
              <div className="text-xl font-bold text-light-text dark:text-dark-text transition-colors duration-300">
                {info.data.sunriseTime}
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sunset className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400 transition-colors duration-300">Sunset</span>
              </div>
              <div className="text-xl font-bold text-light-text dark:text-dark-text transition-colors duration-300">
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

  // Dynamic color classes for dark mode
  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-50 dark:bg-blue-900/20",
        border: "border-blue-100/50 dark:border-blue-500/20",
        icon: "text-blue-500",
        text: "text-blue-600 dark:text-blue-400"
      },
      green: {
        bg: "bg-green-50 dark:bg-green-900/20",
        border: "border-green-100/50 dark:border-green-500/20",
        icon: "text-green-500",
        text: "text-green-600 dark:text-green-400"
      },
      purple: {
        bg: "bg-purple-50 dark:bg-purple-900/20",
        border: "border-purple-100/50 dark:border-purple-500/20",
        icon: "text-purple-500",
        text: "text-purple-600 dark:text-purple-400"
      },
      gray: {
        bg: "bg-gray-50 dark:bg-gray-800/20",
        border: "border-gray-100/50 dark:border-gray-600/20",
        icon: "text-gray-500",
        text: "text-gray-600 dark:text-gray-400"
      }
    };
    return colorMap[color] || colorMap.gray;
  };

  const colors = getColorClasses(color);

  return (
      <div className={`${colors.bg} rounded-2xl p-6 shadow-lg border ${colors.border} transition-all duration-300 hover:shadow-xl hover:scale-[1.02]`}>
        <div className="flex items-center gap-3 mb-4">
          <Icon className={`w-6 h-6 ${colors.icon}`} />
          <h3 className={`text-sm font-medium ${colors.text} capitalize transition-colors duration-300`}>
            {info.title}
          </h3>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-light-text dark:text-dark-text transition-colors duration-300">
            {info.data} {info.unit}
          </div>
        </div>
      </div>
  );
};

export default WeatherWidget;
