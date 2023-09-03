import React from 'react'
import { UilMapMarker } from '@iconscout/react-unicons'


function TodayBriefWeather( {currentWeather} ) {
  const {
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    main,
    icon,
    speed,
  } = currentWeather


  
  return (
    <div className='flex justify-between items-center mt-2 '>

      <div className='mt-5'>
        <p className='font-bold text-3xl flex items-center'>{name}, {country} <UilMapMarker size={35} className="ml-5"/></p>
        <p className='text-gray-400 text-sm'>{main}: {Math.round(temp_max)}/{Math.round(temp_min)}</p>
        <p className='font-bold text-5xl mt-9' > {Math.round(feels_like)}°</p>
      </div>
      <img
        className='w-40 mr-10'
        src={`http://openweathermap.org/img/wn/${icon}@4x.png`}
      />
    </div>
  )
}

export default TodayBriefWeather
