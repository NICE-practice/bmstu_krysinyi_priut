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
  // let flag = false;
  // let arrPets = JSON.parse(JSON.stringify(pet.pet));
  // let arrPets = [];
  let flag = true;
  console.log;
  if (pet.totalCount !== 0) {
    flag = false;
  } else {
    let pets = toJS(pet.pets);
    console.log(pet.pets);
    console.log(pets);
  }

  /*
  if (pet.breed !== "") {
    console.log("breed");
    arrPets = petsAll.filter((element) => element.animalBreed === pet.breed);
    flag = true;
  }
  if (pet.age !== 0) {
    console.log("age");
    if (arrPets.length > 0) {
      console.log("age1");
      arrPets = arrPets.filter((element) => element.animalAge === pet.age);
    } else {
      console.log("age2");
      arrPets = pets.filter((element) => element.animalAge === pet.age);
      flag = true;
    }
  }
  if (pet.type !== "") {
    console.log("type");
    if (arrPets.length > 0) {
      arrPets = arrPets.filter((element) => element.animalType === pet.type);
    } else {
      arrPets = pets.filter((element) => element.animalType === pet.type);
      flag = true;
    }
  }
  */

  return (
    <div className="listmes">
      {flag ? (
        <h1 className="filtertext">По вашему запросу ничего не найдено</h1>
      ) : (
        pet.pets.map((item) => <CardPet key={item.animalId} petItem={item} />)
      )}
      <PagesPets />
    </div>
  );
});
export default ListPets;
