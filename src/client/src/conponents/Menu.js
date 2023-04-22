import React, { useContext } from "react";
import "../style/Home.css";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const Menu = observer(() => {
  const { user } = useContext(Context);
  const onclick = () => {
    window.location.assign("http://localhost:3000/home/");
  };
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
    <div className="menubase">
      <div onClick={onclick} className="logo">
        Iva
      </div>
      <div className="menu">
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
      </div>
    </div>
  );
});
export default Menu;
