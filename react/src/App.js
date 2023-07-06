import React, { useEffect, useState } from "react";
import RouterIndex from "./Routers/RouterIndex";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthRefreshToken, AuthLogout } from "./app/toolkit/AuthSlice";
import Cookies from "js-cookie";
import { profile, setOnline, refreshToken } from "./app/toolkit/AuthSlice";
import offline from "./images/offline.jpg";
import axios from "axios";
import { UserOnlineOffline } from "./app/toolkit/UsersSlice";
import { all_Orders } from "./app/toolkit/OrdersSlice";
import { Spinner } from "react-bootstrap";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navgate = useNavigate();
  const { isAuth, token, expirationTime, user } = useSelector(
    (state) => state.auth
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      //if (isAuth) {
      dispatch(profile());
      const intervalId = setInterval(() => {
        dispatch(setOnline());
        dispatch(UserOnlineOffline());
        dispatch(all_Orders());
      }, 30000);
      return () => {
        clearInterval(intervalId);
      };
      // }
    }, 3000);
  }, []);

  const [isOnline, setIsOnline] = useState(window.navigator.onLine);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsOnline(window.navigator.onLine);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  /*   useEffect(() => {
    const intervalId = setInterval(() => {
      if (!document.cookie.includes("jwt=")) {
        clearInterval(intervalId);
        navgate("/login");
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [navgate]); */

  useEffect(() => {
    if (!token || !expirationTime) {
      return;
    }
    const timeUntilExpiration = expirationTime - Date.now();
    if (timeUntilExpiration <= 0) {
      dispatch(refreshToken());
    } else {
      const refreshTimeout = setTimeout(() => {
        dispatch(refreshToken());
      }, timeUntilExpiration - 5 * 60 * 1000); // Refresh 5 minutes before expiration
      return () => clearTimeout(refreshTimeout);
    }
  }, [dispatch, token, expirationTime]);

  return (
    <div className="App">
      {isOnline ? (
        loading ? (
          <div
            className="spical-spinner"
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner
              animation="grow"
              size="lg"
              variant="primary"
              className="spinner-border"
              style={{ margin: "0px auto", width: "100px", height: "100px" }}
            />
          </div>
        ) : (
          <RouterIndex />
        )
      ) : (
        <img src={offline} style={{ width: "100%", height: "100vh" }} />
      )}
    </div>
  );
};

export default App;
