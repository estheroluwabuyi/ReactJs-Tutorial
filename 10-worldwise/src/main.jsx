import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
//unlike in create-react-app, vite uses main.jsx instead of index.jsx
