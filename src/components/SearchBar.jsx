import React, { useState } from "react";
import { UilMapMarker } from "@iconscout/react-unicons";
import { USERNAME } from "./Constant";

function SearchBar({ onSearchChange, CurrentLocation }) {
  const [SearchedValue, setSearchedValue] = useState("");

  // const handleSearchedChange = (event) => {
  //   setSearchedValue(event.target.value);
  // }
  const handleKeyPress = (event) => {
    if (onSearchChange && event.key === "Enter")
      if (event.key === "Enter") {
        onSearchChange(SearchedValue);
      }
  };

  // get the latitude and longitude of the curent location using location pin
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          CurrentLocation({ latitude, longitude }); // Pass location to parent
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported in this browser.");
    }
  };

  const [suggestions, setSuggestions] = useState([]);

  const handleChange = async (e) => {
    const query = e.target.value;
    setSearchedValue(query);

    try {
      const response = await fetch(
        `http://api.geonames.org/postalCodeSearchJSON?placename_startsWith=${query}&maxRows=5&username=${USERNAME}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const citySuggestions = data.postalCodes.map((city) => {
        return { name: city.placeName, countryCode: city.countryCode };
      });
      setSuggestions(citySuggestions);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-between flex-row-reverse items-center ">
      <div>
        <UilMapMarker
          onClick={getLocation}
          size={35}
          className="text-white hover:cursor-pointer "
        />
      </div>
      <div className="w-full mr-4 ">
        <input
          type="text"
          placeholder="Search for a city..."
          className="bg-gray-200 rounded-lg h-10 w-full pl-5 focus:outline-none"
          value={SearchedValue}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
        <div className="absolute bg-green-300 rounded-lg w-150 pl-5 focus:outline-none">
          {suggestions.map((city, index) => (
            <button key={index} className=" border border-red-300 block w-full">
              {city.name}, {city.countryCode}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
