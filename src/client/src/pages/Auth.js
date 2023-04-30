import React, { useContext, useState } from "react";
import { login } from "../http/userApi";
import "../style/Auth.css";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
// import { useNavigate } from "react-router-dom";

const Auth = observer(() => {
  const { user } = useContext(Context);
  // const navigate = useNavigate();
  const [Login, setLogin] = useState("");
  const [Password, setPassword] = useState("");
  const click = async () => {
    try {
      let data;
      if (Login !== "" || Password !== "") {
        data = await login(Login, Password);
        user.setUser(data);
        user.setIsAuth(true);
        user.setPrivilege(data.dictPrivilegePrivId);
        console.log(user.privilege);
        if (user.privilege === 2)
          window.location.assign("http://localhost:3000/operator");
        else if (user.privilege === 3)
          window.location.assign("http://localhost:3000/contentmanager");
      }
    } catch (e) {
      if (e.response.data.message === "Incorrect userCheck") {
        alert("Введен неправильный пароль");
      } else if (
        e.response.data.message === "User with such userLogin does not exist"
      ) {
        alert("Пользователь с таким логином не существует");
      }
    }
  };
  return (
    <div>
      <div className="authimg">
        <h1 className="authmaintext"> Авторизация</h1>
      </div>
      <div>
        <form className="authform">
          <div className="authcontent">
            <p className="labelauth">Логин</p>
            <input
              className="inputauth"
              placeholder="Введите логин"
              required="required"
              value={Login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <div className="authcontent">
            <p className="labelauth">Пароль</p>
            <input
              type="password"
              className="inputauth"
              placeholder="Введите пароль"
              required="required"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button onClick={click} className="butauth" type="submit">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
});
export default Auth;
