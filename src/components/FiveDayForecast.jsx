import React from "react";
import { getIcon } from "../services/WeatherServices";

function FiveDayForcast({ dailyForecast }) {
  const DayForcast = [];
  for (const day in dailyForecast) {
    DayForcast.push({
      day: dailyForecast[day].dayName,
      icon: (
        <img
          src={getIcon(dailyForecast[day].icon) }
          className="w-12"
        />
      ),
      statu: dailyForecast[day].description,
      DFrom: dailyForecast[day].tempMax,
      DTo: dailyForecast[day].tempMin,
    });
  }

  return (
    <div className="bg-white bg-opacity-80  rounded-lg ml-2 p-4 flex-grow">
      <p className="font-bold uppercase text-xs text-gray-700">
        7-Day forecast
      </p>
      <div className="flex flex-col w-full h-full justify-between py-6 ">
        {DayForcast.map(({ day, icon, statu, DFrom, DTo }, index) => (
          <div className="flex justify-between items-center" key={index}>
            <p className="text-sm font-bold text-gray-600">{day}</p>

            <p className="font-bold flex items-center text-sm">
              <span className="mr-2 ">{icon}</span>
              {statu}
            </p>
            <p className="text-sm">
              <span className="font-bold">{DFrom}</span> / {DTo}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FiveDayForcast;
