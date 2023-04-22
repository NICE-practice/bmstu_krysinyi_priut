import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import CardPet from "./CardPet";
import "../style/Pets.css";
import "../style/Message.css";
import PagesPets from "./PagesPets";
import { toJS } from "mobx";

const ListPets = observer(() => {
  const { pet } = useContext(Context);
  let pets = toJS(pet.pets);
  console.log(pet.pets);
  console.log(pets);

  return (
    <div className="listmes">
      {pet.pets.map((item) => (
        <CardPet key={item.animalId} petItem={item} />
      ))}
      <PagesPets />
    </div>
  );
});
export default ListPets;
