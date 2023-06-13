import React, {useEffect} from "react";
import { Outlet } from "react-router-dom";
import NavbarUser from "../public/NavbarUser";
import "../public/Style/Frontend.css";
import ThemisAdmin from "../../../Global/ThemisAdmin";
import { useDispatch, useSelector } from "react-redux";
import { setOnline } from "../../../app/toolkit/AuthSlice";


const MasterUsers = () => {
  const dispatch = useDispatch()
  const {isAuth} = useSelector(state => state.auth)
  useEffect(() => {
    if (isAuth == true) {
      const intervalId = setInterval(() => {
        dispatch(setOnline())
      }, 60000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [])
  



  return (
    <>
      <div className="wrapper">
        <NavbarUser  />
        <div className="content-user container">
          <div className="row w-100">
            <div className="col-lg-12">
              <Outlet />
            </div>
          </div>
        </div>

        <ThemisAdmin />
      </div>
    </>
  );
};

export default MasterUsers;
