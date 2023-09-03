import React from 'react'
import { UilMapMarker } from '@iconscout/react-unicons'


function TodayBriefWeather( ) {



  
  return (
    <div className='flex justify-between items-center mt-2 w-500'>

      <div className='mt-5'>
        <p className='font-bold text-3xl flex items-center'>Agadir, MA <UilMapMarker size={35} className="ml-5"/></p>
        <p className='text-gray-400 text-sm'>Description: 22/21</p>
        <p className='font-bold text-5xl mt-9' > 21C°</p>
      </div>
      <img
        className='w-32 h-32 mr-10'
        // className='mr-10 bg-transparent p-0 h-40'
        src={`http://openweathermap.org/img/wn/${""}@4x.png`}
        // src={cloudy}
      />
    </div>
  )
}

export default TodayBriefWeather
