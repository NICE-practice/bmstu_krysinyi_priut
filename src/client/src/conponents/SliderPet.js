import { toJS } from "mobx";
import React, { useContext, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import PetCard from "./PetCard";
import "../style/Home.css";

const SliderPet = observer(() => {
  const { pet } = useContext(Context);
  const [prev, setPrev] = useState(false);
  const [next, setNext] = useState(false);
  const slider = useRef(null);
  let pets = toJS(pet.pets);
  console.log(pets);
  let position = 0;

  const prevHandler = () => {
    console.log("prev");
    console.log(position);
    if (position === 2 * 400 + 400) {
      setPrev(true);
      setNext(false);
    } else {
      setPrev(false);
      position += 400;
      slider.current.childNodes.forEach((element) => {
        element.style = `transform: translateX(${position}px)`;
      });
    }
  };
  const nextHandler = () => {
    console.log("next");
    console.log(position);
    if (position === -4 * 400 + 400) {
      setNext(true);
      setPrev(false);
    } else {
      setNext(false);
      position += -400;
      slider.current.childNodes.forEach((element) => {
        if (element !== pets[7]) {
          element.style = `transform: translateX(${position}px)`;
        }
      });
    }
  };
  const onclick = () => {
    window.location.assign("http://localhost:3000/pets");
  };
  return (
    <div id="cats" className="cats">
      <h1 className="cat_title">Наши пушистики, которые ищут дом</h1>
      <div className="slider_content">
        <div className="arrow_cats" disabled={prev} onClick={prevHandler}>
          &larr;
        </div>
        <div className="cat_block" ref={slider}>
          <PetCard pet={pets[0]} />
          <PetCard pet={pets[1]} />
          <PetCard pet={pets[2]} />
          <PetCard pet={pets[3]} />
          <PetCard pet={pets[4]} />
          <PetCard pet={pets[5]} />
          <PetCard pet={pets[6]} />
          <PetCard pet={pets[7]} />
          <PetCard pet={pets[8]} />
        </div>
        <div className="arrow_cats" disabled={next} onClick={nextHandler}>
          &rarr;
        </div>
      </div>

      <button className="cats_but" onClick={onclick}>
        Наши животные
      </button>
    </div>
  );
});
export default SliderPet;
