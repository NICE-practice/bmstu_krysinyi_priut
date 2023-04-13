import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';

export const Context = createContext(null)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
          <App/>
);


