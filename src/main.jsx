import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { useState } from "react";
import { initializeApp, firebaseConfig, getAuth } from "./firebase/index";
import User from "./contexts/User";

// Initializing firebase
initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <User>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </User>,
)
