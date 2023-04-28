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
      data = await login(Login, Password);
      user.setUser(data);
      user.setIsAuth(true);
      user.setPrivilege(data.dictPrivilegePrivId);
      console.log(user.privilege);
      if (user.privilege === 2)
        window.location.assign("http://localhost:3000/operator");
      else if (user.privilege === 3)
        window.location.assign("http://localhost:3000/contentmanager");
    } catch (e) {
      alert(e.response.data.message);
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
