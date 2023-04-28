import React, { useContext } from "react";
import "../style/Home.css";
import "../style/Pets.css";
import close from "../img/close.svg";
import { deletePet } from "../http/petsApi";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const DeleteeModal = observer((props) => {
  const { pet } = useContext(Context);
  const { vaccination } = useContext(Context);
  const delPet = async () => {
    vaccination.setModalDel(false);
    try {
      let item1 = await deletePet(props.item);
      pet.setPet(pet.pets.filter((p) => p.animalId !== props.item));
      console.log(item1);
    } catch (e) {
      alert(e);
    }
  };
  const click = () => {
    vaccination.setModalDel(false);
    vaccination.setId(0);
  };

  return (
    <div className={`modal_wrapper ${props.isOpened ? "open" : "close"}`}>
      <div className="deletemodal">
        <div className="modal_close_del" onClick={click}>
          <img className="closeimg" src={close} />
        </div>
        <div>
          <p className="donatemodaltext">
            Вы точно хотите удалить карточку животного?
          </p>
        </div>
        <div className="buts_modal">
          <button onClick={delPet} className="form_but" type="submit">
            Да
          </button>
          <button onClick={click} className="form_but" type="submit">
            Нет
          </button>
        </div>
      </div>
    </div>
  );
});
export default DeleteeModal;
