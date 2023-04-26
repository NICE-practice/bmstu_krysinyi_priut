import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import DonateForm from "../conponents/DonateForm";
import PetGame from "../conponents/PetGame";
// import SliderPet from "../conponents/SliderPet";
import { fetchPets } from "../http/petsApi";
import { Context } from "../index";
import Persons from "../conponents/Persons";
import HeaderHome from "../conponents/Header";
import { Row, Col } from "react-bootstrap";
import about from "../img/about.jpg";
import DonateItem from "../conponents/DonateItem";
import food from "../img/food.svg";
import bed from "../img/bed.svg";
import med from "../img/med.svg";
import shampo from "../img/shampo.svg";
import toy from "../img/toy.svg";
import vitamins from "../img/vitamins.svg";
import DonateModal from "../conponents/DonateModal";

const Home = observer(() => {
  const [modalDonate, setModalDonate] = useState(false);
  const { pet } = useContext(Context);
  useEffect(() => {
    fetchPets(null, null, null, 1, 15, null).then((data) => {
      console.log(data);
      pet.setPet(data.animals);
      pet.setTotalCount(data.animalsCount);
    });
  }, []);
  return (
    <div>
      <HeaderHome />
      <Row className="AboutUs">
        <Col sm={12} lg={6}>
          <img className="img_about" src={about} alt="cat" />
        </Col>
        <Col sm={12} lg={6}>
          <h2 className="title_about">Информация о приюте Iva</h2>
          <p className="subtitle_about">
            Приют не спонсируется государством и в данный момент он существует
            исключительно за счет благотворительной помощи людей и личных
            средств его владельцев. Помещение приюта взято в аренду и требует
            ежемесячной оплаты как самой аренды, так и коммунальных услуг.
          </p>
          <p className="subtitle_about">
            Являясь временным домом для питомцев, приют ставит перед собой
            задачи по оказанию необходимой помощи животным, находящимся у него
            на попечении, такие как содержание, уход, кормление, и конечно
            пристройство в семьи или к людям, готовым стать друзьями для
            хвостатых с непростой судьбой.
          </p>
        </Col>
      </Row>
      {/* <SliderPet /> */}
      <section id="donate" className="donation">
        <h1 className="title_donation">Чем вы можете помочь приюту</h1>
        <DonateModal
          isOpened={modalDonate}
          onModalClose={() => setModalDonate(false)}
        />
        <div className="contentdonate">
          <DonateForm func={setModalDonate} />
          <div>
            <div className="d-flex flex-row">
              <DonateItem name="Корм" img={food} />
              <DonateItem name="Лежанки и домики" img={bed} />
              <DonateItem name="Лекарства" img={med} />
            </div>
            <div className="d-flex flex-row">
              <DonateItem name="Шампунь" img={shampo} />
              <DonateItem name="Игрушки" img={toy} />
              <DonateItem name="Витамины" img={vitamins} />
            </div>
          </div>
        </div>
      </section>
      <PetGame />
      <Persons />
    </div>
  );
});
export default Home;
