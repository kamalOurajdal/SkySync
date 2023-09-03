import React from "react";
import WeatherWidget from "./WeatherWidget";
import humidity_icon from "./../media/icons/humidity_icon.png"
import wind_icon from "./../media/icons/wind_icon.png"
import sunset_icon from "./../media/icons/sunset_icon.png"
import sunrise_icon from "./../media/icons/sunrise_icon.png"
import pressure_icon from "./../media/icons/pressure_icon2.png"



function TodayWeatherDetails({ data }) {
  return (
    <div className=" mt-4 flex justify-between  h-60">
      <div className=" flex flex-col justify-between">
        <WeatherWidget info={{title:"humidity", icon:humidity_icon}} />
        <WeatherWidget info={{title:"wind", icon:wind_icon}} />
      </div>
      <div className=" flex flex-col justify-between ">
        <WeatherWidget info={{title:"pressure", icon:pressure_icon}} />
        <WeatherWidget info={{title:"sun", sunsetIcon:sunset_icon, sunriseIcon:sunrise_icon}} />
      </div>
    </div>
  );
}

export default TodayWeatherDetails;
