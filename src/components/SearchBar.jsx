import React, { useState } from "react";
import { UilMapMarker } from "@iconscout/react-unicons";
import { USERNAME } from "./Constant";

function SearchBar({ onSearchChange, setLocation }) {
  const [SearchedValue, setSearchedValue] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(true);
  const [suggestions, setSuggestions] = useState([]);

  // const handleSearchedChange = (event) => {
  //   setSearchedValue(event.target.value);
  // }
  const handleKeyPress = (event) => {
    if (onSearchChange && event.key === "Enter")
      if (event.key === "Enter") {
        onSearchChange(SearchedValue);
        setShowSuggestion(false);
      }
  };

  // get the latitude and longitude of the curent location using location pin
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat:latitude, lng:longitude }); // Pass location to parent
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported in this browser.");
    }
  };

  const handleChange = async (e) => {
    const query = e.target.value;
    setSearchedValue(e.target.value);

    try {
      const response = await fetch(
        `http://api.geonames.org/searchJSON?name_startsWith=${query}&maxRows=10&username=${USERNAME}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const citySuggestions = data.geonames.map((city) => {
        return {
          name: city.name,
          countryName: city.countryName,
          region: city.adminName1,
          coord: { lat: city.lat, lng: city.lng },
        };
      });
      setSuggestions(citySuggestions);
    } catch (error) {
      console.error(error);
    }
    setShowSuggestion(true);
  };

  const handleClickSuggestion = (latitude, longitude) => {
    setLocation({ lat:latitude, lng:longitude });
    setShowSuggestion(false);
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
        {SearchedValue && showSuggestion && (
          <div className="absolute bg-gray-200 rounded-lg w-150  focus:outline-none  shadow-xl shadow-gray-500 h-fit max-h-48 overflow-auto scrollbar-thin scrollbar-thumb-gray-300">
            {suggestions.map(({ name, countryName, region, coord }, index) => (
              <>
                <button
                  key={index}
                  className="border-b border-gray-300 h-14 px-5 block text-left w-full hover:shadow-lg hover:bg-white "
                  onClick={() => handleClickSuggestion(coord.lat, coord.lng)}
                >
                  <p className="font-bold" >{name}, <span className="text-gray-400">{countryName}</span></p>
                  
                  <span className="text-gray-600"> {region}</span>

                </button>
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
