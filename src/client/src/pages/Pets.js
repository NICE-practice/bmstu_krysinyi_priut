import React from "react";
import Menu from "../conponents/Menu";
import FindBlock from "../conponents/FindBlock";
import ListPets from "../conponents/ListPets";
import { observer } from "mobx-react-lite";
import "../style/Pets.css";

const Cats = observer(() => {
  return (
    <div className="pagemain">
      <Menu />
      <div className="pet_block">
        <FindBlock />
        <div className="pageCat">
          <ListPets />
        </div>
      </div>
    </div>
  );
});
export default Cats;
