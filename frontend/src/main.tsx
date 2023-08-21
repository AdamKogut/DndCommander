import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ModalContextProvider } from './Context/ModalContext';
import { Persistor, Store } from './Store';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <div className='fixed inset-0 h-full w-full'>
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistor}>
        <Router>
          <ModalContextProvider>
            <App />
          </ModalContextProvider>
        </Router>
      </PersistGate>
    </Provider>
  </div>,
)
