import React from "react";
import WeatherWidget from "./WeatherWidget";
import { formatToLocalTime } from "../services/WeatherServices";
import {
    Droplets,
    Wind,
    Gauge,
    Sunrise,
    Sunset,
    Eye,
    Thermometer,
    CloudRain
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const TodayWeatherDetails = ({ currentWeather }) => {
    const { isDark } = useTheme();
    
    if (!currentWeather) return null;

    const {
        humidity,
        pressure,
        sunrise,
        sunset,
        speed,
        timezone,
        visibility,
        feels_like,
        temp_min,
        temp_max,
        uvi,
    } = currentWeather;

    const sunsetTime = formatToLocalTime(sunrise, timezone / 60, "HH:mm");
    const sunriseTime = formatToLocalTime(sunset, timezone / 60, "HH:mm");

    // Enhanced widgets with icons and better organization
    const widgets = [
        {
            title: "Humidity",
            unit: "%",
            data: humidity,
            icon: Droplets,
            color: "from-blue-500 to-cyan-500",
            description: "Moisture level"
        },
        {
            title: "Wind Speed",
            unit: "m/s",
            data: speed ? Math.round(speed * 10) / 10 : speed,
            icon: Wind,
            color: "from-green-500 to-emerald-500",
            description: "Air movement"
        },
        {
            title: "Pressure",
            unit: "hPa",
            data: pressure,
            icon: Gauge,
            color: "from-purple-500 to-indigo-500",
            description: "Atmospheric pressure"
        },
        {
            title: "Sun Times",
            data: { sunsetTime, sunriseTime },
            icon: Sunrise,
            color: "from-orange-500 to-yellow-500",
            description: "Sunrise & sunset"
        },
    ];

    // Additional widgets if data is available
    const additionalWidgets = [
        visibility && {
            title: "Visibility",
            unit: "km",
            data: Math.round(visibility / 1000),
            icon: Eye,
            color: "from-gray-500 to-slate-500",
            description: "Visual range"
        },
        feels_like && {
            title: "Feels Like",
            unit: "°C",
            data: Math.round(feels_like),
            icon: Thermometer,
            color: "from-red-500 to-pink-500",
            description: "Apparent temperature"
        },
        uvi && {
            title: "UV Index",
            unit: "",
            data: Math.round(uvi),
            icon: CloudRain,
            color: "from-yellow-500 to-amber-500",
            description: "UV radiation level"
        },
    ].filter(Boolean);

    const allWidgets = [...widgets, ...additionalWidgets];

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary rounded-lg transition-all duration-300">
                    <Gauge className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-light-text dark:text-dark-text transition-colors duration-300">
                        Weather Details
                    </h3>
                    <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary transition-colors duration-300">
                        Current atmospheric conditions
                    </p>
                </div>
            </div>

            {/* Widgets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {allWidgets.map((widget, index) => (
                    <div
                        key={index}
                        className="group bg-light-surface/95 dark:bg-dark-surface/95 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-light-border/30 dark:border-dark-border/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                        style={{
                            animationDelay: `${index * 100}ms`,
                        }}
                    >
                        {/* Widget Header */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`p-2 bg-gradient-to-br ${widget.color} rounded-lg group-hover:scale-110 transition-transform duration-200`}>
                                <widget.icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-light-text dark:text-dark-text uppercase tracking-wide transition-colors duration-300">
                                    {widget.title}
                                </h4>
                                <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary transition-colors duration-300">
                                    {widget.description}
                                </p>
                            </div>
                        </div>

                        {/* Widget Content */}
                        {widget.title === "Sun Times" ? (
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Sunrise className="w-4 h-4 text-orange-500" />
                                    <span className="text-sm text-light-textSecondary dark:text-dark-textSecondary transition-colors duration-300">Sunrise</span>
                                    <span className="text-lg font-bold text-light-text dark:text-dark-text ml-auto transition-colors duration-300">
                                        {widget.data.sunriseTime}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Sunset className="w-4 h-4 text-orange-600" />
                                    <span className="text-sm text-light-textSecondary dark:text-dark-textSecondary transition-colors duration-300">Sunset</span>
                                    <span className="text-lg font-bold text-light-text dark:text-dark-text ml-auto transition-colors duration-300">
                                        {widget.data.sunsetTime}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-light-text dark:text-dark-text transition-colors duration-300">
                                    {widget.data}
                                </span>
                                {widget.unit && (
                                    <span className="text-sm text-light-textSecondary dark:text-dark-textSecondary font-medium transition-colors duration-300">
                                        {widget.unit}
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Progress indicator for certain metrics */}
                        {widget.title === "Humidity" && (
                            <div className="mt-4">
                                <div className="w-full bg-light-border dark:bg-dark-border rounded-full h-2 transition-colors duration-300">
                                    <div
                                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${Math.min(widget.data, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        {widget.title === "UV Index" && widget.data && (
                            <div className="mt-4">
                                <div className="w-full bg-light-border dark:bg-dark-border rounded-full h-2 transition-colors duration-300">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-500 ${
                                            widget.data <= 2 ? 'bg-green-500' :
                                                widget.data <= 5 ? 'bg-yellow-500' :
                                                    widget.data <= 7 ? 'bg-orange-500' :
                                                        'bg-red-500'
                                        }`}
                                        style={{ width: `${Math.min((widget.data / 11) * 100, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodayWeatherDetails;