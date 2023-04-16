import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes, authRoutes } from "../routes";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const AppRouter = observer(() => {
  const { user } = useContext(Context);
  return (
    <div>
      <Routes>
        {user.isAuth &&
          authRoutes.map(({ path, Component }) => (
            <Route exact key={path} path={path} element={<Component />} />
          ))}
        {publicRoutes.map(({ path, Component }) => (
          <Route exact key={path} path={path} element={<Component />} />
        ))}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </div>
  );
});
export default AppRouter;
