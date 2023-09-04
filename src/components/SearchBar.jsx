import React, { useState } from "react";
import { UilMapMarker } from "@iconscout/react-unicons";
import { USERNAME } from "./Constant";

function SearchBar({ onSearchChange, setLocation }) {
  const [SearchedValue, setSearchedValue] = useState("");
  const [suggestedLocation, setSuggestedLocation] = useState(null)
  const [showSuggestion, setShowSuggestion] = useState(true)
  const [suggestions, setSuggestions] = useState([]);

  // const handleSearchedChange = (event) => {
  //   setSearchedValue(event.target.value);
  // }
  const handleKeyPress = (event) => {
    if (onSearchChange && event.key === "Enter")
      if (event.key === "Enter") {
        onSearchChange(SearchedValue);
        setShowSuggestion(false)
      }
  };

  // get the latitude and longitude of the curent location using location pin
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude }); // Pass location to parent
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
    setSearchedValue(query);

    try {
      const response = await fetch(
        `http://api.geonames.org/postalCodeSearchJSON?placename_startsWith=${query}&maxRows=10&username=${USERNAME}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const citySuggestions = data.postalCodes.map((city) => {
        return {
          name: city.placeName,
          countryCode: city.countryCode,
          coord: { lat: city.lat, lng: city.lng },
        };
      });
      setSuggestions(citySuggestions);
    } catch (error) {
      console.error(error);
    }
    setShowSuggestion(true)
  };

  const handleClickSuggestion = (latitude, longitude) =>{
    setSuggestedLocation({latitude, longitude})
    setLocation(suggestedLocation)
    setShowSuggestion(false)
  }

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
          <div className="absolute bg-gray-200 rounded-lg w-150 p-5 focus:outline-none h-40 overflow-auto scrollbar-thin scrollbar-thumb-gray-300">
            {suggestions.map(({name, countryCode, coord} , index) => (
              <>
                <button
                  key={index}
                  className="border-b border-gray-400 h-10 block text-left w-full"
                  onClick={() => handleClickSuggestion(coord.lat, coord.lng)}
                >
                  <span className="font-bold">{name}</span>,{" "}
                  {countryCode}
                </button>
              </>
            ))}
            {console.log(
              "suggestions : " + JSON.stringify(suggestions, null, 2)
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
