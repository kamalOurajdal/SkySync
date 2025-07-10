import React, { useMemo } from "react";
import { getIcon } from "../services/WeatherServices";
import { ChevronRight, Cloud, Calendar, TrendingUp, TrendingDown } from "lucide-react";

const FiveDayForecast = ({ dailyForecast = [], isLoading = false }) => {
    const forecastData = useMemo(() => {
        return Object.entries(dailyForecast).map(([key, day]) => ({
            id: key,
            day: day.dayName,
            icon: day.icon,
            description: day.description,
            tempMax: day.tempMax,
            tempMin: day.tempMin,
            humidity: day.humidity,
            windSpeed: day.windSpeed,
        }));
    }, [dailyForecast]);

    const LoadingSkeleton = () => (
        <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-2xl bg-gray-100/50 animate-pulse"
                >
                    <div className="flex items-center gap-3 flex-1">
                        <div className="h-4 bg-gray-200 rounded w-12"></div>
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                        <div className="h-4 bg-gray-200 rounded flex-1 max-w-32"></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-4 bg-gray-200 rounded w-8"></div>
                        <div className="h-4 bg-gray-200 rounded w-8"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    const EmptyState = () => (
        <div className="text-center py-12">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                <Cloud className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    No Forecast Data Available
                </h4>
                <p className="text-gray-600 text-sm">
                    Extended forecast information is currently unavailable
                </p>
            </div>
        </div>
    );

    const getTempTrendIcon = (maxTemp, minTemp) => {
        const tempDiff = maxTemp - minTemp;
        return tempDiff > 15 ? TrendingUp : tempDiff < 5 ? TrendingDown : null;
    };

    return (
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 shadow-md border border-white/30 h-fit  transition-all duration-300">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                        <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">
                            7-Day Forecast
                        </h3>
                        <p className="text-sm text-gray-500">
                            Extended weather outlook
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            {isLoading ? (
                <LoadingSkeleton />
            ) : forecastData.length > 0 ? (
                <div className="space-y-3">
                    {forecastData.map((forecast, index) => {
                        const TrendIcon = getTempTrendIcon(forecast.tempMax, forecast.tempMin);
                        const isToday = index === 0;

                        return (
                            <div
                                key={forecast.id || index}
                                className={`group relative flex items-center justify-between p-4 rounded-2xl transition-all duration-200 cursor-pointer border ${
                                    isToday
                                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-sm'
                                        : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 border-transparent hover:border-blue-200'
                                }`}
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                }}
                            >
                                {/* Left Section */}
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="relative">
                                        <span className={`text-sm font-semibold w-12 block ${
                                            isToday ? 'text-blue-700' : 'text-gray-700'
                                        }`}>
                                            {isToday ? 'Today' : forecast.day}
                                        </span>
                                        {isToday && (
                                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                                        )}
                                    </div>

                                    <div className="relative">
                                        <img
                                            src={getIcon(forecast.icon)}
                                            alt={forecast.description}
                                            className="w-10 h-10 drop-shadow-md group-hover:scale-110 transition-transform duration-200"
                                            loading="lazy"
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <span className="text-sm text-gray-600 capitalize block truncate">
                                            {forecast.description}
                                        </span>
                                        {(forecast.humidity || forecast.windSpeed) && (
                                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                                {forecast.humidity && (
                                                    <span>💧 {forecast.humidity}%</span>
                                                )}
                                                {forecast.windSpeed && (
                                                    <span>💨 {forecast.windSpeed}km/h</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right Section - Temperature */}
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className={`font-bold ${
                                            isToday ? 'text-blue-700' : 'text-gray-800'
                                        }`}>
                                            {Math.round(forecast.tempMax)}°
                                        </span>
                                        <span className="text-gray-500">
                                            {Math.round(forecast.tempMin)}°
                                        </span>
                                    </div>

                                    {TrendIcon && (
                                        <TrendIcon className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                    )}
                                </div>

                                {/* Hover overlay */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:to-indigo-500/5 transition-all duration-200 pointer-events-none"></div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <EmptyState />
            )}
        </div>
    );
};

export default FiveDayForecast;