import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ScaleInAnimation from "../../Animation/ScaleInAnimation";

const ConfirmCode = () => {
  const [loading, setLoading] = useState(false);
  const Rediract = useNavigate();
  const Confirm = () => {
    setLoading(true);
    setTimeout(() => {
      Rediract("/resetPassword");
      setLoading(false);
    }, 6000);
  };

  return (
    <ScaleInAnimation>
      <div className="content-auth ">
        <div className="myauth">
          <div className="rounded-0 overflow-hidden">
            <div className="my-auth card col-lg-5 offset-lg-4">
              <div className="card-body p-4 p-sm-5">
                {loading ? (
                  <div
                    className="spinner-border text-primary"
                    style={{ position: "absolute", right: "40px" }}
                    role="status"
                  >
                    <span className="sr-only"></span>
                  </div>
                ) : null}

               {/*  <div className="d-none success">
                  <div className="bg-success text-white text-center w-100 position-absolute py-2 px-2 text-center">
                     successfully 
                  </div>
                </div>

                <div className="d-none error">
                  <div className="bg-danger text-white text-center w-100 position-absolute py-2 px-2 text-center">
                    invalid error
                  </div>
                </div> */}


                <div className="">
                  {/*     <div className="col-lg-12 mt-5 d-flex align-items-center justify-content-center">
                    <img src={Logo} className="img-fluid" alt="logo" />
                  </div> */}

                  <div className="col-lg-12">
                    <div className="card-body p-sm-5">
                      <h3 className="card-title text-center p-2">
                        Confirm Code
                      </h3>

                      <p className="card-text mb-5 text-center">
                        The code has been sent to your email, please enter the
                        code
                      </p>

                      <div className="row g-3">
                        <div className="col-12">
                          <input
                            type={"number"}
                            className="form-control text-center radius-30"
                            id="inputNumber"
                            placeholder="Enter Tha Code from MailBox"
                          />
                        </div>
                        <div className="col-12 mt-3">
                          <div className="d-grid gap-3">
                            <button
                              onClick={Confirm}
                              type="button"
                              id="Confirm"
                              className="btn btn-success radius-30"
                            >
                              Confirm
                            </button>

                            <div className="justify-content-center">
                              <Link
                                to={"/forgetPassword"}
                                className=" mx-2 radius-10"
                                id="resend"
                              >
                                Did you not receive a code?!
                              </Link>

                              <Link
                                to={'/login"'}
                                id="login"
                                className=" mx-2 radius-10"
                              >
                                Back to Login
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScaleInAnimation>
  );
};

export default ConfirmCode;
