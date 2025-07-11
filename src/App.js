import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Navigate } from "react-router-dom";
import { Route } from "react-router-dom";
import Weather from "./pages/Weather";
import About from "./pages/About";
import Map from "./pages/WeatherMap";

function App() {
  return (
    <div
      className="bg-gradient-to-br from-blue-50 via-white to-purple-50 cursor-default mx-auto  w-full lg:max-w-6xl shadow-xl shadow-gray-400  rounded-lg  bg-cover bg-center "
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="" element={<Navigate to="weather" replace />} />
            <Route path="weather" element={<Weather />}>
              <Route index element={<Weather />} />
              <Route path=":lat/:lon" element={<Weather />} />
            </Route>
            <Route path="map" element={<Map />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<Navigate to="/weather" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
