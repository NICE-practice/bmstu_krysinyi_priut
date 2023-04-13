import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./conponents/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>  
  );
}

export default App;
