import React from "react";
import "../style/Home.css";
import close from "../img/close.svg";

export default function DonateModal(props) {
  return (
    <div className={`modal_wrapper ${props.isOpened ? "open" : "close"}`}>
      <div className="donatemodal">
        <div className="modal_close" onClick={props.onModalClose}>
          <img className="closeimg" src={close} />
        </div>
        <div>
          <p className="donatemodaltext">Пожертвование отправлено!</p>
        </div>
      </div>
    </div>
  );
}
