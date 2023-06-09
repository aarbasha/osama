import React, { useState } from "react";
/* import "../../frontend/public/Style/Navbar.css";
 */
import { BiFullscreen } from "react-icons/bi";
import { BiExitFullscreen } from "react-icons/bi";

const FullScreenBtn = () => {
  const [isActive, setIsActive] = useState(true);
  const myDocoument = document.documentElement;
  const fullscreenR = myDocoument.requestFullscreen;
  const fullscreenE = document.exitFullscreen;
  const handleClickFull = (e) => {
    if (fullscreenR) {
      myDocoument.requestFullscreen();
      setIsActive((e) => isActive);
    }
    if (fullscreenE) {
      document.exitFullscreen();
      setIsActive((e) => !isActive);
    }
  };
  return (
    <div>
      <div onClick={handleClickFull}>
        <>
          <i
            id="fullscreenFull"
            className={
              isActive
                ? "rounded-circle mx-2 btn-sm btn btn-success m-1 bi-fullscreen"
                : "rounded-circle mx-2 btn-sm  btn btn-danger m-1  bi bi-fullscreen-exit"
            }
          >
          </i>
        </>
      </div>
    </div>
  );
};

export default FullScreenBtn;
