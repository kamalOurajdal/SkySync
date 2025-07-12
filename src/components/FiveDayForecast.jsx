import React, { useMemo } from "react";
import { getIcon } from "../services/WeatherServices";
import { ChevronRight, Cloud, Calendar, TrendingUp, TrendingDown } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const FiveDayForecast = ({ dailyForecast = [], isLoading = false }) => {
    const { isDark } = useTheme();
    
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
                    className="flex items-center justify-between p-4 rounded-2xl bg-light-accent/50 dark:bg-dark-accent/50 animate-pulse transition-colors duration-300"
                >
                    <div className="flex items-center gap-3 flex-1">
                        <div className="h-4 bg-light-border dark:bg-dark-border rounded w-12 transition-colors duration-300"></div>
                        <div className="w-8 h-8 bg-light-border dark:bg-dark-border rounded-full transition-colors duration-300"></div>
                        <div className="h-4 bg-light-border dark:bg-dark-border rounded flex-1 max-w-32 transition-colors duration-300"></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-4 bg-light-border dark:bg-dark-border rounded w-8 transition-colors duration-300"></div>
                        <div className="h-4 bg-light-border dark:bg-dark-border rounded w-8 transition-colors duration-300"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    const EmptyState = () => (
        <div className="text-center py-12">
            <div className="bg-gradient-to-br from-light-accent to-light-primary/10 dark:from-dark-accent dark:to-dark-primary/10 rounded-2xl p-8 border border-light-border/20 dark:border-dark-border/20 transition-all duration-300">
                <Cloud className="w-16 h-16 mx-auto mb-4 text-light-primary dark:text-dark-primary transition-colors duration-300" />
                <h4 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2 transition-colors duration-300">
                    No Forecast Data Available
                </h4>
                <p className="text-light-textSecondary dark:text-dark-textSecondary text-sm transition-colors duration-300">
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
        <div className="bg-light-surface/95 dark:bg-dark-surface/95 backdrop-blur-lg rounded-3xl p-6 shadow-md border border-light-border/30 dark:border-dark-border/30 h-fit transition-all duration-300 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary rounded-lg transition-all duration-300">
                        <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-light-text dark:text-dark-text transition-colors duration-300">
                            7-Day Forecast
                        </h3>
                        <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary transition-colors duration-300">
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
                                className={`group relative flex items-center justify-between p-4 rounded-2xl transition-all duration-300 cursor-pointer border hover:scale-[1.02] hover:shadow-lg ${
                                    isToday
                                        ? 'bg-gradient-to-r from-light-primary/10 to-light-secondary/10 dark:from-dark-primary/10 dark:to-dark-secondary/10 border-light-primary/30 dark:border-dark-primary/30 shadow-sm'
                                        : 'hover:bg-gradient-to-r hover:from-light-accent hover:to-light-primary/10 dark:hover:from-dark-accent dark:hover:to-dark-primary/10 border-transparent hover:border-light-primary/20 dark:hover:border-dark-primary/20'
                                }`}
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                }}
                            >
                                {/* Left Section */}
                                <div className="flex items-center gap-4 flex-1">
                                    {/* Day Name and Today Dot */}
                                    <div className="flex flex-col items-start justify-center min-w-[60px] pr-2">
                                        <span className={`text-sm font-semibold transition-colors duration-300 ${
                                            isToday ? 'text-light-primary dark:text-dark-primary' : 'text-light-text dark:text-dark-text'
                                        }`}>
                                            {isToday ? 'Today' : forecast.day}
                                        </span>
                                        {isToday && (
                                            <div className="mt-1 w-2 h-2 bg-light-primary dark:bg-dark-primary rounded-full transition-colors duration-300"></div>
                                        )}
                                    </div>

                                    {/* Weather Icon */}
                                    <div className="flex items-center justify-center">
                                        <img
                                            src={getIcon(forecast.icon)}
                                            alt={forecast.description}
                                            className="h-10 drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                                            loading="lazy"
                                        />
                                    </div>

                                    {/* Description and Details */}
                                    <div className="flex-1 min-w-0 pl-2">
                                        <span className="text-sm text-light-textSecondary dark:text-dark-textSecondary capitalize block truncate transition-colors duration-300">
                                            {forecast.description}
                                        </span>
                                        {(forecast.humidity || forecast.windSpeed) && (
                                            <div className="flex items-center gap-2 text-xs text-light-textSecondary dark:text-dark-textSecondary mt-1 transition-colors duration-300">
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
                                        <span className={`font-bold transition-colors duration-300 ${
                                            isToday ? 'text-light-primary dark:text-dark-primary' : 'text-light-text dark:text-dark-text'
                                        }`}>
                                            {Math.round(forecast.tempMax)}°
                                        </span>
                                        <span className="text-light-textSecondary dark:text-dark-textSecondary transition-colors duration-300">
                                            {Math.round(forecast.tempMin)}°
                                        </span>
                                    </div>

                                    {TrendIcon && (
                                        <TrendIcon className="w-4 h-4 text-light-textSecondary dark:text-dark-textSecondary group-hover:text-light-primary dark:group-hover:text-dark-primary transition-colors duration-300" />
                                    )}
                                </div>
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