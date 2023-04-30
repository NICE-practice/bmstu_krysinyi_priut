import React, { useState } from "react";
import { createDonation } from "../http/donateApi";
import dog from "../img/dog2.png";
import "../style/Home.css";

export default function DonateForm(props) {
  const [fio, setFio] = useState("");
  const [sum, setSum] = useState("");
  const addDonate = async () => {
    try {
      if (sum !== "") {
        let item = await createDonation(fio, sum);
        props.func(true);
        console.log(item);
      } else {
        alert("Пожалуйста введите сумму пожертвования");
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  return (
    <div className="adddonate">
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
                required="required"
                type="number"
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
