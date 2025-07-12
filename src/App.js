import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Navigate, useLocation } from "react-router-dom";
import { Route } from "react-router-dom";
import Weather from "./pages/Weather";
import About from "./pages/About";
import Map from "./pages/WeatherMap";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useEffect } from "react";

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-300 ease-in-out bg-light-background dark:bg-dark-background">
        <div
          className="mx-auto w-full lg:max-w-6xl shadow-xl shadow-gray-400/20 dark:shadow-black/20 rounded-lg bg-cover bg-center transition-all duration-300 ease-in-out"
        >
          <BrowserRouter>
            <ScrollToTop />
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
            <ScrollToTopButton />
          </BrowserRouter>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;