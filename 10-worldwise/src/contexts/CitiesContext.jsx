import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "http://localhost:5000";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        //the id is what we will pass into the action.payload
      };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  /*const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({}); */

  // To fetch all cities from the API and set the state when the component mounts
  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        // setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        // setCities(data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error fetching the cities...",
        });
      }
      // finally {
      //   setIsLoading(false);
      // }
    }

    fetchCities();
  }, []);

  // To get a specific city from the API and update the state
  async function getCity(id) {
    if (Number(id) === currentCity.id) return;

    dispatch({ type: "loading" });
    try {
      // setIsLoading(true);

      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await response.json();
      // setCurrentCity(data);
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error fetching the city...",
      });
    }
    // finally {
    //   setIsLoading(false);
    // }
  }

  // To add a new city to the API and update the state
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      // setIsLoading(true);

      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      // setCities((cities) => [...cities, data]);
      dispatch({ type: "city/created", payload: data });
    } catch {
      alert("There was an error creating the city...");
    }
    // finally {
    //   setIsLoading(false);
    // }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      // setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
      // setCities((cities) => cities.filter((city) => city.i !== id));
    } catch {
      alert("There was an error deleting the city...");
    }
    // finally {
    //   setIsLoading(false);
    // }
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
