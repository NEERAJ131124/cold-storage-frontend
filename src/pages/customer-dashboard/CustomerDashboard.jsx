import React, { useEffect, useState } from "react";
import * as atlas from "azure-maps-control";
import * as atlasService from "azure-maps-rest";

const azureMapsKey =
  "B4KsuUEC2SiY60gpredNw0zz8IFJvTaKgUBj2WpCAudhNRczlSIuJQQJ99ALAC8vTInNpgzmAAAgAZMP1uvz";


const azureMapsClientId = "1e93421d-c61f-4478-acb8-2874a4916fb6";
const tokenServiceUrl = "https://samples.azuremaps.com/api/GetAzureMapsToken";
const minSearchInputLength = 3;
const keyStrokeDelay = 150;

const CustomerDashboard = () => {
  const [map, setMap] = useState(null);
  const [datasource, setDatasource] = useState(null);
  const [popup, setPopup] = useState(null);
  const [searchInputLength, setSearchInputLength] = useState(0);
  const [results, setResults] = useState([]);
  const [centerMapOnResults, setCenterMapOnResults] = useState(false);

  useEffect(() => {
    const initializeMap = async () => {
      const getToken = async () => {
        const response = await fetch(tokenServiceUrl);
        if (response.ok) {
          return response.text();
        }
        throw new Error("Failed to retrieve Azure Maps token.");
      };

      const token = await getToken();

      const mapInstance = new atlas.Map("myMap", {
        center: [-118.270293, 34.039737],
        zoom: 14,
        view: "Auto",
        authOptions: {
          authType: "anonymous",
          clientId: azureMapsClientId,
          token: token,
        },
      });

      const datasourceInstance = new atlas.source.DataSource();
      mapInstance.sources.add(datasourceInstance);

      const popupInstance = new atlas.Popup();

      mapInstance.events.add("ready", () => {
        mapInstance.controls.add(new atlas.control.ZoomControl(), {
          position: "top-right",
        });

        const searchLayer = new atlas.layer.SymbolLayer(datasourceInstance, null, {
          iconOptions: {
            image: "pin-round-darkblue",
            anchor: "center",
            allowOverlap: true,
          },
        });
        mapInstance.layers.add(searchLayer);

        mapInstance.events.add("click", searchLayer, (e) => {
          if (e.shapes && e.shapes.length > 0) {
            showPopup(e.shapes[0]);
          }
        });
      });

      setMap(mapInstance);
      setDatasource(datasourceInstance);
      setPopup(popupInstance);
    };

    initializeMap();
  }, []);

  const handleSearchInput = (e) => {
    const input = e.target.value;
    setCenterMapOnResults(e.keyCode === 13);

    if (input.length >= minSearchInputLength) {
      setTimeout(() => {
        if (input.length === searchInputLength) {
          search(input);
        }
      }, keyStrokeDelay);
    } else {
      setResults([]);
    }
    setSearchInputLength(input.length);
  };

  const search = async (query) => {
    datasource.clear();
    popup.close();
    setResults([]);

    const pipeline = atlasService.MapsURL.newPipeline(
      new atlasService.MapControlCredential(map)
    );
    const searchURL = new atlasService.SearchURL(pipeline);

    const results = await searchURL.searchPOI(atlasService.Aborter.timeout(10000), query, {
      lon: map.getCamera().center[0],
      lat: map.getCamera().center[1],
      maxFuzzyLevel: 4,
      view: "Auto",
    });

    const data = results.geojson.getFeatures();
    datasource.add(data);

    if (centerMapOnResults) {
      map.setCamera({ bounds: data.bbox });
    }
    setResults(data.features);
  };

  const showPopup = (shape) => {
    const properties = shape.getProperties();
    const content = `
      <div style="max-width: 200px;">
        <div style="background-color: #153C64; color: #fff; padding: 8px; font-weight: bold; border-radius: 4px;">
          ${properties.poi?.name || properties.address.freeformAddress}
        </div>
        <div style="padding: 8px;">
          <div>${properties.address.freeformAddress}</div>
          ${properties.poi?.phone ? `<div>${properties.poi.phone}</div>` : ""}
          ${properties.poi?.url ? `<div><a href="http://${properties.poi.url}" target="_blank">Visit</a></div>` : ""}
        </div>
      </div>`;
    popup.setOptions({
      position: shape.getCoordinates(),
      content: content,
    });
    popup.open(map);
  };

  const itemHovered = (id) => {
    const shape = datasource.getShapeById(id);
    showPopup(shape);
  };

  const itemClicked = (id) => {
    const shape = datasource.getShapeById(id);
    map.setCamera({
      center: shape.getCoordinates(),
      zoom: 17,
    });
  };


  return (
    <div className="relative w-full h-screen">
      <div
        id="myMap"
        className="absolute w-full h-full"
      ></div>
      <div
        id="search"
        className="absolute top-0 left-0 w-96 bg-white shadow-lg border border-gray-200 overflow-hidden"
      >
        <div className="flex items-center p-4 border-b">
          <input
            id="search-input"
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none"
            placeholder="Search"
            onKeyUp={handleSearchInput}
          />
        </div>
        <ul
          id="results-panel"
          className="overflow-y-auto max-h-[calc(100vh-120px)] text-sm"
        >
          {results.map((result) => (
            <li
              key={result.id}
              onClick={() => itemClicked(result.id)}
              onMouseOver={() => itemHovered(result.id)}
              className="p-2 border-t hover:bg-gray-100 cursor-pointer"
            >
              <div className="font-bold">{result.properties.poi?.name || result.properties.address.freeformAddress}</div>
              <div className="text-gray-500">{result.properties.address.freeformAddress}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomerDashboard;
