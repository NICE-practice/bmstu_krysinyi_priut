import React from 'react';
import "../style/Home.css";

export default function PetCard(pet) {
  return (
    <div class="cat_inf">
        <img class="cat_img" src={pet.animalimg}/>
        <h2 class="cat_title2">{pet.animalname}</h2>
        <button class="cat_but">Узнать больше</button>
    </div>
  )
}
