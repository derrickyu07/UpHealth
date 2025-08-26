import React from 'react';
import ReactDOM from 'react-dom/client';
import AppProvider from './app/provider';
import App from './app/app';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
