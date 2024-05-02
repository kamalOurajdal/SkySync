import React from "react";
import react_icon from "../assets/icons/weather_icon/react_icon.png";
import leaflet_icon from "../assets/icons/weather_icon/leaflet_icon.png";
import tailwind_icon from "../assets/icons/weather_icon/tailwind_icon.png";
import openweather_icon from "../assets/icons/weather_icon/openweather_icon.png";
import geonames_icon from "../assets/icons/weather_icon/geonames_icon.png";


function Settings() {

    const technologies = [
        {
            id: 1,
            icon: react_icon,
            name: "React"
        },
        {
            id: 2,
            icon: tailwind_icon,
            name: "Tailwind CSS"
        },
        {
            id: 3,
            icon: leaflet_icon,
            name: "Leaflet Maps"
        }
    ]

  return (
    <div className="px-4 flex flex-col justify-center bg-white bg-opacity-80 rounded-xl items-center">
      <h1 className="font-bold text-center text-xl ">About the App</h1>
      <p className=" text-center mt-7  font-medium text-gray-700">
        This app is designed to provide the most accurate weather information.
          It is crafted to be as simple as possible, ensuring access to the weather information needed
      </p>
      <h1 className=" font-bold text-center mt-5 text-gray-700">
        Technologies:
      </h1>
      <div className="flex justify-around bg-gray-100 rounded-md gap-16 shadow-md py-2 px-8 mt-2">
          {technologies.map((tech) => (
              <div className="flex flex-col items-center gap-2">
                  <img src={tech.icon} alt="" className="h-8"/>
                  <h1 className="font-semibold text-sm text-gray-500">{tech.name}</h1>
              </div>
          ))}
      </div>
      <h1 className="font-bold text-center mt-4 text-gray-700">
        APIs:
      </h1>
      <div className="flex justify-between gap-16 bg-gray-100 rounded-md shadow-md py-3 mt-2 px-4">
        <div className="flex flex-col items-center justify-center">
          <img src={openweather_icon} alt="" className="w-10" />
          <h1 className="font-semibold text-sm text-gray-500 mt-1">OpenWeather API</h1>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img src={geonames_icon} alt="" className="w-8" />
          <h1 className="font-semibold text-sm text-gray-500 mt-1">Geonames API</h1>
        </div>
      </div>
    </div>
  );
}

export default Settings;
