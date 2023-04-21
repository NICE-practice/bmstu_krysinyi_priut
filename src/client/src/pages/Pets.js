import React, { useContext, useEffect } from "react";
import Menu from "../conponents/Menu";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchPets } from "../http/petsApi";

const Cats = observer(() => {
  const { pet } = useContext(Context);

  useEffect(() => {
    if (pet.age !== 0) {
      fetchPets(pet.breed, pet.type, pet.age, pet.page, 15).then((data) => {
        console.log(data);
        pet.setPet(data.animals);
        pet.setTotalCount(data.animalsCount);
      });
    } else {
      fetchPets(pet.breed, pet.type, null, pet.page, 15).then((data) => {
        console.log(data);
        pet.setPet(data.animals);
        pet.setTotalCount(data.animalsCount);
      });
    }
  }, [pet.breed, pet.type, pet.age, pet.page]);

  return (
    <div>
      <Menu />
      Pets
    </div>
  );
});
export default Cats;
