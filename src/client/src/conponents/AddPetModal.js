import React, { useContext, useState } from "react";
import { createPet } from "../http/petsApi";
import dog from "../img/dog.jpg";
import close from "../img/close.svg";
import "../style/Contact.css";
import "../style/Pets.css";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import AddVaccinationModal from "./AddVaccinationModal";
import { toJS } from "mobx";

const AddPetModal = observer((props) => {
  const { vaccination } = useContext(Context);
  const [sex, setSex] = useState("");
  const [typePet, setTypePet] = useState("");
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState(0);
  const [history, setHistory] = useState("");
  const [image, setImage] = useState("");
  const [modalVac, setModalVac] = useState(false);
  let vacs = toJS(vaccination.addVaccination);
  console.log(vacs);
  const addPet = async () => {
    try {
      let item = await createPet(
        "cat",
        name,
        "m",
        age,
        history,
        breed,
        image,
        false,
        vacs
      );
      console.log(item);
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  return (
    <div className={`modal_wrapper ${props.isOpened ? "open" : "close"}`}>
      <div className="modal_content">
        <div className="modal_close" onClick={props.onModalClose}>
          <img className="closeimg" src={close} />
        </div>
        <AddVaccinationModal
          isOpened={modalVac}
          onModalClose={() => setModalVac(false)}
        />
        <div className="modal_body">
          <div className="vaccination_part">
            <div className="vaccination_row">
              <p className="name_item_vac">Прививки</p>
              <button className="but_plus" onClick={() => setModalVac(true)}>
                +
              </button>
            </div>
            <div className="addimg">
              <img className="addimg" src={dog} />
            </div>
          </div>
          <div className="info_part">
            <form className="guruweba_example_form2" name="feedback">
              <div className="modal_line">
                <div>
                  <div className="name_item">Тип</div>
                  <input
                    className="form_text_short"
                    type="text"
                    name="name"
                    required="required"
                    value={typePet}
                    onChange={(e) => setTypePet(e.target.value)}
                  />
                </div>
                <div>
                  <div className="name_item">Пол</div>
                  <input
                    className="form_text_short"
                    type="text"
                    name="name"
                    required="required"
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                  />
                </div>
              </div>
              <div className="name_item">Имя</div>
              <input
                className="form_text"
                type="text"
                name="name"
                required="required"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="name_item">Порода</div>
              <input
                className="form_text"
                type="text"
                name="telephone"
                required="required"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
              />
              <div className="name_item">Возраст</div>
              <input
                className="form_text"
                type="text"
                name="email"
                required="required"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <div className="name_item">Фото(вставьте ссылку на фото)</div>
              <input
                className="form_text"
                type="text"
                name="email"
                required="required"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <div className="name_item">История </div>
              <textarea
                className="message_text"
                name="message"
                value={history}
                onChange={(e) => setHistory(e.target.value)}
              ></textarea>
              <button onClick={addPet} className="form_but" type="submit">
                Сохранить
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AddPetModal;
