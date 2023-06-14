import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOnline } from "../app/toolkit/AuthSlice";

const SetOnline = () => {
  const dispatch = useDispatch();
  const { isOnline, isAuth } = useSelector((state) => state.auth);
 const anas = useEffect(() => {
    if (isAuth == true) {
      const intervalId = setInterval(() => {
        dispatch(setOnline());
      }, 3000);
      return clearInterval(intervalId);
    }
  }, []);

  return anas;
};

export default SetOnline;
