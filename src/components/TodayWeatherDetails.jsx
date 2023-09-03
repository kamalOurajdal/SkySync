import React from "react";
import WeatherWidget from "./WeatherWidget";

function TodayWeatherDetails({ data }) {
  return (
    <div className=" mt-4 flex justify-between  bg-gray-200 h-56">
      <div className=" flex flex-col justify-between ">
        <WeatherWidget title={"Humidity"} />
        <WeatherWidget title={"Wind"} />
      </div>
      <div className=" flex flex-col justify-between ">
        <WeatherWidget title={"Pressure"} />
        <WeatherWidget title={"Sunrise"} />
      </div>
    </div>
  );
}

export default TodayWeatherDetails;
