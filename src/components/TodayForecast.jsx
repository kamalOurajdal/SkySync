import React from "react";
import { UilSun } from "@iconscout/react-unicons";
import LineChart from "./LineChart";

function TodayForecast() {
  const timeSlots = [
    { time: "6:00", temp: 31, icon: <UilSun/> },
    { time: "9:00", temp: 30, icon: <UilSun/> },
    { time: "12:00", temp: 28, icon:<UilSun/> },
    { time: "15:00", temp: 30, icon:<UilSun/> },
    { time: "18:00", temp: 26, icon:<UilSun/> },
    { time: "21:00", temp: 31, icon:<UilSun/> },
  ];

const data = []
const timeW = []
  return (
    <div className="bg-white bg-opacity-50 rounded-xl mt-5 p-4 w-full">
      <p className="font-bold uppercase text-xs text-gray-400 mb-5 flex flex-col">
        Today's forcast
      </p>

      <div className="flex justify-between w-full">
        {timeSlots.map(({ time, temp, icon }, index) => (
          
          <div
            key={time}
            className={`font-bold flex flex-col items-center w-full h-24 justify-between ${index !== 0 ? "border-gray-300 border-l-2" : ""}`}
          >
            {data.push(temp)}
            {timeW.push(time)}
            <p className="text-sm">{time}</p>
            {icon}
            <p className="text-sm font-bold">{temp}C°</p>
          </div>
        ))}
        
      </div>
      <LineChart data={{data:data, time:timeW}}/>
    </div>
  );
}

export default TodayForecast;
