import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:5000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  // To fetch all cities from the API and set the state when the component mounts
  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);

        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        setCities(data);
        // console.log(data);
      } catch {
        alert("There was an error fetching data...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  // To get a specific city from the API and update the state
  async function getCity(id) {
    try {
      setIsLoading(true);

      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await response.json();
      setCurrentCity(data);
    } catch {
      alert("There was an error fetching data...");
    } finally {
      setIsLoading(false);
    }
  }

  // To add a new city to the API and update the state
  async function createCity(newCity) {
    try {
      setIsLoading(true);

      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setCities((cities) => [...cities, data]);
    } catch {
      alert("There was an error creating the city...");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);

      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch {
      alert("There was an error deleting the city...");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");

  return context;
}

export { CitiesProvider, useCities };
