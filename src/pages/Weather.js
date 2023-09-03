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
  }, [SearchValue, location]);
  console.log("current: " + JSON.stringify(weather.currentWeather, null, 2));

  return (
    <div className="flex w-full ">
      <div className="pr-2 ml-2 w-2/3 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-200  ">
        <SearchBar
          onSearchChange={handleSearchChange}
          CurrentLocation={handleLocation}
        />
        {weather.currentWeather && (
          <>
            <TodayBriefWeather currentWeather={weather.currentWeather} />
            <TodayForecast todayForecast={weather.todayForecast}/>
            <TodayWeatherDetails currentWeather = {weather.currentWeather}/>
          </>
        )}
      </div>
      <FiveDayForcast />
    </div>
  );
}

export default Weather;
