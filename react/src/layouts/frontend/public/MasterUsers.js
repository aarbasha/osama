import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavbarUser from "../public/NavbarUser";
import "../public/Style/Frontend.css";
import ThemisAdmin from "../../../Global/ThemisAdmin";
import SetOnline from "../../../Global/SetOnline";

const MasterUsers = () => {
/*   useEffect(() => {
    <SetOnline />;
  }, []); */

  return (
    <>
      <div className="wrapper">
        <NavbarUser />
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
