import React, { useState, useEffect, useRef } from 'react';
import * as atlas from 'azure-maps-control';

const subscriptionKey = 'B4KsuUEC2SiY60gpredNw0zz8IFJvTaKgUBj2WpCAudhNRczlSIuJQQJ99ALAC8vTInNpgzmAAAgAZMP1uvz';  // Replace with your Azure Maps subscription key

const MapPage = () => {
    const [pinCode, setPinCode] = useState('');
    const [coordinates, setCoordinates] = useState(null);
    const [error, setError] = useState(null);
    const [map, setMap] = useState(null);
  
    // Predefined major cities of India with coordinates
    const majorCities = [
      { name: 'Delhi', coordinates: [77.2090, 28.6139] },
      { name: 'Mumbai', coordinates: [72.8777, 19.0760] },
      { name: 'Kolkata', coordinates: [88.3639, 22.5726] },
      { name: 'Chennai', coordinates: [80.2707, 13.0827] },
    ];
  
    // Initialize the Azure map and add markers for major cities
    useEffect(() => {
      const mapInstance = new atlas.Map('map', {
        center: [78.9629, 20.5937], // Centered on India
        zoom: 5,
        authOptions: {
          authType: 'subscriptionKey',
          subscriptionKey: subscriptionKey,
        },
      });
  
      mapInstance.events.add('ready', () => {
        // Add red markers for major cities
        majorCities.forEach((city) => {
          const marker = new atlas.HtmlMarker({
            position: city.coordinates,
            color: 'red',
          });
          mapInstance.markers.add(marker);
        });
      });
  
      setMap(mapInstance);
    }, []);
  
    // Function to handle pin code search
    const searchPinCode = async () => {
      if (!pinCode) {
        setError('Please enter a pin code');
        return;
      }
  
      try {
        // Call Azure Maps Search API to get coordinates for the entered pin code
        const response = await fetch(
            `https://atlas.microsoft.com/search/address/json?api-version=1.0&query=${pinCode}+India&subscription-key=${subscriptionKey}`
        );
        const data = await response.json();
  
        if (data.results.length === 0) {
          setError('No location found for this pin code');
          return;
        }
  
        // Get the first result and set the coordinates
        const location = data.results[0].position;
        setCoordinates({
          lat: location.lat,
          lon: location.lon,
        });
  
        // Set the map center to the location of the pin code
        map.setCamera({
          center: [location.lon, location.lat],
          zoom: 14,
        });
  
        // Add a marker on the map at the pin code location
        const marker = new atlas.HtmlMarker({
          position: [location.lon, location.lat],
          color: 'blue',
        });
        map.markers.add(marker);
  
        setError(null); // Clear any previous error
      } catch (err) {
        setError('Error fetching location data');
        console.error(err);
      }
    };
  
    return (
      <div>
        <div>
          <input
            type="text"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            placeholder="Enter Pin Code"
          />
          <button onClick={searchPinCode}>Search</button>
        </div>
  
        {error && <p style={{ color: 'red' }}>{error}</p>}
  
        <div id="map" style={{ width: '100%', height: '500px' }}></div>
  
        {coordinates && (
          <p>
            Coordinates: {coordinates.lat}, {coordinates.lon}
          </p>
        )}
      </div>
    );
  };
  
  export default MapPage;