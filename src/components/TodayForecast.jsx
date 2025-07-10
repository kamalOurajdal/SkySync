import React, {useMemo} from "react";
import { getIcon } from "../services/WeatherServices";
import {Cloud} from "lucide-react";

const TodayForecast = ({ todayForecast = {} }) => {
    const timeSlots = useMemo(() => {
        return Object.entries(todayForecast).map(([key, slot]) => ({
            id: key,
            time: slot.hour,
            temp: slot.temp,
            icon: slot.icon,
        }));
    }, [todayForecast]);

    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-6">
            <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-4">
                Today's Forecast
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                {timeSlots.length > 0 ? (
                    timeSlots.map((slot) => (
                        <div
                            key={slot.id}
                            className="text-center p-4 rounded-xl hover:bg-gray-50/50 transition-colors"
                        >
                            <div className="text-sm font-medium text-gray-600 mb-2">
                                {slot.time}
                            </div>
                            <img
                                src={getIcon(slot.icon)}
                                alt="weather"
                                className="w-12 h-12 mx-auto mb-2"
                            />
                            <div className="text-lg font-bold text-gray-800">
                                {Math.round(slot.temp)}°
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-8 text-gray-500">
                        <Cloud className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>No hourly forecast available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TodayForecast;
