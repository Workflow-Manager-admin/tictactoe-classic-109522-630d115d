import React from 'react';
import ReactDOM from 'react-dom/client';
// Import global and base style files to ensure styles are properly loaded
import './index.css';
import './styles/global.css';
import App from './App';

// Ensure the root element exists for React to render
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  // PUBLIC_INTERFACE
  // If the root element does not exist, log a fatal error.
  console.error('Root element not found. Please ensure index.html contains a div with id="root".');
}
