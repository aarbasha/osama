import React from 'react'
import { Outlet } from "react-router-dom";
import ThemisAdmin from '../../../Global/ThemisAdmin';

const MasterAuth = () => {
  return (
    <div className="wrapper">

      <main className="container">
        <Outlet />
      </main>

      <ThemisAdmin />
    </div>
  )
}

export default MasterAuth