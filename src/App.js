import "./App.css";
import LeftMenu from "./components/LeftMenu";
import weather_bg from "./media/backgound/weather_bg.jpg";
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Weather from "./pages/Weather";
import WeatherMap from "./pages/Map";
import Settings from "./pages/Settings";
import { useState } from "react";

function App() {
  
  return (
    <div
      className=" mx-auto h-600 max-w-screen-lg mt-4 py-4 px-3 shadow-xl shadow-gray-400  rounded-lg  bg-cover bg-center "
      style={{ backgroundImage: `url(${weather_bg}` }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LeftMenu />}>
            <Route  index element={<Weather/>} />
            <Route path="Map" element={<WeatherMap />} />
            <Route path="Settings" element={<Settings/>}/>
            <Route path="/:lat/:lon" element={<Weather />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
