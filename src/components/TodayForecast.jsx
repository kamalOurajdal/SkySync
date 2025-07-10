import React, { useMemo } from "react";
import { getIcon } from "../services/WeatherServices";
import { Cloud, Clock } from "lucide-react";

const HourlyForecastCard = ({ todayForecast = {}, isLoading = false }) => {
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
                    className="flex-shrink-0 w-28 sm:w-auto text-center p-4 rounded-2xl bg-gray-100/60 animate-pulse scroll-snap-align-start"
                >
                    <div className="h-4 bg-gray-200 rounded mb-3" />
                    <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-3" />
                    <div className="h-5 bg-gray-200 rounded" />
                </div>
            ))}
        </div>
    );

    const EmptyState = () => (
        <div className="text-center py-12">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 inline-block">
                <Cloud className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    No Forecast Data
                </h4>
                <p className="text-gray-600 text-sm">
                    Hourly forecast is currently unavailable
                </p>
            </div>
        </div>
    );

    return (
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 shadow-md border border-white/30 mb-6">
            {/* header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                    <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-800">Today’s Forecast</h3>
                    <p className="text-sm text-gray-500">Hourly temperature</p>
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
                                bg-gradient-to-br from-blue-50 via-white to-indigo-50
                                hover:from-blue-100 hover:to-indigo-100
                                transition-all duration-200 cursor-pointer select-none
                                border border-transparent hover:border-blue-200
                                scroll-snap-align-start
                              "
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            {/* time */}
                            <div className="text-xs font-medium text-gray-600 mb-2 sm:text-sm">
                                {slot.time}
                            </div>

                            {/* icon */}
                            <img
                                src={getIcon(slot.icon)}
                                alt={slot.description}
                                className="h-10 sm:h-12 mx-auto mb-2 drop-shadow-md"
                                loading="lazy"
                            />

                            {/* temperature */}
                            <div className="text-lg font-bold text-gray-800 sm:text-xl">
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
