import Singup from "../components/auth/Singup";
import Login from "../components/auth/Login";
import ForgetPassword from "../components/auth/ForgetPassword";
import ConfirmCode from "../components/auth/ConfirmCode";
import ResetPassword from "../components/auth/ResetPassword";
import MasterAuth from "../layouts/frontend/private/MasterAuth";
import MasterUsers from "../layouts/frontend/public/MasterUsers";
import Home from "../components/frontend/public/Home";
import About from "../components/frontend/public/About";
import { RouteAuthUser } from "./RouteAuthUser";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export const RouterUser = () => {
  const { isAuth } = useSelector((state) => state.auth);
  return [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "about",
      element: <About />,
    },

    {
      path: "user",
      element: <MasterAuth />,
      children: RouteAuthUser(),
    },
    {
      path: "login",
      element: isAuth ? <MasterAuth /> : <Login />,
    },
    {
      path: "singup",
      element: isAuth ? <MasterAuth /> : <Singup />,
    },
    {
      path: "forgetPassword",
      element: <ForgetPassword />,
    },
    {
      path: "confirmCode",
      element: <ConfirmCode />,
    },
    {
      path: "resetPassword",
      element: <ResetPassword />,
    },
  ];
};
