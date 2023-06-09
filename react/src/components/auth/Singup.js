import React, { useState } from "react";
import ScaleInAnimation from "../../Animation/ScaleInAnimation";
import {
  Container,
  toastError,
  toastSuccess,
} from "../../Global/ToastContainer";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { api } from "../../Api/api";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../app/toolkit/AuthSlice";
const Singup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const { status } = useSelector((state) => state.auth);
  const { success } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handelChangeInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const SingUpSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      dispatch(register(inputs));
      if (!user) {
        navigate(location.pathname);
        setTimeout(() => {
          setInputs({ name: "", email: "", username: "", password: "" });
        }, 4000);
      } else if (user) {
        toastSuccess("successfyle Register ...");
        navigate("/login");
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <ScaleInAnimation>
      <div className="content-auth-singup ">
        <div className="rounded-0 overflow-hidden">
          <div className="row g-0">
            <div className=" card col-lg-5 offset-lg-4">
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

                <h5
                  className="card-title h3 text-center"
                  style={{ margin: "20px" }}
                >
                  Sign Up
                </h5>

                <form onSubmit={SingUpSubmit} className="form-body">
                  <div className="row g-4">
                    <div className="col-12 ">
                      <div className="ms-auto position-relative">
                        <div className="position-absolute top-50 translate-middle-y search-icon px-3">
                          <i className="bi bi-person-circle" />
                        </div>
                        <input
                          type="text"
                          className="form-control radius-30 ps-5"
                          id="name"
                          placeholder="Enter Name"
                          required
                          name="name"
                          onChange={handelChangeInputs}
                          value={inputs.name}
                        />
                      </div>

                      {error ? (
                        <p
                          style={{ position: "absolute" }}
                          className="text-danger text-center mt-1"
                        >
                          {error.name}
                        </p>
                      ) : (
                        <span></span>
                      )}
                    </div>

                    <div className=" col-12">
                      <div className="ms-auto position-relative">
                        <div className="position-absolute top-50 translate-middle-y search-icon px-3">
                          <i className="bi bi-person-circle" />
                        </div>
                        <input
                          type="text"
                          className="form-control radius-30 ps-5"
                          id="username"
                          placeholder="username"
                          required
                          name="username"
                          onChange={handelChangeInputs}
                          value={inputs.username}
                        />
                      </div>

                      {error ? (
                        <p
                          style={{ position: "absolute" }}
                          className="text-danger text-center mt-1"
                        >
                          {error.username}
                        </p>
                      ) : (
                        <span></span>
                      )}
                    </div>

                    <div className="col-12">
                      <div className="ms-auto position-relative">
                        <div className="position-absolute top-50 translate-middle-y search-icon px-3">
                          <i className="bi bi-envelope-fill" />
                        </div>
                        <input
                          type="email"
                          className="form-control radius-30 ps-5"
                          id="email"
                          placeholder="Enter Email"
                          required
                          name="email"
                          onChange={handelChangeInputs}
                          value={inputs.email}
                        />
                      </div>

                      {error ? (
                        <p
                          style={{ position: "absolute" }}
                          className="text-danger text-center mt-1"
                        >
                          {error.email}
                        </p>
                      ) : (
                        <span></span>
                      )}
                    </div>

                    <div className="col-12">
                      <div className="ms-auto position-relative">
                        <div className="position-absolute top-50 translate-middle-y search-icon px-3">
                          <i className="bi bi-lock-fill" />
                        </div>
                        <input
                          type="password"
                          className="form-control radius-30 ps-5"
                          id="password"
                          placeholder="Enter Password"
                          required
                          name="password"
                          onChange={handelChangeInputs}
                          value={inputs.password}
                        />
                      </div>

                      {error ? (
                        <p
                          style={{ position: "absolute" }}
                          className="text-danger text-center mt-1"
                        >
                          {error.password}
                        </p>
                      ) : (
                        <span></span>
                      )}
                    </div>

                    <div className="col-12">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexSwitchCheckChecked"
                        >
                          I Agree to the Trems &amp; Conditions
                        </label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="d-grid">
                        <button
                          type="submit"
                          className="btn btn-primary radius-30"
                        >
                          Sign in
                        </button>
                      </div>
                    </div>
                    <div className="col-12">
                      <p className="mb-0">
                        Already have an account?
                        <Link to="/login" className={"mx-2"}>
                          Login here
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

export default Singup;
