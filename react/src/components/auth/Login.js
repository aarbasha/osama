import React, { useState } from "react";
import ScaleInAnimation from "../../Animation/ScaleInAnimation";
import { Container } from "../../Global/ToastContainer";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toastError, toastSuccess } from "../../Global/ToastContainer";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../app/toolkit/AuthSlice";

const Login = () => {
  const rediract = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { success, isAuth, error, status, user, token } = useSelector(
    (state) => state.auth
  );

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handelChangeInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const LoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      dispatch(login(inputs));
      if (isAuth) {
        console.log(isAuth);
        rediract(location.pathname);
        toastError(error);
      } else {
        console.log(isAuth);
        rediract("/");
        toastSuccess(success);
      }
      setLoading(false);
    }, 3000);
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

                <h5 className="card-title text-center mb-3 h2">LogIn</h5>
                <form onSubmit={LoginSubmit} className="form-body">
                  <div className="row g-3">
                    <div className="col-12">
                      <label htmlFor="inputEmailAddress" className="form-label">
                        Email Address
                      </label>
                      <div className="ms-auto position-relative">
                        <div className="position-absolute top-50 translate-middle-y search-icon px-3">
                          <i className="bi bi-envelope-fill" />
                        </div>
                        <input
                          type="email"
                          className="form-control radius-30 ps-5"
                          id="email"
                          placeholder="Email Address"
                          name="email"
                          onChange={handelChangeInputs}
                          value={inputs.email}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <label
                        htmlFor="inputChoosePassword"
                        className="form-label"
                      >
                        Enter Password
                      </label>
                      <div className="ms-auto position-relative">
                        <div className="position-absolute top-50 translate-middle-y search-icon px-3">
                          <i className="bi bi-lock-fill" />
                        </div>
                        <input
                          type="password"
                          className="form-control radius-30 ps-5"
                          id="password"
                          placeholder="Enter Password"
                          name="password"
                          onChange={handelChangeInputs}
                          value={inputs.password}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                          defaultChecked
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexSwitchCheckChecked"
                        >
                          Remember Me
                        </label>
                      </div>
                    </div>
                    <div className="col-6 text-end">
                      <Link to="/forgetPassword">Forgot Password ?</Link>
                    </div>
                    <div className="col-12">
                      <div className="d-grid">
                        <button
                          type="submit"
                          className="btn btn-primary radius-30"
                        >
                          Login
                        </button>
                      </div>
                    </div>
                    <div className="col-12">
                      <p className="mb-0">
                        Don't have an account yet?
                        <Link to="/singup" className="mx-2">
                          Sign up here
                        </Link>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {Container()}
    </ScaleInAnimation>
  );
};

export default Login;
