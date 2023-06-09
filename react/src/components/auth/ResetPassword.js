import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import ScaleInAnimation from "../../Animation/ScaleInAnimation";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);

  const Rediract = useNavigate();

  const BtnResetPassword = () => {
    setLoading(true);
    setTimeout(() => {
      Rediract("/login");
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

                <div className="d-none success">
                  <div className="bg-success text-white text-center w-100 position-absolute py-2 px-2 text-center">
                    The data has been successfully sent to the email, please
                    check Thank you
                  </div>
                </div>

                <div className="d-none error">
                  <div className="bg-danger text-white text-center w-100 position-absolute py-2 px-2 text-center">
                    invalid error
                  </div>
                </div>

                <div className="">
                  <div className="col-md-12">
                    <div className="card-body p-4 p-sm-5">
                      <h3 className="card-title text-center mb-4">
                        Genrate New Password
                      </h3>

                      <div className="row g-3">
                        <div className="col-12">
                          <label
                            htmlFor="inputNewPassword"
                            className="form-label"
                          >
                            New Password
                          </label>
                          <div className="ms-auto position-relative">
                            <div className="position-absolute top-50 translate-middle-y search-icon px-3">
                              <i className="bi bi-lock-fill" />
                            </div>
                            <input
                              type="password"
                              className="form-control radius-30 ps-5"
                              id="inputNewPassword"
                              placeholder="Enter New Password"
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <label
                            htmlFor="inputConfirmPassword"
                            className="form-label"
                          >
                            Confirm Password
                          </label>
                          <div className="ms-auto position-relative">
                            <div className="position-absolute top-50 translate-middle-y search-icon px-3">
                              <i className="bi bi-lock-fill" />
                            </div>
                            <input
                              type="password"
                              className="form-control radius-30 ps-5"
                              id="inputConfirmPassword"
                              placeholder="Confirm Password"
                            />
                          </div>
                        </div>

                        <div className="col-12 mt-5">
                          <div className="d-grid gap-3">
                            <button
                              onClick={BtnResetPassword}
                              id="ChangePassword"
                              type="button"
                              className="btn btn-primary radius-30"
                            >
                              Change Password
                            </button>
                            <Link
                              to={"/login"}
                              id="login"
                              className=" btn btn-info radius-30"
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

export default ResetPassword;
