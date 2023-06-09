import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ScaleInAnimation from "../../Animation/ScaleInAnimation";

const ForgetPassword = () => {
  const Rediract = useNavigate();
  const [loading, setLoading] = useState(false);

  const SendToEmail = () => {
    setLoading(true);
    setTimeout(() => {
      Rediract("/confirmCode");
      setLoading(false);
    }, 4000);
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
                {/* 
                <div className="d-none success">
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
                  <div className="col-lg-12">
                    <div className="card-body p-sm-5">
                      <h3 className="card-title text-center p-2">
                        Forgot Password?
                      </h3>

                      <p className="card-text mb-5 text-center">
                        Enter your registered email ID to reset the password
                      </p>

                      <div className="row g-5">
                        <div className="col-md-12">
                          <input
                            type="email"
                            className="form-control text-center radius-30"
                            id="inputEmailid"
                            placeholder="Email id or Username or Number Phone "
                          />
                        </div>
                        <div className="col-12 mt-3">
                          <div className="d-grid gap-3">
                            <button
                              onClick={SendToEmail}
                              type="button"
                              id="send"
                              className="btn btn-lg btn-primary radius-30"
                            >
                              Send
                            </button>
                            <Link
                              to={"/login"}
                              id="login"
                              className=" radius-30"
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
    </ScaleInAnimation>
  );
};

export default ForgetPassword;
