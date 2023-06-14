import React, { useState } from "react";
/* import "../../frontend/public/Style/Navbar.css";
 */
import { BiFullscreen } from "react-icons/bi";
import { BiExitFullscreen } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import {SetFullScreen , OutFullscreen }  from './../app/toolkit/GlobalSlice'


const FullScreenBtn = () => {
  const { fullScreen } = useSelector((state) => state.global);
  const dispatch = useDispatch()

  const myDocoument = document.documentElement;
  const fullscreenR = myDocoument.requestFullscreen;
  const fullscreenE = document.exitFullscreen;

  const handleClickFull = (e) => {
    if (fullscreenR) {
      myDocoument.requestFullscreen();
      dispatch(SetFullScreen(e))
    }
    if (fullscreenE) {
      document.exitFullscreen();
      dispatch(OutFullscreen(e))
    }
  };
  return (
    <div>
      <div onClick={handleClickFull}>
        <>
          <i
            id="fullscreenFull"
            className={
              !fullScreen
                ? "rounded-circle mx-2 btn-sm btn btn-success m-1 bi-fullscreen"
                : "rounded-circle mx-2 btn-sm  btn btn-danger m-1  bi bi-fullscreen-exit"
            }
          ></i>
        </>
      </div>
    </div>
  );
};

export default FullScreenBtn;
