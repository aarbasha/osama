import React, { useEffect, useState } from "react";
import RouterIndex from "./Routers/RouterIndex";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthRefreshToken, AuthLogout } from "./app/toolkit/AuthSlice";
import Cookies from "js-cookie";
import { profile } from "./app/toolkit/AuthSlice";
import offline from "./images/offline.jpg";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  const [isOnline, setIsOnline] = useState(window.navigator.onLine);
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Check the network status
      setIsOnline(window.navigator.onLine);
    }, 1000);

    // Cleanup the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  /*  const dispatch = useDispatch();
  const rediract = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  // Function to check if the token is expired or about toexpire
  const checkTokenExpiration = () => {
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    const currentTime = Date.now();
    const timeUntilExpiration = tokenExpiration - currentTime;
    const timeUntilRefresh = 5 * 60 * 1000; // 5 minutes before expiration
    if (timeUntilExpiration <= timeUntilRefresh) {
      refreshAccessToken();
      console.log("tha update token ..................");
    }
  }; */
  // Function to refresh the access token
  /*  const refreshAccessToken = () => {
    const token = localStorage.getItem("token");
    dispatch(AuthRefreshToken(token));
  }; */

  // Check token expiration on component mount and every minute
  /*   useEffect(() => {
    checkTokenExpiration();
    const interval = setInterval(() => {
      checkTokenExpiration();
    }, 60000); // Check token expiration every minute
    return () => clearInterval(interval);
  }, []); */

  return (
    <div className="App">
      {isOnline ? (
        <RouterIndex />
      ) : (
        <img src={offline} style={{ width: "100%", height: "100vh" }} />
      )}
    </div>
  );
};

export default App;
