import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
// import BackToTopAdmin from './BackToTopAdmin'
import ThemisAdmin from "../../Global/ThemisAdmin";
import NavbarLinkItems from "./Navbar/NavbarLinkItems";
import NavbarSerch from "./Navbar/NavbarSerch";
import NavbarList from "./Navbar/NavbarList";
import SidebarTabs from "./Sidebar/SidebarTabs";
import SidebarContent from "./Sidebar/SidebarContent";
import Logo from "../../images/brand-logo-2.png";
import { useDispatch, useSelector } from "react-redux";
import { setOnline } from "../../app/toolkit/AuthSlice";

const MasterAdmin = () => {
  const [isActive, setIsActive] = useState(false);
  const handleClick = (event) => {
    setIsActive((current) => !current);
  };
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuth == true) {
      const intervalId = setInterval(() => {
        dispatch(setOnline())
      }, 60000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, []);

  return (
    <>
      <div className={isActive ? "wrapper toggled" : "wrapper"}>
        {/*start top header*/}
        <header className="top-header">
          <nav className="navbar navbar-expand">
            <div className="mobile-toggle-icon d-xl-none" onClick={handleClick}>
              <i className="bi bi-list" />
            </div>
            <NavbarLinkItems />
            <NavbarSerch />
            <NavbarList />
          </nav>
        </header>

        <aside className="sidebar-wrapper">
          <div className="iconmenu">
            <div className="nav-toggle-box" onClick={handleClick}>
              <div className="nav-toggle-icon">
                <i className="bi bi-list" />
              </div>
            </div>
            <SidebarTabs />
          </div>

          <div className="textmenu">
            <div className="brand-logo">
              <img src={Logo} width={140} alt="test" />
            </div>

            <SidebarContent />
          </div>
        </aside>

        <main className="page-content">
          <Outlet />
        </main>

        <ThemisAdmin />
      </div>
    </>
  );
};

export default MasterAdmin;
