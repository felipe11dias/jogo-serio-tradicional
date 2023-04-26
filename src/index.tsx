import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import './input.css';
import { Providers } from './redux/provider';
import { persistor } from './redux/store';

 

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <React.StrictMode>
    <div className='max-w-[1440px] mx-auto bg-slate-200' >
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Providers>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Providers>
    </div>
  </React.StrictMode>
);

