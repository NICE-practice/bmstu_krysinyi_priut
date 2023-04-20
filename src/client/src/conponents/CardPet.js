import React from "react";
import "../style/Pets.css";

export default function CardPet(petItem) {
  let item = JSON.parse(JSON.stringify(petItem));
  let sex = "Женский";
  if (item.petItem.animalSex === "м") {
    sex = "Мужской";
  }
  let flag = true;
  if (item.petItem.animalVaccinationsList.length === 0) {
    flag = false;
  }
  console.log("cardpet");
  console.log(item);
  return (
    <div className="catCard">
      <div className="imgcat">
        <img className="imgcat" src={item.petItem.animalImg} />
      </div>
      <div className="contentcat">
        <p className="namecat">{item.petItem.animalName}</p>
        <p className="breedcat">{item.petItem.animalBreed}</p>
        {flag ? (
          <select name="pets" id="pet-select">
            {item.petItem.animalVaccinationsList &&
              item.petItem.animalVaccinationsList.map((vac) => (
                <option key={vac.vaccinationName} value="">
                  {vac.vaccinationName}
                </option>
              ))}
          </select>
        ) : (
          <p className="vacempty">Прививок нет</p>
        )}

        <ul>
          <li>
            <span>{sex}</span>
          </li>
          <li>
            <span>Возраст: {item.petItem.animalAge}</span>
          </li>
        </ul>
        <p className="storyCat">{item.petItem.animalHistory}</p>
      </div>
    </div>
  );
}
