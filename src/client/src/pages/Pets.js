import React from "react";
import Menu from "../conponents/Menu";
import FindBlock from "../conponents/FindBlock";
import ListPets from "../conponents/ListPets";
import { observer } from "mobx-react-lite";

const Cats = observer(() => {
  return (
    <div className="pagemain">
      <Menu />
      <FindBlock />
      <div className="pageCat">
        <ListPets />
      </div>
    </div>
  );
});
export default Cats;
