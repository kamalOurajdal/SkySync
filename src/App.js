import "./App.css";
import Navbar from "./components/Navbar";
import weather_bg from "./assets/backgound/weather_bg.jpg";
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Weather from "./pages/Weather";
import WeatherMap from "./pages/Map";
import About from "./pages/About";

function App() {
  
  return (
    <div
      className="cursor-default mx-auto min-h-screen w-full sm:max-w-[700px] lg:max-w-[900px] mt-4 py-4 px-2 shadow-xl shadow-gray-400 rounded-lg bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${weather_bg}` }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
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
