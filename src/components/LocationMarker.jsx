import { Popup, useMapEvents } from "react-leaflet";


const LocationMarker = ({
    location,
    setLocation,
    clickedLocation,
    setClickedLocation,
    weatherData,
    isLoading,
    isDark,
  }) => {
    const map = useMapEvents({
      click(e) {
        const newLocation = { lat: e.latlng.lat, lng: e.latlng.lng };
        setClickedLocation(newLocation);
        setLocation(newLocation);
      },
    });
  
    useEffect(() => {
      if (location.lat && location.lng) {
        map.setView([location.lat, location.lng], 10);
      }
    }, [location, map]);
  
    if (!clickedLocation) return null;
  
    return (
      <Popup
        closeButton={false}
        position={[clickedLocation.lat, clickedLocation.lng]}
        onClose={() => setClickedLocation(null)}
        className={isDark ? 'popup-dark' : 'popup-light'}
      >
        <div className={`w-48 ${isDark ? 'bg-dark-surface' : 'bg-light-surface'} rounded-lg overflow-hidden shadow-xl transition-all duration-300`}>
          <WeatherPopup
            isDark={isDark}
            isLoading={isLoading}
            weatherData={weatherData}
            location={location}
            clickedLocation={clickedLocation}
            setLocation={setLocation}
          />
        </div>
      </Popup>
    );
  };