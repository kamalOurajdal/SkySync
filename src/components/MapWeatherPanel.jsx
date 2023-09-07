import React from "react";
import { formatToLocalTime, getIcon } from "../services/WeatherServices";
import { UilMapMarker } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";

function MapWeatherPanel({ weatherData }) {
  const {
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    sunrise,
    sunset,
    main,
    icon,
    speed,
    temp,
    timezone,
    lat,
    lon,
  } = weatherData ? weatherData : "";
  const localeTime = formatToLocalTime(Number(dt), Number(timezone) / 60).split(
    "|"
  );
  const sunsetTime = formatToLocalTime(Number(sunset), timezone / 60, "HH:mm");
  const sunriseTime = formatToLocalTime(
    Number(sunrise),
    timezone / 60,
    "HH:mm "
  );

  return (
    <div className=" p-2 bg-white bg-opacity-80  rounded-xl  h-full mt-4 ">
      {weatherData && (
        <>
          <p className="text-6xl  text-center text-gray-500 font">{localeTime[1]}</p>
          <p className="text-xl font-medium text-center text-gray-500">
            {localeTime[0]}
          </p>
          <p className="mt-6 flex items-center justify-center  text-lg font-bold ">
            {name} <UilMapMarker size={20} className="ml-1"/>
          </p>
          <div className="mt-4 flex justify-around">
            <div className="">
              <p className="text-6xl font-bold ">
                {Math.round(temp)}°
              </p>
              <p className=" text-gray-600">{main}</p>
            </div>
            <img className="h-16" src={getIcon(icon)} />
          </div>
          <div className="text-center font-medium text-gray-800">
            <p className=" text-sm mt-5">
              {Math.round(temp_max)}°/{Math.round(temp_min)}° feels like{" "}
              <span className="font-bold">{Math.round(feels_like)}°</span>
            </p>
            <div className=" mt-4 w-full">
              <div className="flex justify-around bg-gray-100 rounded-md mt-4  py-2">
                <div>
                  <h1 className="font-bold">humidity</h1>
                  <p className="font-bold text-lg text-gray-600">
                    {humidity} %
                  </p>
                </div>
                <div>
                  <h1 className="font-bold">wind</h1>
                  <p className="font-bold text-lg text-gray-600">{speed} m/s</p>
                </div>
              </div>

              <div className="flex justify-around bg-gray-100 rounded-md mt-2  py-2 ">
                <div>
                  <h1 className="font-bold text-yellow-400">Sunset</h1>
                  <p className="font-bold text-lg text-gray-600">
                    {sunsetTime}
                  </p>
                </div>
                <div>
                  <h1 className="font-bold text-orange-500">Sunrise</h1>
                  <p className="font-bold text-lg text-gray-600">
                    {sunriseTime}
                  </p>
                </div>
              </div>
            </div>
            <button className=" w-full rounded-md py-2  bg-blue-500 text-lg text-white mt-4 hover:bg-blue-600 hover:shadow-md transition duration-500 ease-in-out">
              <Link to={`/${lat}/${lon}`}>More Details</Link>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default MapWeatherPanel;
