import React from "react";
import "../style/Home.css";

export default function PersonCard(props) {
  return (
    <div className="team_inf">
      <img className="team_img" src={props.img} />
      <h5 className="name_team">{props.name} </h5>
      <p className="role_team">{props.role}</p>
    </div>
  );
}
