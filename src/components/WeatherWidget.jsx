import React from "react";

function WeatherWidget({ info }) {
  return (
    <div className=" bg-white bg-opacity-80  rounded-xl flex flex-col justify-center items-center">
      {info.title !== "sun" ? (
        <div className="w-full flex flex-col p-2 gap-2">
          <div className="flex items-center text-gray-600 gap-2">
            <img src={info.icon} alt={info.icon} className="w-4"/>
            <h1>{info.title}</h1>
          </div>
          <p className="font-bold text-xl text-gray-600 text-center">{info.data} {info.unit}</p>
        </div>
      ) : (
        <div className="flex justify-around w-full ">
          <div className="flex flex-col items-center">
            <div className="flex items-center text-gray-600 gap-2">
              <img src={info.sunriseIcon} alt="" className="w-5"/>
              <h1>Sunrise</h1>
            </div>
            <p className="font-bold text-lg text-gray-600">{info.data.sunriseTime} </p>
          </div>
          <div className="flex flex-col  items-center">
            <div className="flex items-center text-gray-600 gap-2">
              <img src={info.sunsetIcon} alt="" className="w-5"/>
              <h1>Sunset</h1>
            </div>

            <p className="font-bold text-lg text-gray-600">{info.data.sunsetTime}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherWidget;
