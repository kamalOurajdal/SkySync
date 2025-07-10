import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import MapWeatherPanel from "../components/MapWeatherPanel";
import { MapContainer, TileLayer, Popup, useMapEvents } from "react-leaflet";
import {
  formatCurrentWeather,
  getIcon,
  getWeatherData,
} from "../services/WeatherServices";

const Map = () => {
  const [SearchValue, setSearchValue] = useState("");

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };
  const [location, setLocation] = useState(null);
  const handleLocation = (value) => {
    setLocation(value);
  };

  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async (lat, lng) => {
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

    return location === null || weatherData === null ? null : (
      <Popup position={location}>
        <div className="w-36 h-fit flex flex-col  justify-center px-4 mb-1  ">
          <span className="font-bold text-base text-center">
            {weatherData.name}
          </span>
          <div className="h-10 py-2 flex items-center justify-between ">
            <img src={getIcon(weatherData.icon)} alt="" className="h-10" />
            <p className="text-xl font-bold">
              {Math.round(weatherData.temp) + "°"}
            </p>
          </div>
        </div>
      </Popup>
    );
  }

  return (
    <div className="w-full">
      <SearchBar
        onSearchChange={handleSearchChange}
        setLocation={handleLocation}
      />

      <div className="w-full h-full pb-12 flex flex-col lg:flex-row gap-2 mt-2">
        <div
          className={`flex-1 w-full ${
            weatherData ? 'lg:w-2/3' : ''
          } transition-all duration-500 ease-in-out h-full rounded-xl`}
        >
          <MapContainer
            center={[31.61, -7.61]}
            zoom={5}
            scrollWheelZoom={true}
            className="w-full h-full rounded-xl"
          >
            <TileLayer
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <LocationMarker weatherData={weatherData} />
          </MapContainer>
        </div>

 {/*       {weatherData && (
          <div className={`  ${weatherData ? "flex-grow" : "w-0"}  h-full  `}>
            <MapWeatherPanel weatherData={weatherData} />
          </div>
        )}*/}
          <div
            className={`${weatherData ? 'lg:w-1/3 w-full mt-2 lg:mt-0' : 'hidden'} h-full`}
          >
            <MapWeatherPanel weatherData={weatherData} />
          </div>
      </div>
    </div>
  );
};

export default Map;
