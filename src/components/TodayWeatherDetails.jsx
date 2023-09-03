import React from "react";
import { UilTemperatureHalf } from "@iconscout/react-unicons";
import { UilRaindropsAlt } from "@iconscout/react-unicons";
import { UilWind } from "@iconscout/react-unicons";
import { UilSun } from "@iconscout/react-unicons";
import WeatherWidget from "./WeatherWidget";

function TodayWeatherDetails({ data }) {
  return (
    <div className=" mt-6 flex justify-between h-full  items-center">
      <div className=" flex flex-col items-center justify-center">
        <WeatherWidget title={"Humidity"} />
        <WeatherWidget title={"Wind"} />
      </div>
      <div>
        <WeatherWidget title={"Pressure"} />
        <WeatherWidget title={"Sunrise"} />
      </div>
    </div>
  );
}

export default TodayWeatherDetails;
