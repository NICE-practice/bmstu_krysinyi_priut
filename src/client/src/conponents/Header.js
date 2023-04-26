import React, { useContext } from "react";
import "../style/Home.css";
import { Container, Row, Col } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const HeaderHome = observer(() => {
  function onclick() {
    window.location.assign("http://localhost:3000/home/");
  }

  function contact() {
    window.location.assign("http://localhost:3000/contact");
  }
  const { user } = useContext(Context);
  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    user.setPrivilege(0);
    localStorage.removeItem("token");
    window.location.assign("http://localhost:3000/home/");
  };
  let itemsArr = [
    {
      value: "Наши животные",
      href: "/pets",
    },
    {
      value: "Контакты",
      href: "/contact",
    },
    {
      value: "Помощь приюту",
      href: "/home#donate",
    },
  ];
  if (user.isAuth === true && user.privilege === 2) {
    itemsArr = [
      {
        value: "Сообщения",
        href: "/operator",
      },
      {
        value: "Контакты",
        href: "/contact",
      },
      {
        value: "Помощь приюту",
        href: "/home#donate",
      },
      {
        value: "Выйти",
        href: "/home",
      },
    ];
  }
  if (user.isAuth === true && user.privilege === 3) {
    itemsArr = [
      {
        value: "Карточки животных",
        href: "/contentmanager",
      },
      {
        value: "Контакты",
        href: "/contact",
      },
      {
        value: "Помощь приюту",
        href: "/home#donate",
      },
      {
        value: "Выйти",
        href: "/home",
      },
    ];
  }
  return (
    <Container fluid className="header">
      <Row className="header_wrapper">
        <Col onClick={onclick} className="logo">
          Iva
        </Col>
        <Col className="menu">
          {user.isAuth ? (
            <ul className="head_list">
              <li className="hitem">
                {" "}
                <a className="hlink" href={itemsArr[0].href}>
                  {itemsArr[0].value}
                </a>
              </li>
              <li className="hitem">
                {" "}
                <a className="hlink" href={itemsArr[1].href}>
                  {itemsArr[1].value}
                </a>
              </li>
              <li className="hitem">
                {" "}
                <a className="hlink" href={itemsArr[2].href}>
                  {itemsArr[2].value}
                </a>
              </li>
              <li className="hitem">
                {" "}
                <a
                  onClick={() => logOut()}
                  className="hlink"
                  href={itemsArr[3].href}
                >
                  {itemsArr[3].value}
                </a>
              </li>
            </ul>
          ) : (
            <ul className="head_list">
              <li className="hitem">
                {" "}
                <a className="hlink" href={itemsArr[0].href}>
                  {itemsArr[0].value}
                </a>
              </li>
              <li className="hitem">
                {" "}
                <a className="hlink" href={itemsArr[1].href}>
                  {itemsArr[1].value}
                </a>
              </li>
              <li className="hitem">
                {" "}
                <a className="hlink" href={itemsArr[2].href}>
                  {itemsArr[2].value}
                </a>
              </li>
            </ul>
          )}
        </Col>
      </Row>

      <div className="main_text">
        <h2 className="h2_main">Не только людям нужен дом</h2>
        <p className="pmain">
          Наш приют хочет обеспечить каждому животному уютный дом, а также
          осчастливить пушистиков и их новых хозяев
        </p>
        <button onClick={contact} className="hbut">
          Связаться с нами
        </button>
      </div>
    </Container>
  );
});
export default HeaderHome;
