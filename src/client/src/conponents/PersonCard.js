import React from 'react';
import "../style/Home.css";

export default function PersonCard(props) {
  return (
    <div class="team_inf">
        <img class="team_img" src={props.img}/>
        <h5 class="name_team">{props.name} </h5>
        <p  class="role_team">{props.role}</p>
    </div>
  )
}
