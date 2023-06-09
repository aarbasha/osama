import Card from "../components/frontend/private/Card";
import Favorite from "../components/frontend/private/Favorite";
import Login from "../components/auth/Login";
// import MyProfile from "../components/frontend/private/MyProfile"
import { useSelector } from "react-redux";

export const RouteAuthUser = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return [
    {
      path: "card",
      element: isAuth ? <Card /> : <Login />,
    },
    {
      path: "favorite",
      element: isAuth ? <Favorite /> : <Login />,
    },
    // {
    //     path: "myProfile",
    //     element:<MyProfile />
    // }
  ];
};
