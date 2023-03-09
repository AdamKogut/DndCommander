import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ModalContextProvider } from './context/ModalContext';
import { persistor, store } from './store';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <ModalContextProvider>
          <App />
        </ModalContextProvider>
      </Router>
    </PersistGate>
  </Provider>,
)
