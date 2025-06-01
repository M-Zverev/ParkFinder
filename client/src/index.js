import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import './index.css';
import App from './App';
import UserStore from './store/user-store';
import ParkingStore from './store/parking-store';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    user: new UserStore(),
    parking: new ParkingStore()
  }}>   
    <App />
  </Context.Provider>
);
