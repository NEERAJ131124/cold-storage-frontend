import axios from "axios";
import React, { useEffect, useState } from "react";

// const azureMapsKey = "B4KsuUEC2SiY60gpredNw0zz8IFJvTaKgUBj2WpCAudhNRczlSIuJQQJ99ALAC8vTInNpgzmAAAgAZMP1uvz"
const azureTranslationKey = "4i3cswpfjoves8H9MJWIOaBuhBHkaYnPCuF2Tu7BaVd5XEJ58KuNJQQJ99ALACGhslBXJ3w3AAAbACOGEXBx";
const azureTranslationEndpoint = "https://api.cognitive.microsofttranslator.com";
const azureTranslationRegion = "centralindia"; // E.g., "centralindia"

const LocationFetcher = () => {
  const [locationData, setLocationData] = useState(null);
  const [error, setError] = useState(null);
  const [translatedText, setTranslatedText] = useState("");
  const [languageOptions, setLanguageOptions] = useState(["en"]);
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default to English
  const [originalText] = useState("This is an example."); // Original text to translate

  const getLocation = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `http://localhost:8888/location`,
        {
          params: { latitude, longitude },
        }
      );
      console.log("Location Data:", response);

      const address = response?.data?.addresses[0].address;

      setLocationData({
        state: address.state,
        country: address.country,
        city: address.city,
      });

      await fetchSupportedLanguages(address.countrySubdivisionName); // Fetch languages for the detected state
      setError(null);
    } catch (err) {
      setError("Error fetching location: " + err.message);
      setLocationData(null);
    }
  };

  const fetchSupportedLanguages = async (stateName) => {
    try {
      const response = await axios.get(
        `${azureTranslationEndpoint}/languages?api-version=3.0`
      );

      const languages = response.data.translation;
      console.log("Supported Languages:", languages, stateName);

      const countryLanguages = Object.keys(languages).filter(
        (lang) => languages[lang]?.name?.includes(stateName)
      );

      console.log("Country Languages:", countryLanguages);

      const availableLanguages = countryLanguages.length
        ? countryLanguages
        : ["hi"]; // Default to Hindi if no language found for the state

      setLanguageOptions([ "en",...availableLanguages]); // Ensure English is always an option
      setSelectedLanguage("en"); // Default to first available language
    } catch (err) {
      setError("Error fetching supported languages: " + err.message);
      setLanguageOptions(["en"]); // Fallback to English
    }
  };

  const translateText = async (targetLanguage) => {
    try {
      console.log("Translating Text:", originalText, "to", targetLanguage);
      const response = await axios.post(
        `${azureTranslationEndpoint}/translate?api-version=3.0`,
        [
          {
            Text: originalText,
          },
        ],
        {
          headers: {
            "Ocp-Apim-Subscription-Key": azureTranslationKey,
            "Ocp-Apim-Subscription-Region": azureTranslationRegion,
            "Content-Type": "application/json",
          },
          params: {
            to: targetLanguage,
          },
        }
      );
      console.log(response)

      const translation = response.data[0]?.translations[0]?.text;
      setTranslatedText(translation);
    } catch (err) {
      console.log(err.response)
      setError("Error translating text: " + err.message);
      setTranslatedText("");
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await getLocation(latitude, longitude);
        },
        (err) => {
          setError("Error getting location: " + err.message);
          setLocationData(null);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLocationData(null);
    }
  };

  useEffect(() => {
    if (selectedLanguage) {
      translateText(selectedLanguage);
    }
  }, [selectedLanguage]);

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-semibold mb-4">Dynamic Language Translation</h1>

      {error && <p className="text-red-500">{error}</p>}

      {locationData && (
        <div className="mt-5 space-y-2">
          <h3 className="text-xl font-medium">State: {locationData.state}</h3>
          <h3 className="text-xl font-medium">Country: {locationData.country}</h3>
          <h3 className="text-xl font-medium">City: {locationData.city}</h3>
        </div>
      )}

      {/* Language Dropdown */}
      <div className="mt-5 w-32 absolute top-5 right-5">
        <label htmlFor="language-select" className="block text-lg font-medium">Choose a Language: </label>
        <select
          id="language-select"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {languageOptions.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <h2 className="text-xl font-semibold">Translated Text:</h2>
        <p className="text-lg">{translatedText || originalText}</p>
      </div>
    </div>
  );
};

export default LocationFetcher;