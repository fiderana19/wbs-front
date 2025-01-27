import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
        <App />
    </Router>
  </React.StrictMode>,
);
