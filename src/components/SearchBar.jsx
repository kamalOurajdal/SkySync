import React, { useState } from 'react'
import { UilMapMarker } from '@iconscout/react-unicons'



function SearchBar({ onSearchChange, CurrentLocation }) {
  const [SearchedValue, setSearchedValue] = useState('')

  const handleSearchedChange = (event) => {
    setSearchedValue(event.target.value);
  }
  const handleKeyPress = (event) => {
    if (!!onSearchChange && event.key === "Enter")
      if (event.key === 'Enter') {
        onSearchChange(SearchedValue);
      }
  }


  // get the latitude and longitude of the curent location using location pin
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          CurrentLocation({ latitude, longitude }); // Pass location to parent
        },
        error => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported in this browser.");
    }
  };
  

  return (
    <div className='flex justify-between flex-row-reverse items-center '>
      <div>
      <UilMapMarker onClick={getLocation} size={35} className="text-white hover:cursor-pointer " />
       
      </div>
      <div className='w-full mr-4 '>
        <input type="text"
          placeholder='Search for a city...'
          className='bg-gray-200 rounded-lg h-10 w-full pl-5 focus:outline-none'
          value={SearchedValue}
          onChange={handleSearchedChange}
          onKeyDown={handleKeyPress}
        />
      </div>
    </div>

  )
}

export default SearchBar
