import React, { useContext } from 'react'
import {Routes, Route,  Navigate} from 'react-router-dom'
import {publicRoutes} from "../routes"

export default function AppRouter() {
  
  
  return (
    <div>
      <Routes>
         {publicRoutes.map(({path, Component}) =>
            <Route exact key={path} path={path} element={<Component/>}/>
        )}
          <Route path="*"
        element={<Navigate to="/home" replace />}
    />

      </Routes>

    </div>
  )
}
