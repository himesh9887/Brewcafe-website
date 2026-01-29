import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';  // यह import जरूरी है

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);