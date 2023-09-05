import React, { useState } from "react";
// import "leaflet/dist/leaflet.css"; 
import ReactDOM from "react-dom";
import SearchBar from "../components/SearchBar";


import { MapContainer, TileLayer, MapConsumer } from "react-leaflet";
import L from "leaflet";
import { getWeatherData } from "../services/WeatherServices";

const Map = () => {
  const [SearchValue, setSearchValue] = useState("");

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };
  const [location, setLocation] = useState(null);
  const handleLocation = (value) => {
    setLocation(value);
  };

  // fetch weather of the place with given latitude and longitude
  const fetchWeather = async (lat, lng) => {
    const weatherData = await getWeatherData("weather", {
      lat: lat,
      lon: lng,
      units: "metric",
    });
    return weatherData;
  };

  let weatherData = null;
  const CustomPopupContent = async (lat, lng) => {
    weatherData = await fetchWeather(lat, lng);
    if (
      weatherData &&
      weatherData.cod !== "404" // Check if it's not a city not found response
    ) {
      const content = document.createElement("div");
      ReactDOM.render(
        <div className="w-full h-fit flex flex-col space-y-0 justify-center px-6">
          <span className="font-bold text-lg  mx-auto">{weatherData.name}</span>
          <div className="flex items-center justify-between">
            <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`} alt="" className="w-16" />
            <p className="text-xl font-bold">
              {Math.round(weatherData.main.temp) + "°C"}
            </p>
          </div>
        </div>,
        content
      );
      return content;
    }
    return null;
  };
  console.log("location 1 :" + JSON.stringify(location, null, 2));

  var point = L.point(1,0)

  var customOptions =
    {
      "autoClose":'false'
    }

  return (
    <div className=" w-full ">
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

          <MapConsumer >
            {(map) => {
              map.on("click", async function (e) {
                const { lat, lng } = e.latlng;
                // show popup in clicked place on the map
                L.popup(customOptions)
                  .setLatLng(e.latlng)
                  .setContent(await CustomPopupContent(lat, lng))
                  .openOn(map);
              });
              if (location !== null) {
                (async () => {
                  const content = await CustomPopupContent(
                    location.lat,
                    location.lng
                  );
                  if (
                    weatherData &&
                    weatherData.cod !== "404"  // Check if it's not a city not found response
                  ) {
                    L.popup()
                      .setLatLng([weatherData.coord.lat, weatherData.coord.lon])
                      .setContent(content)
                      .openOn(map);
                  }
                })();
              }
              return null;
            }}
          </MapConsumer>
        </MapContainer>
        <div className="h-full"></div>
      </div>
    </div>
  );
};

export default Map;
