import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserOnlineOffline } from "../app/toolkit/UsersSlice";
import Spinner from "react-bootstrap/esm/Spinner";
import { setOnline } from "../app/toolkit/AuthSlice";
const ThemisAdmin = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { isAuth , user } = useSelector((state) => state.auth);
  const { usersOnline, usersOffline } = useSelector((state) => state.users);

  useEffect(() => {
    SaveMode();
   // if (isAuth) {
      dispatch(UserOnlineOffline())
      dispatch(setOnline());
    //}
  }, []);

  const changeBackgroundSudebar = () => {
    let mySidebar = document.querySelector(".sidebar-wrapper");
  };

  let myHtml = document.querySelector("#page");

  
  const ChngedModeColor = () => {
    myHtml.removeAttribute("class");
    myHtml.setAttribute("class", "semi-dark");
    localStorage.setItem("mode", "Color");
    document.querySelector("#SemiDarkTheme").checked = true;
  };

  const ChngedModeDark = () => {
    myHtml.removeAttribute("class");
    myHtml.classList.add("dark-theme");
    localStorage.setItem("mode", "dark");
    document.querySelector("#DarkTheme").checked = true;
  };

  const ChngedModeLight = () => {
    myHtml.removeAttribute("class");
    myHtml.classList.add("light-theme");
    localStorage.setItem("mode", "light");
    document.querySelector("#LightTheme").checked = true;
  };

  const ChngedModeMinimalTheme = () => {
    myHtml.removeAttribute("class");
    myHtml.classList.add("minimal-theme");
    localStorage.setItem("mode", "minimal-theme");
    document.querySelector("#MinimalTheme").checked = true;
  };

  const SaveMode = () => {
    if (localStorage.getItem("mode") === null) {
      ChngedModeDark();
    } else if (localStorage.getItem("mode") === "minimal-theme") {
      ChngedModeMinimalTheme();
    } else if (localStorage.getItem("mode") === "Color") {
      ChngedModeColor();
    } else if (localStorage.getItem("mode") === "dark") {
      ChngedModeDark();
    } else if (localStorage.getItem("mode") === "light") {
      ChngedModeLight();
    }
  };


  return (
    <>
      <div className="switcher-body">
        <button
          className="btn btn-primary btn-switcher shadow-sm"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasScrolling"
          aria-controls="offcanvasScrolling"
        >
          <i className="bi bi-paint-bucket me-0" />
        </button>
        <div
          className="offcanvas offcanvas-end shadow border-start-0 p-2"
          data-bs-scroll="true"
          data-bs-backdrop="false"
          tabIndex={-1}
          id="offcanvasScrolling"
        >
          <div className="offcanvas-header border-bottom">
            <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
              Theme Customizer
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
            />
          </div>
          <div className="offcanvas-body">
            <h6 className="mb-0">Theme Variation</h6>
            <hr />
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                onClick={ChngedModeLight}
                type="radio"
                name="inlineRadioOptions"
                id="LightTheme"
                defaultValue="option1"
              />
              <label className="form-check-label" htmlFor="LightTheme">
                Light
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                onClick={ChngedModeDark}
                type="radio"
                name="inlineRadioOptions"
                id="DarkTheme"
                defaultValue="option2"
              />
              <label className="form-check-label" htmlFor="DarkTheme">
                Dark
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                onClick={ChngedModeColor}
                name="inlineRadioOptions"
                id="SemiDarkTheme"
                defaultValue="option3"
              />
              <label className="form-check-label" htmlFor="SemiDarkTheme">
                Semi Dark
              </label>
            </div>
            <hr />
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                onClick={ChngedModeMinimalTheme}
                type="radio"
                name="inlineRadioOptions"
                id="MinimalTheme"
                defaultValue="option3"
              />
              <label className="form-check-label" htmlFor="MinimalTheme">
                Minimal Theme
              </label>
            </div>
            <hr />
            <h6 className="mb-0">Header Colors</h6>
            <hr />
            <div className="header-colors-indigators">
              <div className="row row-cols-auto g-3">
                <div className="col">
                  <div
                    className="indigator headercolor1"
                    onClick={changeBackgroundSudebar}
                    id="headercolor1"
                  />
                </div>
                <div className="col">
                  <div className="indigator headercolor2" id="headercolor2" />
                </div>
                <div className="col">
                  <div className="indigator headercolor3" id="headercolor3" />
                </div>
                <div className="col">
                  <div className="indigator headercolor4" id="headercolor4" />
                </div>
                <div className="col">
                  <div className="indigator headercolor5" id="headercolor5" />
                </div>
                <div className="col">
                  <div className="indigator headercolor6" id="headercolor6" />
                </div>
                <div className="col">
                  <div className="indigator headercolor7" id="headercolor7" />
                </div>
                <div className="col">
                  <div className="indigator headercolor8" id="headercolor8" />
                </div>
              </div>

              <hr />
              <div className="row d-flex justify-content-center text-center mt-3">
                {isAuth && user.roles <= 1 ? 
               
                <div className="d-flex flex-column">
                <h3>Users Active </h3>
                  {usersOnline &&
                    usersOnline.map((item) => (
                      <div
                        key={item.id}
                        className=" my-2   d-flex justify-content-start "
                      >
                        <div className="mr-auto">
                          <img
                            className="card-img-top "
                            src={
                              item.avatar === "null"
                                ? `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y`
                                : `http://localhost:8000/photo/${item.avatar}`
                            }
                            alt="Card image cap"
                            style={{
                              width: "40px",
                              height: "40px",
                              margin: "0 auto",
                              borderRadius: "50%",
                            }}
                          />
                        </div>

                        <div className="d-flex align-items-end">
                          <div className="h5 mx-3"> {item.name}</div>

                          <div className="ml-auto ">
                            {item.is_online === 1 ? (
                              <Spinner animation="grow" variant="success" />
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                :
                null
              }

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThemisAdmin;
