import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import ShelterInfoStore from "./store/ShelterInfoStore";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      info: new ShelterInfoStore(),
    }}
  >
    <App />
  </Context.Provider>
);
