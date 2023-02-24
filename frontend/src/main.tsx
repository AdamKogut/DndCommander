import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ModalContextProvider } from './context/ModalContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <ModalContextProvider>
        <App />
      </ModalContextProvider>
    </Router>
  </React.StrictMode>,
)
