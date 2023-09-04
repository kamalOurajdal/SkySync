import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import ReactDOM from "react-dom";
import cloudy from "../media/icons/sunset_icon.png";

import { MapContainer, TileLayer, MapConsumer } from "react-leaflet";
import L from "leaflet";

import SearchBar from "../components/SearchBar";

const Map = () => {
  const CustomPopupContent = async () => {
    {
      const content = document.createElement("div");
      ReactDOM.render(
        <div className="w-32 flex flex-col space-y-0">
          <span className="font-bold text-lg  mx-auto">Agadir</span>
          <div className="flex items-center justify-between">
            <img src={cloudy} alt="" className="w-10" />
            <p className="text-xl font-bold">36 C</p>
          </div>
        </div>,
        content
      );
      return content;
    }
  };
  return (
    <div className=" w-full">
      <SearchBar />

      <div className="w-full h-full mr-4 pb-14 flex ">
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

          <MapConsumer>
            {(map) => {
              map.on("click", async function (e) {
                const { lat, lng } = e.latlng;
                // show popup in clicked place on the map
                L.popup()
                  .setLatLng(e.latlng)
                  .setContent(await CustomPopupContent())
                  .openOn(map);
              });

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
