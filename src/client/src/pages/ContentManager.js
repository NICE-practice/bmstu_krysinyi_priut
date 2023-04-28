import React, { useContext, useState, useEffect } from "react";
import AddPetModal from "../conponents/AddPetModal";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import Menu from "../conponents/Menu";
import "../style/Pets.css";
import ListPets from "../conponents/ListPets";
import { fetchPets } from "../http/petsApi";
import PetFormUpdate from "../conponents/PetFormUpdate";
import DeleteeModal from "../conponents/DeleteModal";
const ContentManager = observer(() => {
  const [modal, setModal] = useState(false);
  let [modalUp, setModalUp] = useState(false);
  let [modalDel, setModalDel] = useState(false);
  const [name, setName] = useState("");
  const { pet } = useContext(Context);
  const { vaccination } = useContext(Context);

  if (vaccination.modal === true && vaccination.item) {
    modalUp = true;
  }

  if (vaccination.modalDel === true && vaccination.id !== 0) {
    modalDel = true;
  }

  const click = () => {
    try {
      if (name !== "") {
        pet.setSelectedName(name);
      }
    } catch (e) {
      alert(e);
    }
  };
  useEffect(() => {
    fetchPets(null, null, null, pet.page, 15, pet.name).then((data) => {
      pet.setPet(data.animals);
      pet.setTotalCount(data.animalsCount);
    });
  }, [pet.page, pet.name]);
  return (
    <div className="pagemain">
      <Menu />
      <button className="buttonaddcat" onClick={() => setModal(true)}>
        Добавить
      </button>
      <AddPetModal isOpened={modal} onModalClose={() => setModal(false)} />
      <PetFormUpdate
        isOpened={modalUp}
        onModalClose={() => setModalUp(false)}
        item={vaccination.item}
      />
      <DeleteeModal
        isOpened={modalDel}
        onModalClose={() => setModalDel(false)}
        item={vaccination.id}
      />
      <div className="searchtitle"> Поиск по кличке животного:</div>
      <div className="search_name">
        <input
          type="search"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
      <div className="pageCat">
        <ListPets />
      </div>
    </div>
  );
});
export default ContentManager;
