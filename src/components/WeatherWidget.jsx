import React from "react";

function WeatherWidget({ info }) {
  return (
    <div className=" bg-white bg-opacity-80  rounded-xl w-60 h-28 flex flex-col justify-center items-center hover:text-lg">
      {info.title !== "sun" ? (
        <div className="flex flex-col  items-center">
          <img src={info.icon} alt="" className="w-10" />
          <h1 className="font-bold">{info.title}</h1>
          <p className="font-bold text-lg text-gray-600">{info.data} {info.unit}</p>
        </div>
      ) : (
        <div className="flex justify-around w-full ">
          <div className="flex flex-col  items-center">
            <img src={info.sunriseIcon} alt="" className="w-14" />
            <h1 className="font-bold">Sunrise</h1>
            <p className="font-bold text-lg text-gray-600">{info.data.sunriseTime} </p>
          </div>
          <div className="flex flex-col  items-center">
            <img src={info.sunsetIcon} alt="" className="w-14" />
            <h1 className="font-bold">Sunset</h1>
            <p className="font-bold text-lg text-gray-600">{info.data.sunsetTime}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherWidget;
