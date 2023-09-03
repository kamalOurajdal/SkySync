import React, {useState} from 'react'
import TodayBriefWeather from '../components/TodayBriefWeather'
import SearchBar from '../components/SearchBar';
import TodayForecast from '../components/TodayForecast';

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
    <div>
      <SearchBar
        onSearchChange={handleSearchChange}
        CurrentLocation={handleLocation}
      />
      <div>
        <TodayBriefWeather />
        <TodayForecast/>
      </div>
      
    </div>
  )
}


export default Weather
