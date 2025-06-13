import React from 'react';
import ReactDOM from 'react-dom/client';
// Import global and base style files to ensure styles are properly loaded
import './index.css';
import './styles/global.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
