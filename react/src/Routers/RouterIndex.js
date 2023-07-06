import React, { useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import { RouterAdmin } from "./RouterAdmin";
import { RouterUser } from "./RouterUser";
import MasterAdmin from "../layouts/admin/MasterAdmin";
import MasterUsers from "../layouts/frontend/public/MasterUsers";
import Error_404 from "../components/admin/Error_404";
import Login from "../components/auth/Login";

import { useSelector } from "react-redux";
import Error_505 from "../components/admin/Error_505";

/* https://poe.com/s/f3p6EKAGIzeTnOrFkxfj
 */

const RouterIndex = () => {
  const { isAuth, user } = useSelector((state) => state.auth);

  const chek = () => {
    if (isAuth) {
      if (user.roles <= 1) {
        return <MasterAdmin />;
      } else {
        return <Error_505 />;
      }
    } else {
      return <Login />;
    }
  };

  /* const [AuthChek  , setAuthChek ] = useState(isAuth)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setAuthChek(isAuth)
      
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []); */

  const Router = useRoutes([
    {
      path: "/admin",
      element: chek(),
      children: RouterAdmin(),
    },
    {
      path: "/",
      element: <MasterUsers />,
      children: RouterUser(),
    },
    {
      path: "*",
      element: <Error_404 />,
    },
  ]);

  return Router;
};

export default RouterIndex;
