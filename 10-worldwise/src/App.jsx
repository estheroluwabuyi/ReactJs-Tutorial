import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

const BASE_URL = "http://localhost:5000";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      // setIsLoading(true);
      try {
        setIsLoading(true);

        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        setCities(data);
        // console.log(data);
      } catch {
        console.error("There was an error fetching data...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <div>
      {/* <h1>Hello Router!</h1> 
      this page will show irrespective of the currently displayed component
      */}

      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route index element={<HomePage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />

          <Route path="app" element={<AppLayout />}>
            <Route
              index
              element={<CityList cities={cities} isLoading={isLoading} />}
            />
            {/* This will be the default route */}
            <Route
              path="cities"
              element={<CityList cities={cities} isLoading={isLoading} />}
            />

            {/* dynamic rotes with url params */}
            <Route path="cities/:id" element={<City />} />

            <Route
              path="countries"
              element={<CountryList cities={cities} isLoading={isLoading} />}
            />
            <Route path="form" element={<Form />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
          {/* this will catch all the paths that were not matched to one of the 3 */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
