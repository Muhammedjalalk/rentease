import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// 🔥 Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// (Optional but recommended) Bootstrap JS for components like modal, dropdown
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);