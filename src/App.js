import "./App.css";
import LeftMenu from "./components/LeftMenu";
import weather_bg from "./media/backgound/weather_bg.jpg";
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Weather from "./pages/Weather";
import WeatherMap from "./pages/Map";
import About from "./pages/About";

function App() {
  
  return (
    <div
      className="cursor-default mx-auto h-600 max-w-screen-lg mt-4 py-4 px-2 shadow-xl shadow-gray-400  rounded-lg  bg-cover bg-center "
      style={{ backgroundImage: `url(${weather_bg}` }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LeftMenu />}>
            <Route  index element={<Weather/>} />
            <Route path="Map" element={<WeatherMap />} />
            <Route path="About" element={<About/>}/>
            <Route path="/:lat/:lon" element={<Weather />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
