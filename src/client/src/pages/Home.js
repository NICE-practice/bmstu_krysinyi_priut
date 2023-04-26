import React from "react";
import DonateForm from "../conponents/DonateForm";
import { observer } from "mobx-react-lite";
import PetGame from "../conponents/PetGame";

const Home = observer(() => {
  return (
    <div>
      HOME
      <DonateForm />
      <PetGame />
    </div>
  );
});
export default Home;
