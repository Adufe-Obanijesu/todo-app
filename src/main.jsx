import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { useState } from "react";
import { initializeApp, firebaseConfig } from "./firebase/index";

// Initializing firebase
initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
