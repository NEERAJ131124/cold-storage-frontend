import React, { useEffect, useRef, useState } from "react";
import * as atlas from "azure-maps-control";
import stores from "../../data/stores";

const azureMapsKey =
  "B4KsuUEC2SiY60gpredNw0zz8IFJvTaKgUBj2WpCAudhNRczlSIuJQQJ99ALAC8vTInNpgzmAAAgAZMP1uvz";

const CustomerDashboard = () => {
  const mapRef = useRef(null);
  const markersRef = useRef([]); // To keep track of current markers
  const [searchPin, setSearchPin] = useState("");
  const [filteredStores, setFilteredStores] = useState(stores);

  useEffect(() => {
    if (!mapRef.current) {
      const map = new atlas.Map("mapContainer", {
        center: [77.209, 28.6139], // Default center: Delhi
        zoom: 5,
        view: "Auto",
        authOptions: {
          authType: atlas.AuthenticationType.subscriptionKey,
          subscriptionKey: azureMapsKey,
        },
      });

      mapRef.current = map;

      // Initialize markers for all stores
      updateMarkers(stores);
    }
  }, []);

  const updateMarkers = (storeList) => {
    if (mapRef.current) {
      // Clear existing markers
      markersRef.current.forEach((marker) =>
        mapRef.current.markers.remove(marker)
      );
      markersRef.current = [];

      // Add new markers for the filtered store list
      storeList.forEach((store) => {
        const marker = new atlas.HtmlMarker({
          position: [store.longitude, store.latitude],
          htmlContent: `<div class="pin" style="background: #0078D4; width: 10px; height: 10px; border-radius: 50%;"></div>`,
        });

        mapRef.current.markers.add(marker);
        markersRef.current.push(marker);
      });

      // Adjust the map view to fit the markers
      if (storeList.length > 0) {
        const positions = storeList.map((store) => [
          store.longitude,
          store.latitude,
        ]);
        mapRef.current.setCamera({
          bounds: atlas.data.BoundingBox.fromPositions(positions),
          padding: 20,
        });
      }
    }
  };

  const handleSearch = () => {
    const results = stores.filter((store) =>
      store.pincode.startsWith(searchPin)
    );
    setFilteredStores(results);
    updateMarkers(results); // Update markers on the map
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Customer Dashboard</h2>

        {/* Search Bar */}
        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Enter your PIN code"
            value={searchPin}
            onChange={(e) => setSearchPin(e.target.value)}
            className="border rounded-md p-2 flex-grow mr-4 focus:ring focus:ring-blue-200"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {/* Store List */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Store Name</th>
                <th className="border px-4 py-2">Address</th>
                <th className="border px-4 py-2">City</th>
                <th className="border px-4 py-2">State</th>
                <th className="border px-4 py-2">PIN Code</th>
              </tr>
            </thead>
            <tbody>
              {filteredStores.map((store) => (
                <tr key={store.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{store.name}</td>
                  <td className="border px-4 py-2">{store.address}</td>
                  <td className="border px-4 py-2">{store.city}</td>
                  <td className="border px-4 py-2">{store.state}</td>
                  <td className="border px-4 py-2">{store.pincode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Nearby Stores</h3>
        <div id="mapContainer" style={{ height: "400px", width: "100%" }}></div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
