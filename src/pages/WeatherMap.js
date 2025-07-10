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
import {Eye} from "lucide-react";

const Map = () => {
  const [SearchValue, setSearchValue] = useState("");
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const handleLocation = (value) => {
    setLocation(value);
  };

  useEffect(() => {
    setWeatherData(null);
    const fetchWeather = async (lat, lng) => {
      if (!!lat || !!lng) return;
      await getWeatherData("weather", {
        lat: lat,
        lon: lng,
        units: "metric",
      })
          .then(formatCurrentWeather)
          .then((data) => setWeatherData(data.currentWeather));
    };
    if (location) {
      fetchWeather(location.lat, location.lng);
    }
  }, [location]);

  function LocationMarker({ weatherData }) {
    const map = useMapEvents({
      click(e) {
        setLocation(e.latlng);
      },
    });

    return (!!location?.lng || !!location?.lat) || !!weatherData  && (
        <Popup closeButton={false}  position={location}>
          <div className="w-48 bg-white rounded-lg border-0 overflow-hidden">
              <h3 className="font-semibold text-lg text-center truncate border-b pb-1">
                {weatherData.name}
              </h3>
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                      src={getIcon(weatherData.icon)}
                      alt="Weather icon"
                      className="h-12 drop-shadow-md"
                  />
                  <div>
                    <p className="text-2xl font-bold text-gray-800">
                      {Math.round(weatherData.temp)}°C
                    </p>
                    <p className="text-sm text-gray-600 capitalize">
                      {weatherData.description}
                    </p>
                  </div>
                </div>
              </div>
              <button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-2xl"
              >
                <Link
                    to={`/${location.lat}/${location.lng}`}>
                  <div
                      className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center gap-2 text-white">
                    <Eye className="w-5 h-5"/>
                    <span>View Detailed Forecast</span>
                  </div>
                </Link>

              </button>

            </div>
          </div>
        </Popup>
    );
  }

  return (
      <div className="h-screen flex flex-col gap-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="sticky top-0 z-20 py-4">
          <SearchBar
              onSearchChange={handleSearchChange}
              setLocation={handleLocation}
          />
        </div>

        {/* Main content area */}
        <div className="flex flex-1 overflow-hidden relative z-10 rounded-xl">
          {/* Map container - responsive */}
          <div className="flex-col transition-all duration-300 flex flex-1 rounded-xl">
            <div className="flex-1 relative">
              <MapContainer
                  center={[31.61, -7.61]}
                  zoom={5}
                  scrollWheelZoom
                  className="w-full h-full overflow-hidden"
              >
                <TileLayer
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker weatherData={weatherData}/>
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Map;