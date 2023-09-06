import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  MapConsumer,
  Popup,
  Marker,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

function TestMap() {

    // get location of clicked place
      

  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click(e) {
        // map.locate()
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom(25));
        

      }
    });

    return position === null ? null : (
        <Popup position={position}>
            <div className="w-full h-fit flex flex-col space-y-0 justify-center px-6">
          <span className="font-bold text-lg  mx-auto">Agadir</span>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold">
               35 °C
            </p>
          </div>
        </div>
        </Popup>
    );
  }
  return (
    <div className="w-1000 h-600 rounded-xl top-4 shadow-md mr-auto">
      <MapContainer
        center={{ lat: 51.505, lng: -0.09 }}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full rounded-xl top-4 shadow-md mr-2"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}

export default TestMap;
