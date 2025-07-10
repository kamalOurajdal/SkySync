import "./App.css";
import Navbar from "./components/Navbar";
import weather_bg from "./assets/backgound/weather_bg.jpg";
import {BrowserRouter, Routes} from "react-router-dom";
import {Route} from "react-router-dom";
import Weather from "./pages/Weather";
import About from "./pages/About";
import Map from "./pages/WeatherMap";

function App() {

    return (
        <div
            className="bg-gradient-to-br from-blue-50 via-white to-purple-50 cursor-default mx-auto  w-full lg:max-w-6xl shadow-xl shadow-gray-400  rounded-lg  bg-cover bg-center "
            // style={{backgroundImage: `url(${weather_bg}`}}
        >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navbar/>}>
                        <Route index element={<Weather/>}/>
                        <Route path="weather" element={<Weather/>}/>
                        <Route path="map" element={<Map/>}/>
                        <Route path="about" element={<About/>}/>
                        <Route path="/:lat/:lon" element={<Weather/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
