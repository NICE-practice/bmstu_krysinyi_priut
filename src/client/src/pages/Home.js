import React from "react";
import DonateForm from "../conponents/DonateForm";
import { observer } from "mobx-react-lite";
import SliderPet from "../conponents/SliderPet";

const Home = observer(() => {
  return (
    <div>
      HOME
      <DonateForm />
      <SliderPet />
    </div>
  );
});
export default Home;
