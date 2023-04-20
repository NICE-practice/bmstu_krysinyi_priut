import React, { useContext } from "react";
import "../style/Contact.css";
import "../style/Home.css";
import { observer } from "mobx-react-lite";
import { Container, Row, Col } from "react-bootstrap";
import { Context } from "../index";

const Header = observer(() => {
  function onclick() {
    window.location.assign("http://localhost:3000/home/");
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
  if (user.isAuth === true && user.privilege === 1) {
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
    <Container fluid className="headercontact">
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
        <h2 className="h2_main">Контакты</h2>
        <p className="pmain">
          Наш приют стремиться осчастливить каждого пушистика и найти ему новый
          дом с заботливыми хозяевами, чтобы питомец был самым залюбленным в
          мире
        </p>
      </div>
    </Container>
  );
});
export default Header;
