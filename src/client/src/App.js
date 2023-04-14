import React, { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./conponents/AppRouter";
import { observer } from "mobx-react-lite";

import Footer from "./conponents/Footer";
import { Context } from ".";
import { fetchInfo } from "./http/shelterInfoApi";

const App = observer(() => {
  const { info } = useContext(Context);
  useEffect(() => {
    fetchInfo().then((data) => info.setInfoShelter(data));
  });
  return (
    <BrowserRouter>
      <AppRouter />
      <Footer />
    </BrowserRouter>
  );
});

export default App;
