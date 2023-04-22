import React from "react";
import "../style/Home.css";

export default function PetCard(pet) {
  return (
    <div className="cat_inf">
      <img className="cat_img" src={pet.pet.animalImg} />
      <h2 className="cat_title2">{pet.pet.animalName}</h2>
      <button className="cat_but">Узнать больше</button>
    </div>
  );
}
