import React from "react";
import react_icon from "../media/icons/weather_icon/react_icon.png";
import leaflet_icon from "../media/icons/weather_icon/leaflet_icon.png";
import tailwind_icon from "../media/icons/weather_icon/tailwind_icon.png";
import openweather_icon from "../media/icons/weather_icon/openweather_icon.png";
import geonames_icon from "../media/icons/weather_icon/geonames_icon.png";

function Settings() {
  return (
    <div className="mx-2 px-4 flex flex-col justify-center bg-white bg-opacity-80 rounded-xl items-center">
      <h1 className="font-bold text-center text-3xl ">About Our Weather App</h1>
      <p className=" text-center mt-7 text-lg  font-medium text-gray-700">
        This app is designed to provide the most accurate weather information in
        the most efficient way possible. It is crafted to be as simple as
        possible, ensuring access to the weather information needed
      </p>
      <h1 className="text-xl font-bold text-center mt-5 text-gray-700">
        Technologies:
      </h1>
      <div className="flex justify-around items-end bg-gray-100 rounded-md w-100 shadow-md py-3 mt-2">
        <div className="flex flex-col items-center mt-4 ">
          <img src={react_icon} alt="" className="w-20" />
          <h1 className="font-bold text-gray-600">React</h1>
        </div>
        <div className="flex flex-col items-center">
          <img src={tailwind_icon} alt="" className="w-20" />
          <h1 className="font-bold mt-3 text-gray-600">Tailwind CSS</h1>
        </div>
        <div className="flex flex-col items-center">
          <img src={leaflet_icon} alt="" className="w-24" />
          <h1 className="font-bold mt-1 text-gray-600">Leaflet Maps</h1>
        </div>
      </div>
      <h1 className="text-xl font-bold text-center mt-4 text-gray-700">
        APIs:
      </h1>
      <div className="flex justify-around bg-gray-100 rounded-md w-100 shadow-md py-3 mt-2">
        <div className="flex flex-col items-center justify-center">
          <img src={openweather_icon} alt="" className="w-20" />
          <h1 className="font-bold text-gray-600 mt-1">OpenWeather API</h1>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img src={geonames_icon} alt="" className="w-16" />
          <h1 className="font-bold text-gray-600 mt-1">Geonames API</h1>
        </div>
      </div>
    </div>
  );
}

export default Settings;
