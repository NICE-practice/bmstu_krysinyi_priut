import React from "react";
import DonateForm from "../conponents/DonateForm";
import { observer } from "mobx-react-lite";

const Home = observer(() => {
  return (
    <div>
      HOME
      <DonateForm />
    </div>
  );
});
export default Home;
