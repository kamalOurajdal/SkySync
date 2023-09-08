import React, { useState, useEffect } from "react";
import TodayBriefWeather from "../components/TodayBriefWeather";
import SearchBar from "../components/SearchBar";
import TodayForecast from "../components/TodayForecast";
import TodayWeatherDetails from "../components/TodayWeatherDetails";
import FiveDayForcast from "../components/FiveDayForecast";
import getFormattedWeatherData, {
  formatToLocalTime,
} from "./../services/WeatherServices";
import loading_svg from "../media/icons/weather_icon/loading.svg";
import { useParams } from "react-router-dom";

function Weather() {
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state

  const { lat, lon } = useParams();
  useEffect(() => {
    if (lat && lon) {
      setLocation({ lat: lat, lng: lon });
    }
  }, [lat, lon]);

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
      setLoading(true); // Set loading to true before making the API call
      try {
        const data = await getFormattedWeatherData({
          location,
          SearchValue,
        });
        setWeather(data);
      } finally {
        setLoading(false); // Set loading to false after the API call is complete
      }
    };

    fetchWeather();
  }, [SearchValue, location]);

  return (
    <div className="flex flex-col w-full h-full ml-2">
      <SearchBar
        onSearchChange={handleSearchChange}
        setLocation={handleLocation}
      />
      {loading ? (
        <div className="flex justify-center items-center h-full w-full">
          <img src={loading_svg} alt="Loading" className="w-20" />
        </div>
      ) : (
        <div className="flex h-full w-full pb-10  ">
          <div className="w-100 pr-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 ">
            <TodayBriefWeather currentWeather={weather.currentWeather} />
            <TodayForecast todayForecast={weather.todayForecast} />
            <div className="flex flex-col items-center bg-white bg-opacity-80  rounded-xl mt-3 p-4 w-full">
              <h3 className="font-bold text-lg">Don't miss the sunset</h3>
              <p className="font-medium">
                Sunset will be at{" "}
                {
                  formatToLocalTime(
                    weather.currentWeather.sunset,
                    weather.currentWeather.timezone / 60
                  ).split("|")[1]
                }
              </p>
            </div>
            <TodayWeatherDetails currentWeather={weather.currentWeather} />
          </div>

          <FiveDayForcast dailyForecast={weather.dailyForecast} />
        </div>
      )}
    </div>
  );
}

export default Weather;
