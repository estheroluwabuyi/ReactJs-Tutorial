import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import "./store"; // this will run the store code in the top level file

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
