import React from 'react';
import ReactDOM from 'react-dom/client';  // Use the 'react-dom/client' module in React 18
import { AuthProvider } from './context/AuthContext.jsx';
import './index.css';
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root')); // Initialize with createRoot

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
