import React from 'react'
import { UilSun } from "@iconscout/react-unicons";


function WeatherWidget({title}) {
  return (
    <div className=' bg-white bg-opacity-50 rounded-xl w-40 h-30  flex flex-col items-center '>
        <UilSun/>
        <h3>{title}</h3>
        <p>22C°</p>
      
    </div>
  )
}

export default WeatherWidget
