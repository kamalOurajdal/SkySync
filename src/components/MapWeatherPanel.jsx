import React from "react";

function MapWeatherPanel({ weatherData }) {
    // const {
    //     feels_like,
    //     temp_min,
    //     temp_max,
    //     humidity,
    //     name,
    //     dt,
    //     country,
    //     sunrise,
    //     sunset,
    //     main,
    //     icon,
    //     speed,
    //     description
    //   } = weatherData
  console.log("Weather " + JSON.stringify(weatherData, null, 2));
  return (
    <div className="w-60 bg-white bg-opacity-50 rounded-xl pt-14 h-full mt-4 ">
      {weatherData &&
        <div>
          <h2></h2>
          <p>Lat: 24</p>
          <p>Lng: 54</p>
        </div>
      }
    </div>
  );
}

export default MapWeatherPanel;
