import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import "../style/Pets.css";

const FindBlock = observer(() => {
  const { pet } = useContext(Context);
  const [breed, setBreed] = useState("");
  const [type1, setType1] = useState(false);
  const [type2, setType2] = useState("");
  const [age, setAge] = useState(0);
  const click = () => {
    try {
      if (breed !== "") {
        pet.setSelectedBreed(breed);
      }
    } catch (e) {
      alert(e);
    }
  };

  if (age > 0) {
    pet.setSelectedAge(age);
  }
  const chengeCheckbox1 = () => {
    setType1(!type1);
  };
  const chengeCheckbox2 = () => {
    setType2(!type2);
  };
  if (type1) {
    pet.setSelectedType("cat");
  } else if (type2) {
    pet.setSelectedType("dog");
  }
  return (
    <div className="filterblock">
      <div className="filtercontent">
        <p className="filtertext">Вид</p>
        <div>
          <div className="checkbox">
            <input
              className="custom-checkbox"
              type="checkbox"
              id="color-1"
              name="color-1"
              checked={type1}
              onChange={chengeCheckbox1}
            />
            <label htmlFor="color-1">Кот</label>
          </div>

          <div className="checkbox">
            <input
              className="custom-checkbox"
              type="checkbox"
              id="color-2"
              name="color-2"
              checked={type2}
              onChange={chengeCheckbox2}
            />
            <label htmlFor="color-2">Собака</label>
          </div>
        </div>

        <p className="filtertext">Порода</p>
        <div className="search">
          <input
            type="search"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
          <button onClick={click} className="iconclass">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="white"
              className="bi bi-search"
              viewBox="-1 0 20 20"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>
        <p className="filtertext">Возраст {age}</p>
        <div className="slider">
          <input
            type="range"
            min="0"
            max="40"
            value={age}
            step="1"
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
});
export default FindBlock;
