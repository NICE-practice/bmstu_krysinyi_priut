import React, { useState } from "react";
import "../style/Home.css";
import catset from "../img/catset.jpg";
import catgame from "../img/catgame.jpg";
import cateat from "../img/cateat.jpg";
import cathappy from "../img/cathappy.jpg";
export default function PetGame() {
  const actions = [
    { id: "eat", cat: cateat },
    { id: "game", cat: catgame },
    { id: "care", cat: cathappy },
  ];
  const [imgcat, setImg] = useState(catset);
  const [currentAct, setCurrentAct] = useState("");
  const [countEat, setCountEat] = useState(0);
  const [countGame, setCountGame] = useState(0);
  const [countCare, setCountCare] = useState(0);
  //   const [flagEat, setFlagEat] = useState(false);
  //   const [flagGame, setFlagGame] = useState(false);
  //   const [flagCare, setFlagCare] = useState(false);
  function dragStartHandler(e, img) {
    setCurrentAct(img);
    console.log("drag", img);
  }
  // eslint-disable-next-line no-unused-vars
  function dragLeaveHandler(e) {
    console.log("leave");
  }
  // eslint-disable-next-line no-unused-vars
  function dragEndHandler(e) {
    console.log("end");
  }
  function dragOverHandler(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log("over");
  }
  function dropHandler(e) {
    e.preventDefault();
    let num = Math.floor(Math.random() * (5 - 1) + 1);
    console.log(currentAct, cateat);
    if (currentAct === cateat) {
      if (countEat === 0) {
        setCountEat(num);
        // setFlagEat(true);
      } else {
        setCountEat(5);
        // setFlagEat(true);
      }
    }
    if (currentAct === catgame) {
      if (countGame === 0) {
        setCountGame(num);
        // setFlagGame(true);
      } else {
        setCountGame(5);
        // setFlagGame(true);
      }
    }
    if (currentAct === cathappy) {
      if (countCare === 0) {
        setCountCare(num);
        // setFlagCare(true);
      } else {
        setCountCare(5);
        // setFlagCare(true);
      }
    }
    console.log("drop", currentAct);
    console.log(num);
    console.log(countEat);
    setImg(currentAct);
  }
  return (
    <div className="happycat">
      <h1 className="title_happycat">Осчастливить котика</h1>
      <div className="cathappy_block">
        <div className="cat_action">
          <img
            draggable={false}
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e)}
            className="img_cathappy"
            src={imgcat}
          />

          <div className="properties">
            <div className="property">
              <p className="name_property">Голод</p>
              {countEat === 0 && (
                <div className="property">
                  <p className="level"></p>
                  <p className="level"></p>
                  <p className="level"></p>
                  <p className="level"></p>
                  <p className="level"></p>
                </div>
              )}
              {countEat === 1 && (
                <div className="property">
                  <p className="level2"></p>
                  <p className="level"></p>
                  <p className="level"></p>
                  <p className="level"></p>
                  <p className="level"></p>
                </div>
              )}
              {countEat === 2 && (
                <div className="property">
                  <p className="level2"></p>
                  <p className="level2"></p>
                  <p className="level"></p>
                  <p className="level"></p>
                  <p className="level"></p>
                </div>
              )}
              {countEat === 3 && (
                <div className="property">
                  <p className="level2"></p>
                  <p className="level2"></p>
                  <p className="level2"></p>
                  <p className="level"></p>
                  <p className="level"></p>
                </div>
              )}
              {countEat === 4 && (
                <div className="property">
                  <p className="level2"></p>
                  <p className="level2"></p>
                  <p className="level2"></p>
                  <p className="level2"></p>
                  <p className="level"></p>
                </div>
              )}
              {countEat === 5 && (
                <div className="property">
                  <p className="level2"></p>
                  <p className="level2"></p>
                  <p className="level2"></p>
                  <p className="level2"></p>
                  <p className="level2"></p>
                </div>
              )}
            </div>
            <div className="property">
              <p className="name_property">Счастье</p>
              {countCare === 0 && (
                <div className="property">
                  <p className="level"></p>
                  <p className="level"></p>
                  <p className="level"></p>
                  <p className="level"></p>
                  <p className="level"></p>
                </div>
              )}
              {countCare === 1 && (
                <div className="property">
                  <p className="level2"></p>
                  <p className="level"></p>
                  <p className="level"></p>
                  <p className="level"></p>
                  <p className="level"></p>
                </div>
              )}
              {countCare === 2 && (
                <div className="property">
                  <p className="level2"></p>
                  <p className="level2"></p>
                  <p className="level"></p>
                  <p className="level"></p>
                  <p className="level"></p>
                </div>
              )}
              {countCare === 3 && (
                <div className="property">
                  <p className="level2"></p>
                  <p className="level2"></p>
                  <p className="level2"></p>
                  <p className="level"></p>
                  <p className="level"></p>
                </div>
              )}
              {countCare === 4 && (
                <div className="property">
                  <p className="level2"></p>
                  <p className="level2"></p>
                  <p className="level2"></p>
                  <p className="level2"></p>
                  <p className="level"></p>
                </div>
              )}
              {countCare === 5 && (
                <div className="property">
                  <p className="level2"></p>
                  <p className="level2"></p>
                  <p className="level2"></p>
                  <p className="level2"></p>
                  <p className="level2"></p>
                </div>
              )}
            </div>
            <div className="property">
              <p className="name_property">Игривость</p>
              {countGame === 0 && (
                <div className="property">
                  <p className="level"></p>
                  <p className="level"></p>
                  <p className="level"></p>
                  <p className="level"></p>
                  <p className="level"></p>
                </div>
              )}
              {countGame === 1 && (
                <div className="property">
                  <p className="level2"></p>
                  <p className="level"></p>
                  <p className="level"></p>
                  <p className="level"></p>
                  <p className="level"></p>
                </div>
              )}
              {countGame === 2 && (
                <div className="property">
                  <p className="level2"></p>
                  <p className="level2"></p>
                  <p className="level"></p>
                  <p className="level"></p>
                  <p className="level"></p>
                </div>
              )}
              {countGame === 3 && (
                <div className="property">
                  <p className="level2"></p>
                  <p className="level2"></p>
                  <p className="level2"></p>
                  <p className="level"></p>
                  <p className="level"></p>
                </div>
              )}
              {countGame === 4 && (
                <div className="property">
                  <p className="level2"></p>
                  <p className="level2"></p>
                  <p className="level2"></p>
                  <p className="level2"></p>
                  <p className="level"></p>
                </div>
              )}
              {countGame === 5 && (
                <div className="property">
                  <p className="level2"></p>
                  <p className="level2"></p>
                  <p className="level2"></p>
                  <p className="level2"></p>
                  <p className="level2"></p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="actions">
          {actions.map((act) => (
            <div
              draggable={true}
              onDragStart={(e) => dragStartHandler(e, act.cat)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDragOver={(e) => dragOverHandler(e)}
              id={act.id}
              type="submit"
              key={act.id}
            >
              {" "}
            </div>
          ))}
        </div>
      </div>
      <div />
      {/* <div draggable={true} id="game" type="submit" /> */}
      {/* <div draggable={true} id="care" type="submit" /> */}
    </div>
  );
}
