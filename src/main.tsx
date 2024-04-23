import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import './app/i18n.ts'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
