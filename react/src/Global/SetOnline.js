import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOnline } from "../app/toolkit/AuthSlice";
import { UserOnlineOffline } from "../app/toolkit/UsersSlice";

const SetOnline = () => {
  const dispatch = useDispatch();
  const { isOnline, isAuth } = useSelector((state) => state.auth);
  useEffect(() => {
    
  }, []);

  return null;
};

export default SetOnline;
