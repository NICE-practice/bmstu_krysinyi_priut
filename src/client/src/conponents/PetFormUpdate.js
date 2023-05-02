import React, { useState, useContext } from "react";
import "../style/Contact.css";
import "../style/Pets.css";
import { Context } from "../index";
import close from "../img/close.svg";
import { observer } from "mobx-react-lite";
// import UpdateVaccinationModal from "./UpdateVaccinationModal";
import { updatePet } from "../http/petsApi";
import DatePicker from "react-datepicker";
import { toJS } from "mobx";

const PetFormUpdate = observer((props) => {
  // const [modalVacUpdate, setModalVacUpdate] = useState(false);
  const [vacName, setVacName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [id, setId] = useState("");
  const [image, setImage] = useState("");
  const [age, setAge] = useState("");
  const [history, setHistory] = useState("");
  const { vaccination } = useContext(Context);

  function click2() {
    let vaccinationItem;
    console.log(id);
    console.log(vacName);
    console.log(startDate);
    if (vacName !== "" || startDate !== "") {
      vaccinationItem = {
        animalVaccinationId: id,
        vaccinationName: vacName,
        vaccinationDate: startDate,
      };
      setVacName("");
      setStartDate("");
    }
    console.log(vaccinationItem);
    if (typeof vaccinationItem !== "undefined") {
      if (typeof vaccination.updateVaccination !== "undefined") {
        let arr = vaccination.updateVaccination;
        arr.push(vaccinationItem);
        vaccination.setUpdateVaccination(arr);
      } else {
        let arr = [];
        arr.push(vaccinationItem);
        vaccination.setUpdateVaccination(arr);
      }
    }
    console.log(vaccination.updateVaccination);
  }

  const updateAnimal = async () => {
    try {
      // vaccination.setUpdateVaccination([]);
      let vacs = toJS(vaccination.updateVaccination);
      console.log(vacs);
      for (
        let index = 0;
        index < props.item.animalVaccinationsList.length;
        ++index
      ) {
        for (let i = 0; i < vacs.length; ++i) {
          //  let len = vacs[i].vaccinationDate.length;
          // let num =
          // Number(String(vacs[i].vaccinationDate).substring(len - 1)) + 1;
          if (
            props.item.animalVaccinationsList[index].animalVaccinationId ===
            vacs[i].animalVaccinationId
          ) {
            if (
              vacs[i].vaccinationName !== "" &&
              vacs[i].vaccinationDate !== ""
            ) {
              props.item.animalVaccinationsList[index].vaccinationName =
                vacs[i].vaccinationName;
              props.item.animalVaccinationsList[index].vaccinationDate =
                vacs[i].vaccinationDate;
            } else if (
              vacs[i].vaccinationName !== "" &&
              vacs[i].vaccinationDate === ""
            ) {
              props.item.animalVaccinationsList[index].vaccinationName =
                vacs[i].vaccinationName;
            } else if (
              vacs[i].vaccinationName === "" &&
              vacs[i].vaccinationDate !== ""
            ) {
              props.item.animalVaccinationsList[index].vaccinationDate =
                vacs[i].vaccinationDate;
            }
          }
        }
      }
      console.log(
        props.item.animalType,
        props.item.animalName,
        props.item.animalSex,
        age,
        history,
        props.item.animalBreed,
        image,
        false,
        toJS(props.item.animalVaccinationsList)
      );

      let ageParam = age;
      let historyParam = history;
      let imageParam = image;
      if (age === "") {
        ageParam = props.item.animalAge;
      }
      if (history === "") {
        historyParam = props.item.animalHistory;
      }
      if (image === "") {
        imageParam = props.item.animalImg;
      }

      let item = await updatePet(
        props.item.animalType,
        props.item.animalName,
        props.item.animalSex,
        ageParam,
        historyParam,
        props.item.animalBreed,
        imageParam,
        false,
        toJS(props.item.animalVaccinationsList),
        props.item.animalId
      );
      console.log(item);
    } catch (e) {
      alert("Такой вакцины не существует. Проверьте название вакцины.");
    }
  };
  const click = () => {
    vaccination.setModal(false);
    vaccination.setItem({});
  };
  return (
    <div className={`modal_wrapper ${props.isOpened ? "open" : "close"}`}>
      <div className="updatecard_modal">
        <div className="modal_close_update" onClick={click}>
          <img className="closeimg" src={close} />
        </div>

        <div className="updatecard">
          <div className="imgcatupdate">
            <img className="imgcatupdate" src={props.item.animalImg} />
          </div>
          <div>
            <form className="form_update" name="feedback">
              <div className="name_item">Фото</div>
              <input
                placeholder={props.item.animalImg}
                className="form_text"
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <div className="name_item">Возраст</div>
              <input
                type="number"
                placeholder={String(props.item.animalAge)}
                className="form_text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <div className="name_item">История </div>
              <textarea
                placeholder={props.item.animalHistory}
                className="message_text"
                type="text"
                value={history}
                onChange={(e) => setHistory(e.target.value)}
              ></textarea>

              {/* <div className="name_item">Напишите сообщение</div> */}
              {/* <textarea className="message_text" name="message"></textarea> */}
              <div className="block_vac">
                {props.item.animalVaccinationsList
                  ? props.item.animalVaccinationsList.map((vac) => (
                      <div key={vac.animalVaccinationId} className="vac_line">
                        <div>
                          {/* {setId(vac.animalVaccinationId)} */}
                          <div className="name_item">Название</div>
                          <input
                            placeholder={vac.vaccinationName}
                            className="form_text_vac"
                            type="text"
                            value={vacName}
                            onChange={(e) => {
                              setVacName(e.target.value);
                              setId(vac.animalVaccinationId);
                            }}
                          />
                        </div>

                        <div className="input_block">
                          <div className="name_item"> Дата</div>

                          <DatePicker
                            placeholderText={vac.vaccinationDate
                              .substring(0, 10)
                              .replaceAll("-", ".")}
                            className="form_text_data"
                            selected={startDate}
                            onChange={(date) => {
                              setStartDate(date);
                              setId(vac.animalVaccinationId);
                            }}
                          />
                        </div>
                        <div className="form_but_vaccination" onClick={click2}>
                          Обновить
                        </div>
                      </div>
                    ))
                  : null}
              </div>
              <button
                onClick={updateAnimal}
                className="form_but_update"
                type="submit"
              >
                Сохранить
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});
export default PetFormUpdate;
