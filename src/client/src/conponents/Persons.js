import React from "react";
import PersonCard from "./PersonCard";
import job from "../img/job.jpg";
import lead from "../img/lead.jpg";
import owner from "../img/owner.jpg";

export default function Persons() {
  return (
    <div id="team" className="team">
      <h1 className="title_team">Наша команда</h1>
      <div className="block_team">
        <PersonCard name="Юрий Алексеевич" role="Владелец" img={owner} />
        <PersonCard name="Анна Степанова" role="Руководитель" img={lead} />
        <PersonCard
          name="Виктрия Артемова"
          role="Ветеринарный врач"
          img={job}
        />
      </div>
    </div>
  );
}
