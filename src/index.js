import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TestModeContextProvider } from './Context/TestMode';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TestModeContextProvider>
      <App />
    </TestModeContextProvider> 
  </React.StrictMode>
);

