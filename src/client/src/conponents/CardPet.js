import React, { useContext } from "react";
import "../style/Pets.css";
import close from "../img/close.svg";
import edit from "../img/edit.svg";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const CardPet = observer((petItem) => {
  const { user } = useContext(Context);
  const { vaccination } = useContext(Context);
  let flagUser = false;
  if (user.isAuth === true && user.privilege === 3) {
    flagUser = true;
  }
  let item = JSON.parse(JSON.stringify(petItem));
  let sex = "Женский";
  if (item.petItem.animalSex === "м") {
    sex = "Мужской";
  }
  let flag = true;
  if (item.petItem.animalVaccinationsList.length === 0) {
    flag = false;
  }
  return (
    <div className="maneger_block">
      {flagUser ? (
        <div className="but_block">
          <img
            className="closeimg"
            src={close}
            onClick={() => {
              vaccination.setModalDel(true);
              vaccination.setId(item.petItem.animalId);
            }}
          />
          <img
            className="closeimg"
            src={edit}
            onClick={() => {
              vaccination.setModal(true);
              vaccination.setItem(item.petItem);
            }}
          />
        </div>
      ) : null}
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
    </div>
  );
});
export default CardPet;
