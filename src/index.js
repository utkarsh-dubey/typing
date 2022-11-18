import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AlertContextProvider } from './Context/AlertContext';
import { TestModeContextProvider } from './Context/TestMode';
import { ThemeContextProvider } from './Context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <AlertContextProvider>
        <TestModeContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </TestModeContextProvider>
      </AlertContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);

