import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; 
import './input.css'

 

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <React.StrictMode>
    <div className='max-w-[1440px] mx-auto bg-backgroundColorPrimary' >
    <App />
    </div>
  </React.StrictMode>
);

