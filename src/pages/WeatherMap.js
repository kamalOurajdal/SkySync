import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Popup, useMapEvents } from "react-leaflet";
import {
  formatCurrentWeather,
  getIcon,
  getWeatherData,
} from "../services/WeatherServices";
import { Eye } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

// --- WeatherPopup: Handles popup content (loading, weather, error) ---
const WeatherPopup = ({
  isDark,
  isLoading,
  weatherData,
  location,
  clickedLocation,
  setLocation,
}) => {
  if (isLoading) {
    return (
      <div className="p-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <div className={`w-12 h-12 border-4 ${isDark ? 'border-dark-primary/20' : 'border-light-primary/20'} ${isDark ? 'border-t-dark-primary' : 'border-t-light-primary'} rounded-full animate-spin transition-colors duration-300`}></div>
            <div className={`absolute inset-0 w-12 h-12 border-4 border-transparent ${isDark ? 'border-r-dark-secondary' : 'border-r-light-secondary'} rounded-full animate-spin animation-delay-150 transition-colors duration-300`}></div>
          </div>
          <div className="text-center">
            <p className={`text-sm font-medium ${isDark ? 'text-dark-text' : 'text-light-text'} transition-colors duration-300`}>Loading weather data...</p>
            <div className="flex justify-center mt-2 space-x-1">
              <div className={`w-2 h-2 ${isDark ? 'bg-dark-primary' : 'bg-light-primary'} rounded-full animate-bounce transition-colors duration-300`}></div>
              <div className={`w-2 h-2 ${isDark ? 'bg-dark-primary' : 'bg-light-primary'} rounded-full animate-bounce animation-delay-200 transition-colors duration-300`}></div>
              <div className={`w-2 h-2 ${isDark ? 'bg-dark-primary' : 'bg-light-primary'} rounded-full animate-bounce animation-delay-400 transition-colors duration-300`}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (weatherData) {
    return (
      <>
        <div className="px-4 pb-2">
          { 
            weatherData.name 
            && 
            <h3 className={`font-semibold text-lg text-center truncate border-b ${isDark ? 'border-dark-border text-dark-text' : 'border-light-border text-light-text'} py-2 transition-colors duration-300`}>
              {weatherData.name}
            </h3>
          }
         
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img
                src={getIcon(weatherData.icon)}
                alt="Weather icon"
                className="h-12 drop-shadow-md"
              />
              <div>
                <p className={`text-2xl font-bold ${isDark ? 'text-dark-text' : 'text-light-text'} transition-colors duration-300`}>
                  {Math.round(weatherData.temp)}°C
                </p>
                <p className={`text-sm ${isDark ? 'text-dark-textSecondary' : 'text-light-textSecondary'} capitalize transition-colors duration-300`}>
                  {weatherData.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          className={`w-full bg-gradient-to-r ${isDark ? 'from-dark-primary to-dark-secondary hover:from-dark-secondary hover:to-purple-600' : 'from-light-primary to-light-secondary hover:from-light-secondary hover:to-purple-600'} text-white font-semibold py-3 transition-all duration-300 transform`}
        >
          <Link to={`/weather/${location.lat}/${location.lng}`}>
            <div className="relative flex items-center justify-center gap-2 text-white">
              <Eye className="w-5 h-5" />
              <span>View Detailed Forecast</span>
            </div>
          </Link>
        </button>
      </>
    );
  }
  // Error state
  return (
    <div className="p-4 text-center">
      <div className="text-red-500 mb-2">
        <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <p className={`text-sm ${isDark ? 'text-dark-textSecondary' : 'text-light-textSecondary'} transition-colors duration-300`}>Unable to load weather data</p>
      <button
        onClick={() => setLocation({ ...clickedLocation })}
        className={`mt-2 px-3 py-1 ${isDark ? 'bg-dark-primary hover:bg-dark-secondary' : 'bg-light-primary hover:bg-light-secondary'} text-white text-xs rounded transition-all duration-300 hover:scale-105`}
      >
        Try Again
      </button>
    </div>
  );
};

// --- LocationMarker: Handles map click, centering, and popup ---
const LocationMarker = ({
  location,
  setLocation,
  clickedLocation,
  setClickedLocation,
  weatherData,
  isLoading,
  isDark,
}) => {
  const map = useMapEvents({
    click(e) {
      const newLocation = { lat: e.latlng.lat, lng: e.latlng.lng };
      setClickedLocation(newLocation);
      setLocation(newLocation);
    },
  });

  useEffect(() => {
    if (location.lat && location.lng) {
      map.setView([location.lat, location.lng], 10);
    }
  }, [location, map]);

  if (!clickedLocation) return null;

  return (
    <Popup
      closeButton={false}
      position={[clickedLocation.lat, clickedLocation.lng]}
      onClose={() => setClickedLocation(null)}
      className={isDark ? 'popup-dark' : 'popup-light'}
    >
      <div className={`w-48 ${isDark ? 'bg-dark-surface' : 'bg-light-surface'} rounded-lg overflow-hidden shadow-xl transition-all duration-300`}>
        <WeatherPopup
          isDark={isDark}
          isLoading={isLoading}
          weatherData={weatherData}
          location={location}
          clickedLocation={clickedLocation}
          setLocation={setLocation}
        />
      </div>
    </Popup>
  );
};

// --- Main WeatherMap component ---
const WeatherMap = () => {
  const { isDark } = useTheme();

  // Add custom CSS for animation delays and popup styling
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .animation-delay-150 { animation-delay: 150ms; }
      .animation-delay-200 { animation-delay: 200ms; }
      .animation-delay-400 { animation-delay: 400ms; }
      .leaflet-popup-content-wrapper { padding: 0 !important; margin: 0 !important; border-radius: 0.5rem !important; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important; }
      .leaflet-popup-content { margin: 0 !important; padding: 0 !important; width: auto !important; border-radius: 0.5rem !important; overflow: hidden; }
      .leaflet-popup-tip-container { width: 30px !important; height: 15px !important; }
      .leaflet-popup-tip { background: transparent !important; border: none !important; box-shadow: none !important; }
      .leaflet-popup-tip-container::after { content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 10px solid; border-top-color: var(--popup-bg-color); filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1)); }
      .popup-light .leaflet-popup-tip-container::after { --popup-bg-color: #ffffff; }
      .popup-dark .leaflet-popup-tip-container::after { --popup-bg-color: #1f2937; }
    `;
    style.setAttribute('data-map-animations', 'true');
    if (!document.head.querySelector('style[data-map-animations]')) {
      document.head.appendChild(style);
    }
    return () => {
      if (document.head.contains(style)) document.head.removeChild(style);
    };
  }, []);

  const [SearchValue, setSearchValue] = useState("");
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [weatherData, setWeatherData] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = (value) => setSearchValue(value);
  const handleLocation = (value) => setLocation(value);

  // Fetch weather data when location changes
  useEffect(() => {
    const fetchWeather = async (lat, lng) => {
      if (!lat || !lng) return;
      setIsLoading(true);
      try {
        const data = await getWeatherData("weather", {
          lat: lat,
          lon: lng,
          units: "metric",
        });
        const formattedData = await formatCurrentWeather(data);
        setWeatherData(formattedData.currentWeather);
      } catch (error) {
        setWeatherData(null);
      } finally {
        setIsLoading(false);
      }
    };
    if (location.lat && location.lng) {
      setClickedLocation(location);
      fetchWeather(location.lat, location.lng);
    }
  }, [location]);

  return (
    <div className="h-screen flex flex-col gap-4 transition-colors duration-300">
      <div className="sticky top-0 z-20 py-4 bg-light-background/80 dark:bg-dark-background/80 backdrop-blur-sm transition-colors duration-300">
        <SearchBar onSearchChange={handleSearchChange} setLocation={handleLocation} />
      </div>
      <div className="flex flex-1 overflow-hidden relative z-10 rounded-xl mx-4">
        <div className="flex-col transition-all duration-300 flex flex-1 rounded-xl">
          <div className="flex-1 relative">
            <MapContainer center={[31.61, -7.61]} zoom={5} scrollWheelZoom className="w-full h-full overflow-hidden">
              <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
              <LocationMarker
                location={location}
                setLocation={setLocation}
                clickedLocation={clickedLocation}
                setClickedLocation={setClickedLocation}
                weatherData={weatherData}
                isLoading={isLoading}
                isDark={isDark}
              />
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherMap;