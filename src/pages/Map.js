import React, { useEffect, useState } from "react";
// import "leaflet/dist/leaflet.css";
import SearchBar from "../components/SearchBar";

import {
  MapContainer,
  TileLayer,
  MapConsumer,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { formatCurrentWeather, getWeatherData } from "../services/WeatherServices";
import { render } from "react-dom";
import { createRoot } from "react-dom/client";
import MapWeatherPanel from "../components/MapWeatherPanel";

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
  const [popup, setPopup] = useState(null)


  useEffect(() => {
    const fetchWeather = async (lat, lng) => {
      await getWeatherData("weather", {
        lat: lat,
        lon: lng,
        units: "metric",
      }).then(formatCurrentWeather).then((data) => setWeatherData(data.currentWeather));
      console.log("fetch weather");
    };
    if (location) {
      fetchWeather(location.lat, location.lng)
    }
    
  }, [location]);

  function LocationMarker({ weatherData }) {
    const map = useMapEvents({
      click(e) {
        // map.locate()
        setLocation(e.latlng);
        // map.flyTo(e.latlng, map.getZoom(25));
      },
    });
    console.log("locationMarher runed");

    return (location === null || weatherData ===null) ? null : (
      <Popup position={location}>
        <div className="w-full h-fit flex flex-col space-y-0 justify-center px-6">
          <span className="font-bold text-lg  mx-auto">{weatherData.name}</span>
          <div className="flex items-center justify-between">
          <img
              src={`http://openweathermap.org/img/wn/${weatherData.icon}@4x.png`}
              alt=""
              className="w-16"
            />
            <p className="text-xl font-bold">
              {Math.round(weatherData.temp) + "°C"}
            </p>
          </div>
        </div>
      </Popup>
    );
  }
  // console.log("location 1 :" + JSON.stringify(location, null, 2));

  return (
    <div className="w-full ml-2">
      <SearchBar
        onSearchChange={handleSearchChange}
        setLocation={handleLocation}
      />

      <div className="w-full h-full mr-4 pb-14 flex">
        <MapContainer
          center={[31.61, -7.61]}
          zoom={5}
          scrollWheelZoom={true}
          className="w-full h-full rounded-xl top-4 shadow-md mr-2"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <LocationMarker weatherData={weatherData} />
        </MapContainer>
        <div className="h-full">
          <MapWeatherPanel weatherData={weatherData} />
        </div>
      </div>
    </div>
  );
};

export default Map;
