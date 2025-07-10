import React, {useMemo} from "react";
import {getIcon} from "../services/WeatherServices";
import {ChevronRight, Cloud} from "lucide-react";

const FiveDayForecast = ({dailyForecast = []}) => {
    const forecastData = useMemo(() => {
        return Object.entries(dailyForecast).map(([key, day]) => ({
            id: key,
            day: day.dayName,
            icon: day.icon,
            description: day.description,
            tempMax: day.tempMax,
            tempMin: day.tempMin,
        }));
    }, [dailyForecast]);

    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 h-fit">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider">
                    7-Day Forecast
                </h3>
                <ChevronRight className="w-4 h-4 text-gray-400"/>
            </div>

            <div className="space-y-4">
                {forecastData.length > 0 ? (
                    forecastData.map((forecast, index) => (
                        <div
                            key={forecast.id || index}
                            className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50/50 transition-colors group"
                        >
                            <div className="flex items-center gap-3 flex-1">
                <span className="text-sm font-semibold text-gray-700 w-12">
                  {forecast.day}
                </span>
                                <img
                                    src={getIcon(forecast.icon)}
                                    alt={forecast.description}
                                    className="w-8 h-8"
                                />
                                <span className="text-sm text-gray-600 capitalize flex-1">
                  {forecast.description}
                </span>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                <span className="font-bold text-gray-800">
                  {Math.round(forecast.tempMax)}°
                </span>
                                <span className="text-gray-500">
                  {Math.round(forecast.tempMin)}°
                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <Cloud className="w-12 h-12 mx-auto mb-2 opacity-50"/>
                        <p>No forecast data available</p>
                    </div>
                )}
            </div>
        </div>
    );
};


export default FiveDayForecast;
