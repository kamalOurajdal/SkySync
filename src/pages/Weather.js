import React, { useState, useEffect } from "react";
import TodayBriefWeather from "../components/TodayBriefWeather";
import SearchBar from "../components/SearchBar";
import TodayForecast from "../components/TodayForecast";
import TodayWeatherDetails from "../components/TodayWeatherDetails";
import FiveDayForecast from "../components/FiveDayForecast";
import getFormattedWeatherData, {
  formatToLocalTime,
} from "./../services/WeatherServices";
import loading_svg from "../assets/icons/weather_icon/loading.svg";
import { useParams } from "react-router-dom";
import { Sunset, Loader2, AlertCircle } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

function Weather() {
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isDark } = useTheme();

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

  // Fetch weather on each time the searched city or location change
  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getFormattedWeatherData({
          location,
          SearchValue,
        });
        setWeather(data);
      } catch (err) {
        setError("Failed to fetch weather data. Please try again.");
        console.error("Weather fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [SearchValue, location]);

  // Loading Component
  const LoadingComponent = () => (
      <div className="flex flex-col justify-center items-center h-full w-full min-h-[60vh] space-y-4 animate-fade-in">
        <div className="relative">
          <img src={loading_svg} alt="Loading" className="w-20 h-20 animate-spin" />
          <div className="absolute inset-0 bg-gradient-to-br from-light-primary/20 to-light-secondary/20 dark:from-dark-primary/20 dark:to-dark-secondary/20 rounded-full blur-xl transition-all duration-300"></div>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-1 transition-colors duration-300">
            Loading Weather Data
          </h3>
          <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary transition-colors duration-300">
            Fetching the latest weather information...
          </p>
        </div>
      </div>
  );

  // Error Component
  const ErrorComponent = () => (
      <div className="flex flex-col justify-center items-center h-full w-full min-h-[60vh] space-y-4 animate-fade-in">
        <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-full transition-colors duration-300">
          <AlertCircle className="w-12 h-12 text-red-500" />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2 transition-colors duration-300">
            Unable to Load Weather Data
          </h3>
          <p className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-4 transition-colors duration-300">
            {error}
          </p>
          <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-light-primary dark:bg-dark-primary text-white rounded-lg hover:bg-light-secondary dark:hover:bg-dark-secondary transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
  );

  // Sunset Card Component
  const SunsetCard = ({ sunset, timezone }) => {
    if (!sunset || !timezone) return null;

    const sunsetTime = formatToLocalTime(sunset, timezone / 60).split("|")[1];

    return (
        <div className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 mb-6 animate-slide-up">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
              <Sunset className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">
                Don't Miss the Sunset
              </h3>
              <p className="text-lg opacity-90">
                Sunset will be at <span className="font-semibold">{sunsetTime}</span>
              </p>
            </div>
          </div>
        </div>
    );
  };

  return (
      <div className="min-h-screen transition-colors duration-300 ease-in-out">
        <div className="sticky top-0 z-20 py-4 mb-2 bg-light-background/80 dark:bg-dark-background/80 backdrop-blur-sm transition-colors duration-300">
          {/* Search Bar */}
          <SearchBar
              onSearchChange={handleSearchChange}
              setLocation={handleLocation}
          />
        </div>
        <div className="container mx-auto px-4 pt-4 pb-4 max-w-7xl">

          {/* Loading State */}
          {loading && <LoadingComponent/>}

          {/* Error State */}
          {error && !loading && <ErrorComponent/>}

          {/* Main Content */}
          {!loading && !error && (
              <div className="flex flex-col gap-6 animate-fade-in">
                <div className=" flex-grow overflow-auto space-y-7">
                  {/* Today's Brief Weather */}
                  <div className="w-full">
                    <TodayBriefWeather
                        currentWeather={weather.currentWeather}
                        isLoading={loading}
                    />
                  </div>

                  {/* Today's Forecast */}
                  <div className="w-full">
                    <TodayForecast
                        todayForecast={weather.todayForecast}
                        isLoading={loading}
                    />
                  </div>

                  {/* Mobile Five Day Forecast */}
                  <div className="">
                    <FiveDayForecast
                        dailyForecast={weather.dailyForecast}
                        isLoading={loading}
                    />
                  </div>

                  {/* Sunset Card */}
                  <SunsetCard
                      sunset={weather.currentWeather?.sunset}
                      timezone={weather.currentWeather?.timezone}
                  />

                  {/* Weather Details */}
                  <div className="w-full pb-4">
                    <TodayWeatherDetails currentWeather={weather.currentWeather}/>
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>
  );
}

export default Weather;