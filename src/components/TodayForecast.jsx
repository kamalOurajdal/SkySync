import React, { useMemo } from "react";
import { getIcon } from "../services/WeatherServices";
import { Cloud, Clock } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const HourlyForecastCard = ({ todayForecast = {}, isLoading = false }) => {
    const { isDark } = useTheme();
    
    /* transform object → array once */
    const timeSlots = useMemo(
        () =>
            Object.entries(todayForecast).map(([id, slot]) => ({
                id,
                time: slot.hour,
                temp: slot.temp,
                icon: slot.icon,
                description: slot.description || "",
            })),
        [todayForecast]
    );

    /* ─────────── skeleton  ─────────── */
    const LoadingSkeleton = () => (
        <div className="flex sm:grid sm:grid-cols-4 lg:grid-cols-6 gap-4 overflow-x-auto scroll-snap-x">
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="flex-shrink-0 w-28 sm:w-auto text-center p-4 rounded-2xl bg-light-accent/60 dark:bg-dark-accent/60 animate-pulse scroll-snap-align-start transition-colors duration-300"
                >
                    <div className="h-4 bg-light-border dark:bg-dark-border rounded mb-3 transition-colors duration-300" />
                    <div className="w-12 h-12 bg-light-border dark:bg-dark-border rounded-full mx-auto mb-3 transition-colors duration-300" />
                    <div className="h-5 bg-light-border dark:bg-dark-border rounded transition-colors duration-300" />
                </div>
            ))}
        </div>
    );

    const EmptyState = () => (
        <div className="text-center py-12">
            <div className="bg-gradient-to-br from-light-accent to-light-primary/10 dark:from-dark-accent dark:to-dark-primary/10 rounded-2xl p-8 border border-light-border/20 dark:border-dark-border/20 inline-block transition-all duration-300">
                <Cloud className="w-16 h-16 mx-auto mb-4 text-light-primary dark:text-dark-primary transition-colors duration-300" />
                <h4 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2 transition-colors duration-300">
                    No Forecast Data
                </h4>
                <p className="text-light-textSecondary dark:text-dark-textSecondary text-sm transition-colors duration-300">
                    Hourly forecast is currently unavailable
                </p>
            </div>
        </div>
    );

    return (
        <div className="bg-light-surface/95 dark:bg-dark-surface/95 backdrop-blur-lg rounded-3xl p-6 shadow-md border border-light-border/30 dark:border-dark-border/30 mb-6 transition-all duration-300 animate-fade-in">
            {/* header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary rounded-lg transition-all duration-300">
                    <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-light-text dark:text-dark-text transition-colors duration-300">Today's Forecast</h3>
                    <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary transition-colors duration-300">Hourly temperature</p>
                </div>
            </div>

            {/* content */}
            {isLoading ? (
                <LoadingSkeleton />
            ) : timeSlots.length ? (
                <div
                    className="
                        flex gap-4 overflow-x-auto pb-2 -mx-2 px-2 scroll-snap-x sm:grid
                        sm:grid-cols-4 lg:grid-cols-6 sm:overflow-visible sm:pb-0
                      "
                >
                    {timeSlots.map((slot, idx) => (
                        <div
                            key={slot.id}
                            className="
                                flex-shrink-0 w-28 sm:w-auto text-center p-4 rounded-2xl
                                bg-gradient-to-br from-light-accent via-light-surface to-light-primary/10 dark:from-dark-accent dark:via-dark-surface dark:to-dark-primary/10
                                hover:from-light-primary/20 hover:to-light-secondary/20 dark:hover:from-dark-primary/20 dark:hover:to-dark-secondary/20
                                transition-all duration-300 cursor-pointer select-none
                                border border-transparent hover:border-light-primary/30 dark:hover:border-dark-primary/30
                                scroll-snap-align-start hover:scale-105 hover:shadow-lg
                              "
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            {/* time */}
                            <div className="text-xs font-medium text-light-textSecondary dark:text-dark-textSecondary mb-2 sm:text-sm transition-colors duration-300">
                                {slot.time}
                            </div>

                            {/* icon */}
                            <img
                                src={getIcon(slot.icon)}
                                alt={slot.description}
                                className="h-10 sm:h-12 mx-auto mb-2 drop-shadow-md transition-transform duration-300 hover:scale-110"
                                loading="lazy"
                            />

                            {/* temperature */}
                            <div className="text-lg font-bold text-light-text dark:text-dark-text sm:text-xl transition-colors duration-300">
                                {Math.round(slot.temp)}°
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <EmptyState />
            )}
        </div>
    );
};

export default HourlyForecastCard;
