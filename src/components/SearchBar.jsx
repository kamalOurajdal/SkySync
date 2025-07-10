import React, {useCallback, useState} from "react";
import {Loader2, Search, MapPin} from "lucide-react";
import {USERNAME} from "../Constant";

const SearchBar = ({ onSearchChange, setLocation }) => {
  const [searchValue, setSearchValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleKeyPress = useCallback((event) => {
    if (event.key === "Enter" && searchValue.trim()) {
      onSearchChange(searchValue);
      setShowSuggestions(false);
    }
  }, [searchValue, onSearchChange]);

  const getCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error("Error getting location:", error);
          }
      );
    }
  }, [setLocation]);

  const handleSearch = useCallback(async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 300));
      const response = await fetch(
          `http://api.geonames.org/searchJSON?name_startsWith=${query}&maxRows=10&username=${USERNAME}`
      );
      const data = await response.json();
      const citySuggestions = data.geonames.map((city) => {
        return {
          name: city.name,
          countryName: city.countryName,
          region: city.adminName1,
          coord: { lat: city.lat, lng: city.lng },
        };
      });
      setSuggestions(citySuggestions);
    } catch (error) {
      console.error("Search error:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setSearchValue(value);
    setShowSuggestions(true);
    handleSearch(value);
  }, [handleSearch]);

  const handleSuggestionClick = useCallback((coord) => {
    setLocation(coord);
    setShowSuggestions(false);
    setSearchValue("");
  }, [setLocation]);

  return (
      <div className="relative">
        <div className="flex items-center gap-4 px-4">
          <div className="relative flex-1">
            <div className="relative">
              <Search className="absolute z-20 left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                  type="text"
                  placeholder="Search for a city..."
                  value={searchValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                  className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              {loading && (
                  <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 animate-spin text-blue-500" />
              )}
            </div>

            {showSuggestions && searchValue && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 max-h-60 overflow-y-auto z-50">
                  {suggestions.map((suggestion, index) => (
                      <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion.coord)}
                          className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 first:rounded-t-2xl last:rounded-b-2xl"
                      >
                        <div className="font-semibold text-gray-800">
                          {suggestion.name}, <span className="text-gray-500">{suggestion.countryName}</span>
                        </div>
                        <div className="text-sm text-gray-600">{suggestion.region}</div>
                      </button>
                  ))}
                </div>
            )}
          </div>

          <button
              onClick={getCurrentLocation}
              className="p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <MapPin className="w-6 h-6" />
          </button>
        </div>
      </div>
  );
};

export default SearchBar;
