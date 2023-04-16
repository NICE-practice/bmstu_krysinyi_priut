import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./conponents/AppRouter";
import { observer } from "mobx-react-lite";
import Footer from "./conponents/Footer";
import { Context } from ".";
import { fetchInfo } from "./http/shelterInfoApi";
import { check } from "./http/userApi";
import { Spinner } from "react-bootstrap";

const App = observer(() => {
  const [loading, setLoading] = useState(true);
  const { info } = useContext(Context);
  const { user } = useContext(Context);
  useEffect(() => {
    fetchInfo().then((data) => info.setInfoShelter(data));
    check()
      .then((data) => {
        user.setUser(data);
        user.setIsAuth(true);
        user.setPrivilege(data.dictPrivilegePrivId);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Spinner animation={"grow"} />;
  }

  console.log("app");
  console.log(user.privilege);
  console.log(user.isAuth);
  // const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      <AppRouter />
      <Footer />
    </BrowserRouter>
  );
});

export default App;
