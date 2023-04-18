import React, { useState } from "react";
import { createDonation } from "../http/donateApi";
import dog from "../img/dog2.png";
import "../style/Home.css";
import DonateModal from "./DonateModal";

export default function DonateForm() {
  const [fio, setFio] = useState("");
  const [sum, setSum] = useState("");
  const [modalDonate, setModalDonate] = useState(false);
  const addDonate = async () => {
    try {
      let item = await createDonation(fio, sum);
      setModalDonate(true);
      console.log(item);
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  return (
    <div className="adddonate">
      <DonateModal
        isOpened={modalDonate}
        onModalClose={() => setModalDonate(false)}
      />
      ;
      <div className="addcontentdonate">
        <div>
          <form>
            <div className="formcontent">
              <p className="labeld">Фио</p>
              <input
                className="inputd"
                placeholder="Введите фио"
                value={fio}
                onChange={(e) => setFio(e.target.value)}
              />
            </div>
            <div className="formcontent">
              <p className="labeld">Сумма</p>
              <input
                className="inputd"
                placeholder="Введите сумму для пожертвования"
                value={sum}
                onChange={(e) => setSum(e.target.value)}
              />
            </div>
            <button onClick={addDonate} type="button" className="butpushdonate">
              Пожертвовать
            </button>
          </form>
        </div>
        <div className="imgdog">
          <img className="imgfordonate" src={dog} />
        </div>
      </div>
    </div>
  );
}
