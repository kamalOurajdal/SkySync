import React from "react";
import { UilSun } from "@iconscout/react-unicons";
import LineChart from "./LineChart";

function TodayForecast({ todayForecast }) {
  /*   const timeSlots = [
    { time: "6:00", temp: 31, icon: <UilSun/> },
    { time: "9:00", temp: 30, icon: <UilSun/> },
    { time: "12:00", temp: 28, icon:<UilSun/> },
    { time: "15:00", temp: 30, icon:<UilSun/> },
    { time: "18:00", temp: 26, icon:<UilSun/> },
    { time: "21:00", temp: 31, icon:<UilSun/> },
  ]; */

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
    <div className="bg-white bg-opacity-50 rounded-xl mt-5 p-4 w-full ">
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
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
            <p className="text-sm font-bold">{temp}°</p>
          </div>
        ))}
      </div>
      <LineChart data={{ data: data, time: timeW }} />
    </div>
  );
}

export default TodayForecast;
