import React from "react";
import "../style/Home.css";
export default function DonateItem(props) {
  return (
    <div>
      <div className="donation_item">
        <img className="img_donation" src={props.img} />
        <h4 className="donation_subtitle">{props.name}</h4>
      </div>
    </div>
  );
}
