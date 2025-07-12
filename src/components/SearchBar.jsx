import React, {useCallback, useState, useEffect, useRef} from "react";
import {Search, MapPin} from "lucide-react";
import {USERNAME} from "../Constant";
import { useTheme } from "../contexts/ThemeContext";

const SearchBar = ({ onSearchChange, setLocation }) => {
  const [searchValue, setSearchValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceTimerRef = useRef(null);
  const { isDark } = useTheme();

  // Debounced search function
  const debouncedSearch = useCallback((query) => {
    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      handleSearch(query);
    }, 400); // 300ms delay
  }, []);

  const handleKeyPress = useCallback((event) => {
    if (event.key === "Enter" && searchValue.trim()) {
      // Clear debounce timer for immediate search on Enter
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
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
      setLoading(false);
      return;
    }

    setLoading(true);
    setSuggestions([]);
    try {
      const response = await fetch(
          `https://secure.geonames.org/searchJSON?name_startsWith=${query}&maxRows=10&username=${USERNAME}`
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

    if (value.trim()) {
      setLoading(true);
      debouncedSearch(value);
    } else {
      // Clear suggestions immediately if input is empty
      setSuggestions([]);
      setLoading(false);
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    }
  }, [debouncedSearch]);

  const handleSuggestionClick = useCallback((coord) => {
    setLocation(coord);
    setShowSuggestions(false);
    setSearchValue("");
  }, [setLocation]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
      <div className="relative">
        <div className="flex items-center gap-4 px-4">
          <div className="relative flex-1">
            <div className="relative">
              <Search className="absolute z-20 left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-light-textSecondary dark:text-dark-textSecondary transition-colors duration-300"/>
              <input
                  type="text"
                  placeholder="Search for a city..."
                  value={searchValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                  className="w-full pl-12 pr-4 py-3 lg:py-4 bg-light-surface/90 dark:bg-dark-surface/90 backdrop-blur-sm rounded-xl shadow-lg border border-light-border/20 dark:border-dark-border/20 focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:border-transparent transition-all duration-300 text-light-text dark:text-dark-text placeholder-light-textSecondary dark:placeholder-dark-textSecondary"
              />

              {loading && searchValue.trim() && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    {/* Tailwind CSS spinner */}
                    <div className="w-5 h-5 border-2 border-light-primary dark:border-dark-primary border-t-transparent rounded-full animate-spin transition-colors duration-300"/>
                  </div>
              )}
            </div>
          </div>

          <button
              onClick={getCurrentLocation}
              className="p-3 lg:p-4 bg-light-primary dark:bg-dark-primary hover:bg-light-secondary dark:hover:bg-dark-secondary text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <MapPin className="size-4 lg:size-6"/>
          </button>
          {showSuggestions && searchValue && suggestions.length > 0 && (
              <div
                  className="absolute top-full left-4 right-4 mt-2 bg-light-surface/95 dark:bg-dark-surface/95 backdrop-blur-sm rounded-2xl shadow-xl border border-light-border/20 dark:border-dark-border/20 max-h-60 overflow-y-auto z-50 transition-all duration-300 animate-slide-up">
                {suggestions.map((suggestion, index) => (
                    <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion.coord)}
                        className="w-full px-6 py-4 text-left hover:bg-light-accent dark:hover:bg-dark-accent transition-colors duration-200 border-b border-light-border/20 dark:border-dark-border/20 last:border-b-0 first:rounded-t-2xl last:rounded-b-2xl"
                    >
                      <div className="font-semibold text-light-text dark:text-dark-text transition-colors duration-300">
                        {suggestion.name},{" "}
                        <span className="text-light-textSecondary dark:text-dark-textSecondary transition-colors duration-300">{suggestion.countryName}</span>
                      </div>
                      <div className="text-sm text-light-textSecondary dark:text-dark-textSecondary transition-colors duration-300">{suggestion.region}</div>
                    </button>
                ))}
              </div>
          )}
        </div>
      </div>

  );
};

export default SearchBar;