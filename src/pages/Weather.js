import React, { useState } from "react";
import TodayBriefWeather from "../components/TodayBriefWeather";
import SearchBar from "../components/SearchBar";
import TodayForecast from "../components/TodayForecast";
import TodayWeatherDetails from "../components/TodayWeatherDetails";
import WeatherWidget from "../components/WeatherWidget";
import FiveDayForcast from "../components/FiveDayForecast";

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

  return (
    <div className="flex w-full">
      <div className="ml-2 w-2/3 overflow-auto">
          <SearchBar
            onSearchChange={handleSearchChange}
            CurrentLocation={handleLocation}
          />
          <TodayBriefWeather />
          <TodayForecast />
          <TodayWeatherDetails />
        
      </div><FiveDayForcast />
    </div>
  );
}

export default Weather;
