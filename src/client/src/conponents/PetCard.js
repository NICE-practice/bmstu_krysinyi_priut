import React from "react";
import "../style/Home.css";

export default function PetCard(pet) {
  return (
    <div className="cat_inf">
      <img className="cat_img" src={pet.animalimg} />
      <h2 className="cat_title2">{pet.animalname}</h2>
      <button className="cat_but">Узнать больше</button>
    </div>
  );
}
