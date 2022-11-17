import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { TestModeContextProvider } from './Context/TestMode';
import { ThemeContextProvider } from './Context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <TestModeContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </TestModeContextProvider> 
    </ThemeContextProvider> 
  </React.StrictMode>
);

