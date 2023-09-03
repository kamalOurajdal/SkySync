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
        <p className='text-gray-400 text-sm'>{main}: {temp_max}/{temp_min}</p>
        <p className='font-bold text-5xl mt-9' > {feels_like}°</p>
      </div>
      <img
        className='w-32 h-32 mr-10'
        // className='mr-10 bg-transparent p-0 h-40'
        src={`http://openweathermap.org/img/wn/${icon}@4x.png`}
        // src={cloudy}
      />
    </div>
  )
}

export default TodayBriefWeather
