import React, { useState, useEffect } from "react";
import GlobalAnimation from "../../Animation/GlobalAnimation";
import { useSelector, useDispatch } from "react-redux";
import { UpdateProfile } from "../../app/toolkit/AuthSlice";
import Spinner from "react-bootstrap/Spinner";
import { toastError, toastSuccess } from "../../Global/ToastContainer";
import moment from "moment";
import Time from "../../Global/Time";
import { useNavigate } from "react-router-dom";
import SetOnline from "../../Global/SetOnline";
const AdminProfile = () => {
  const Rediract = useNavigate();
  const dispatch = useDispatch();
  const { user, status, message, isOnline } = useSelector(
    (state) => state.auth
  );
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    status: "",
    roles: "",
    phone: "",
  });
  const [avatar, setAvatar] = useState([]);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const handelChangeInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handelChangeCover = (e) => {
    setAvatar({ avatar: e.target.files[0] });
    setAvatarPreview(URL.createObjectURL(e.target.files[0]));
  };

  const RemoveCover = (e) => {
    e.preventDefault();
    setAvatar([]);
    setAvatarPreview(null);
  };

  const [Checked, setChecked] = useState(true);
  const handelChangechecked = (e) => {
    if (e.target.checked === true) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };

  useEffect(() => {
    setInputs(user);
    <SetOnline />;
  }, []);

  const updateProfile = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", inputs.name);
    data.append("username", inputs.username);
    data.append("email", inputs.email);
    data.append("phone", inputs.phone);
    data.append("roles", inputs.roles);
    data.append("status", inputs.status);
    data.append("avatar", avatar.avatar);
    if (Checked === false) {
      data.append("password", inputs.password);
    }

    setLoading(true);
    setTimeout(() => {
      dispatch(UpdateProfile(data));

      if (status === "succeeded") {
        toastSuccess("success update my profile");
      } else {
        toastError("Error . not Updata profile");
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <GlobalAnimation>
      <div className="row">
        <div className="col-12 col-lg-8">
          <div className="card">
            <div className="card-body">
              <div className="">
                <form
                  onSubmit={updateProfile}
                  className="row g-3"
                  encType="multipart/form-data"
                >
                  <div className="row">
                    <div className="col-6 my-2">
                      <label className="form-label"> Name</label>
                      <input
                        type="text"
                        name="name"
                        onChange={handelChangeInputs}
                        value={inputs.name}
                        className="form-control"
                        placeholder="Enter Name"
                      />
                    </div>

                    <div className="col-6 my-2">
                      <label className="form-label"> Username </label>
                      <input
                        type="text"
                        name="username"
                        onChange={handelChangeInputs}
                        value={inputs.username}
                        className="form-control"
                        placeholder="Enter username"
                      />
                    </div>

                    <div className="col-6 my-2">
                      <label className="form-label">Email </label>
                      <input
                        type="email"
                        name="email"
                        onChange={handelChangeInputs}
                        value={inputs.email}
                        className="form-control"
                        placeholder="Enter Email"
                      />
                    </div>

                    <div className="col-6 my-2">
                      <label className="form-label"> Phone </label>
                      <input
                        type="number"
                        name="phone"
                        onChange={handelChangeInputs}
                        value={inputs.phone}
                        className="form-control"
                        placeholder="Enter phone"
                      />
                    </div>

                    <div className="col-6 my-2">
                      <label className="form-label">Status</label>
                      <select
                        name="status"
                        onChange={handelChangeInputs}
                        value={inputs.status}
                        className="form-select"
                      >
                        <option value="1">Active</option>
                        <option value="0">Not Active</option>
                      </select>
                    </div>

                    <div className="col-6 my-2">
                      <label className="form-label">Type</label>
                      <select
                        name="roles"
                        onChange={handelChangeInputs}
                        value={inputs.roles}
                        className="form-select"
                      >
                        <option value="2">User</option>
                        <option value="1">Admin</option>
                        <option value="0">Manger</option>
                      </select>
                    </div>

                    <div className="row my-2">
                      <div className="col-6"></div>
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Password"
                        name="password"
                        id="password"
                        disabled={Checked}
                      />

                      <div className="form-check mt-1 form-switch">
                        <input
                          className="form-check-input "
                          type="checkbox"
                          id="Checked"
                          style={{ width: "100px", height: "20px" }}
                          onChange={(e) => handelChangechecked(e)}
                        />
                        <label
                          className={
                            Checked
                              ? "form-check-label mx-3 px-2  my-1 bg-warning  text-dark "
                              : "form-check-label mx-3 px-2 my-1  bg-danger text-white"
                          }
                          htmlFor="Checked"
                          style={{
                            width: "auto",
                            height: "20px",
                            "border-radius": "30px",
                          }}
                        >
                          <i className="bi bi-check-circle-fill mx-2" />
                          Change Password ?
                        </label>
                      </div>
                    </div>

                    <div className="col-12 my-2">
                      <label className="btn btn-dark px-4 my-3" htmlFor="file">
                        Uplode Images Avatar
                      </label>

                      <input
                        name="avatar"
                        className="form-control d-none"
                        type="file"
                        id="file"
                        onChange={handelChangeCover}
                      />

                      <button
                        onClick={RemoveCover}
                        disabled={avatarPreview === null}
                        className="btn btn-primary mx-3"
                      >
                        Remove Avatar
                      </button>
                    </div>

                    <div className="col-12 my-2">
                      <label className="form-label">Full description</label>
                      <textarea
                        name="description"
                        className="form-control"
                        placeholder="Full description"
                        defaultValue={""}
                      />
                    </div>

                    <div className="col-6 my-2"></div>
                  </div>

                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-outline-success  mx-2"
                      style={{ width: "200px" }}
                    >
                      {loading ? (
                        <Spinner
                          size="sm"
                          className="mx-3"
                          animation="border"
                          variant="danger"
                        />
                      ) : (
                        <> Update my Profile</>
                      )}
                    </button>

                    <button
                      onClick={() => Rediract(-1)}
                      className="btn btn-danger px-4 mx-2"
                    >
                      Back
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card shadow-sm border-0 overflow-hidden">
            <div className="card-body">
              <div className="profile-avatar text-center">
                {avatarPreview !== null ? (
                  <img
                    src={avatarPreview}
                    className="user-img rounded-circle"
                    alt={"user-profile"}
                    style={{ width: "250px", height: "250px" }}
                  />
                ) : (
                  <img
                    src={
                      user.avatar === "null"
                        ? `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y`
                        : `http://localhost:8000/photo/${inputs.avatar}`
                    }
                    className="user-img rounded-circle"
                    alt={"user-profile"}
                    style={{ width: "250px", height: "250px" }}
                  />
                )}
              </div>

              <div className="d-flex align-items-center justify-content-around mt-5 gap-3">
                <div className="text-center">
                  <h4 className="mb-0">45</h4>
                  <p className="mb-0 text-secondary">Friends</p>
                </div>
                <div className="text-center">
                  <h4 className="mb-0">15</h4>
                  <p className="mb-0 text-secondary">Photos</p>
                </div>
                <div className="text-center">
                  <h4 className="mb-0">86</h4>
                  <p className="mb-0 text-secondary">Comments</p>
                </div>
              </div>
              <div
                className="d-flex justify-content-around mt-5"
                style={{ height: "200px" }}
              >
                {user?.is_online === 1 ? (
                  <div className="d-flex flex-column">
                    <div className="h3 text-center">
                      {" "}
                      <Spinner
                        animation="grow"
                        className=""
                        variant="success"
                      />{" "}
                      Online
                    </div>
                    <hr />
                    <div className="h5 text-center">
                      {moment.unix(Time(user?.last_seen_at)).fromNow()}
                    </div>
                  </div>
                ) : (
                  <>
                    <Spinner animation="grow" variant="success" />
                    <span className=" text-center">offline</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlobalAnimation>
  );
};

export default AdminProfile;
