import React, { useState, useEffect } from "react";
import TodayBriefWeather from "../components/TodayBriefWeather";
import SearchBar from "../components/SearchBar";
import TodayForecast from "../components/TodayForecast";
import TodayWeatherDetails from "../components/TodayWeatherDetails";
import WeatherWidget from "../components/WeatherWidget";
import FiveDayForcast from "../components/FiveDayForecast";
import getFormattedWeatherData from "./../services/WeatherServices";

function Weather() {
  const [weather, setWeather] = useState({});
  const [units, setUnits] = useState("metric");

  const [SearchValue, setSearchValue] = useState("agadir");
  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const [location, setLocation] = useState(null);
  const handleLocation = (value) => {
    setLocation(value);
  };

  //fetch weather on each time the searched city or location change
  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ location, SearchValue, units }).then(
        (data) => setWeather(data)
      );
    };

    fetchWeather();
    setLocation(null)
  }, [SearchValue, location]);
  console.log("forecast: " + JSON.stringify(weather.dailyForecast, null, 2));

  return (
    <div className="flex w-full ">
      <div className="flex flex-col  ml-2 w-100">
        <SearchBar
          onSearchChange={handleSearchChange}
          CurrentLocation={handleLocation}
        />
      <div className="pr-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-200  ">
        
        {weather.currentWeather && (
          <>
            <TodayBriefWeather currentWeather={weather.currentWeather} />
            <TodayForecast todayForecast={weather.todayForecast}/>
            <TodayWeatherDetails currentWeather = {weather.currentWeather}/>
          </>
        )}
      </div>
      </div>
      
      <FiveDayForcast dailyForecast={weather.dailyForecast}/>
    </div>
  );
}

export default Weather;
