import React from "react";
import { UilSun } from "@iconscout/react-unicons";
import LineChart from "./LineChart";
import { getIcon } from "../services/WeatherServices";

function TodayForecast({ todayForecast }) {


  const timeSlots = [];

  for (const key in todayForecast) {
    timeSlots.push({
      time: todayForecast[key].hour,
      temp: todayForecast[key].temp,
      icon: todayForecast[key].icon,
    });
  }

  const data = [];
  const timeW = [];
  timeSlots.map(({ temp, time }) => {
    data.push(temp);
    timeW.push(time);
  });
  return (
    <div className="bg-white bg-opacity-80  rounded-xl mt-5 p-4 w-full ">
      <p className="font-bold uppercase text-xs text-gray-400 mb-5 flex flex-col">
        Today's forcast
      </p>

      <div className="flex justify-between w-full">
        {timeSlots.map(({ time, temp, icon }, index) => (
          <div
            key={time}
            className={`font-bold flex flex-col items-center w-full h-24 justify-between `}
          >
            <p className="text-sm">{time}</p>
            <img src={getIcon(icon)} className="h-9 my-5"/>
            <p className="text-sm font-bold">{temp}°</p>
          </div>
        ))}
      </div>
      <LineChart data={{ data: data, time: timeW }} />
    </div>
  );
}

export default TodayForecast;
