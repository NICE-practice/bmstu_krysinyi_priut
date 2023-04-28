import React, { useState, useContext } from "react";
import close from "../img/close.svg";
import "../style/Contact.css";
import "../style/Pets.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const AddVaccinationModal = observer((props) => {
  const { vaccination } = useContext(Context);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  console.log(startDate.toJSON());
  let vaccinationItem;
  const click = () => {
    if (name && startDate) {
      vaccinationItem = {
        vaccinationName: name,
        vaccinationDate: startDate.toJSON(),
      };
    }
    console.log(vaccinationItem);
    if (typeof vaccination.addVaccination !== "undefined") {
      let arr = vaccination.addVaccination;
      arr.push(vaccinationItem);
      vaccination.setAddVaccination(arr);
    } else {
      let arr = [];
      arr.push(vaccinationItem);
      vaccination.setAddVaccination(arr);
    }
    props.onModalClose(false);
  };

  return (
    <div className={`modal_wrapper ${props.isOpened ? "open" : "close"}`}>
      <div className="modal_content_vac">
        <div className="modal_close_vac" onClick={props.onModalClose}>
          <img className="closeimg" src={close} />
        </div>
        <div className="modal_body">
          <form name="feedback">
            <div className="vaccinatiion_form">
              <div className="input_block">
                <div className="name_item">Название</div>
                <input
                  className="form_text_vac"
                  type="text"
                  name="name"
                  required="required"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="input_block">
                <div className="name_item"> Дата</div>
                <DatePicker
                  className="form_text_data"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
            </div>
            <button className="form_but_vac" type="button" onClick={click}>
              Сохранить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
});

export default AddVaccinationModal;
