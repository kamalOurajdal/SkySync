import { DateTime } from "luxon";
import { WEATHER_API_KEY } from "../components/Constant";

// API key and base URL for OpenWeatherMap API
const WEATHER_API = WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  // Add search parameters and API key to the URL
  url.search = new URLSearchParams({ ...searchParams, appid: WEATHER_API });

  return fetch(url).then((res) => res.json());
};

// Function to format current weather data
const formatCurrentWeather = (data) => {

    // Extract relevant data from the API response
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
    
  } = data;

  const { main, icon, description } = weather[0];

  const CurrentWeather = {
    lat,
    lon,
    temp,
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
    timezone,
    pressure,
    description,
  };
  // return the formated data
  return { currentWeather: CurrentWeather };
};

// Function to format forecast weather data
const formatForecastWeather = (data) => {
    // Extract timezone and forecast list from the API response
  let { timezone, list } = data;

  // Extract today's forecast data (first 8 entries in the list)
  const todayForecast = list.slice(0, 8);

  let dailyWeatherData = {};

  let processedForecast = {};

  // Iterate through the entire forecast list
  for (const key in todayForecast) {
    const value = todayForecast[key];
    const dateTimeParts = value.dt_txt.split(" "); // Split date and time
    const timeParts = dateTimeParts[1].split(":"); // Split time into hours and minutes

    const hour = `${timeParts[0]}:${timeParts[1]}`; // Extract hour from "dt_txt"
    const icon = value.weather[0].icon; // Extract the icon value
    const temp = Math.round(value.main.temp); // Extract the temperature value

    // Create an object for the current time slot
    const timeSlotData = { hour, icon, temp };

    // Store the data in the processedForecast object
    processedForecast[key] = timeSlotData;
  }

   // Iterate through the entire forecast list
  for (const entry of list) {
    // Extract data for each time slot and day
    const dateTime = entry.dt_txt;
    const day = dateTime.split(" ")[0];
    const date = new Date(day);

    const daysOfWeek = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
    ];

    const dayName = daysOfWeek[date.getDay()];
    const time = dateTime.split(" ")[1];
    const icon = entry.weather[0].icon;
    const desctiption = entry.weather[0].main;

    const tempMin = entry.main.temp_min;
    const tempMax = entry.main.temp_max;

    // check if we have a dailyweather with the same dayName
    if (!dailyWeatherData[dayName]) {
        // Create a new entry for the day
      dailyWeatherData[dayName] = {
        dayName: daysOfWeek[date.getDay()],
        tempMin: Math.round(tempMin),
        tempMax: Math.round(tempMax),
        icon: icon,
        description: desctiption,
      };
    } else {
        // Update the existing entry if needed
      if (tempMin < dailyWeatherData[dayName].tempMin) {
        dailyWeatherData[dayName].tempMin = Math.round(tempMin);
      }
      if (tempMax > dailyWeatherData[dayName].tempMax) {
        dailyWeatherData[dayName].tempMax = Math.round(tempMax);
      }
      // check if time === 12:00:00
      if (time === "12:00:00") {
        dailyWeatherData[dayName].icon = icon;
        dailyWeatherData[dayName].description = desctiption;
      }
    }
  }

  // return today forecast and daily forecast
  return { todayForecast: processedForecast, dailyForecast: dailyWeatherData };
};


// Function to get formatted weather data based on search parameters
const getFormattedWeatherData = async (searchParams) => {
    // get the current weather if the location pin is clicked
  if (searchParams.location) {
     // Fetch current weather data and format it
    const formattedCurrentWeather = await getWeatherData("weather", {
      lat: searchParams.location.lat,
      lon: searchParams.location.lng,
      units: searchParams.units,
    }).then(formatCurrentWeather);

     // Fetch forecast weather data and format it
    const formattedForecastWeather = await getWeatherData("forecast", {
      lat: searchParams.location.lat,
      lon: searchParams.location.lng,
      units: searchParams.units,
    }).then(formatForecastWeather);
    // Return both current and forecast weather data
    return { ...formattedCurrentWeather, ...formattedForecastWeather };
  } 
  else {
    // Fetch current weather data and format it using search bar
    const formattedCurrentWeather = await getWeatherData("weather", {
      q: searchParams.SearchValue,
      units: searchParams.units,
    }).then(formatCurrentWeather);
    // Fetch forecast weather data and format it using search bar
    const formattedForecastWeather = await getWeatherData("forecast", {
      q: searchParams.SearchValue,
      units: searchParams.units,
    }).then(formatForecastWeather);
    // Return both current and forecast weather data
    return { ...formattedCurrentWeather, ...formattedForecastWeather };
  }
};

const formatToLocalTime = (
  secs,
  zone,
  format,
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);



export default getFormattedWeatherData;

export { getWeatherData, formatToLocalTime };

