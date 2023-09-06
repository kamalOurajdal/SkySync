import React from 'react'

async function  IconImage ({iconName})  {
    const y = await 
    console.log("icon from:" , iconName);
    const iconImage = `./../media/icons/weather_icon/${iconName}.png`
  return (
    <div>
      <img src={iconImage} alt="" />
    </div>
  )
}

export default IconImage
