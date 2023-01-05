import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./css/index.css";
import "./css/panel.css";
import "./css/colors.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
