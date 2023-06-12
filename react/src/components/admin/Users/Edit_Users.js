import React, { useState, useEffect } from "react";
import FadeOutAnimation from "../../../Animation/FadeOutAnimation";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AddUsers,
  UpdateUsers,
  allusers,
  editUser,
} from "../../../app/toolkit/UsersSlice";
import { toastError, toastSuccess } from "../../../Global/ToastContainer";
import Skeleton from "react-loading-skeleton";
import Spinner from "react-bootstrap/esm/Spinner";

const Edit_Users = () => {
  const { id } = useParams();
  const navgate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { status, message, oldUser } = useSelector((state) => state.users);
  const [avatar, setAvatar] = useState([]);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingInput, setLoadingInput] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    password: "",
    roles: "",
    status: "",
  });

/*   useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(editUser(id));
      //setInputs(oldUser);
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, []); */


  useEffect(() => {
   
    async function dispatchFunction(){
      const response = await dispatch(editUser(id))

      setInputs(oldUser);
    }
    dispatchFunction()
    
    setLoadingInput(true);
    setTimeout(() => {
      setLoadingInput(false);
    }, 2000);
  }, []);

  const [Checked, setChecked] = useState(true);
  const handelChangechecked = (e) => {
    if (e.target.checked === true) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  };

  const handelChangeInputs = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
   await setInputs((values) => ({ ...values, [name]: value }));
  };
  const handelChangeAvatar = (e) => {
    setAvatar({ avatar: e.target.files[0] });
    setAvatarPreview(URL.createObjectURL(e.target.files[0]));
  };

  const RemoveAvatar = (e) => {
    e.preventDefault();
    setAvatar([]);
    setAvatarPreview(null);
  };

  const update_users = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", inputs.name);
    data.append("email", inputs.email);
    data.append("username", inputs.username);
    data.append("phone", inputs.phone);
    data.append("password", inputs.password);
    data.append("roles", inputs.roles);
    data.append("status", inputs.status);
    data.append("avatar", avatar.avatar);

    setLoading(true);

    await dispatch(UpdateUsers({ data: data, id: id }));

    setTimeout(() => {
      if (status === "success") {
        toastSuccess(message);
        navgate("/admin/users/all_users");
      } else if (status === "field") {
        toastError(message);
        navgate(location.pathname);
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <FadeOutAnimation>
      <div className="card">
        <div className="card-body">
          <div className="">
            <form
              onSubmit={update_users}
              className="row g-3"
              enctype="multipart/form-data"
            >
              <div className="row">
                <div className="col-4 my-2">
                  <label className="form-label"> Name</label>

                  {loadingInput ? (
                    <Skeleton count={1} style={{ height: "35px" }} />
                  ) : (
                    <input
                      type="text"
                      name="name"
                      onChange={handelChangeInputs}
                      value={inputs.name}
                      className="form-control"
                      placeholder="Enter Name"
                      required
                    />
                  )}
                </div>

                <div className="col-4 my-2">
                  <label className="form-label"> Username </label>
                  {loadingInput ? (
                    <Skeleton count={1} style={{ height: "35px" }} />
                  ) : (
                    <input
                      type="text"
                      name="username"
                      onChange={handelChangeInputs}
                      value={inputs.username}
                      className="form-control"
                      placeholder="Enter username"
                      required
                    />
                  )}
                </div>

                <div className="col-4 my-2">
                  <label className="form-label">Email </label>
                  {loadingInput ? (
                    <Skeleton count={1} style={{ height: "35px" }} />
                  ) : (
                    <input
                      type="text"
                      name="email"
                      onChange={handelChangeInputs}
                      value={inputs.email}
                      className="form-control"
                      placeholder="Enter Email"
                      required
                    />
                  )}
                </div>

                <div className="col-6 my-2">
                  <label className="form-label"> Phone </label>
                  {loadingInput ? (
                    <Skeleton count={1} style={{ height: "35px" }} />
                  ) : (
                    <input
                      type="text"
                      name="phone"
                      onChange={handelChangeInputs}
                      value={inputs.phone}
                      className="form-control"
                      placeholder="Enter Phone"
                      required
                    />
                  )}
                </div>

                <div className="col-6 my-2">
                  <label className="form-label">Password</label>

                  {loadingInput ? (
                    <Skeleton count={1} style={{ height: "35px" }} />
                  ) : (
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter Password"
                      name="password"
                      id="password"
                      value={Checked ? inputs.password : null}
                      disabled={Checked}
                      onChange={handelChangechecked}
                    />
                  )}

                  <div className="form-check form-switch">
                    <input
                      className="form-check-input Checked"
                      type="checkbox"
                      id="Checked"
                      style={{ width: "50px" }}
                      onChange={(e) => handelChangechecked(e)}
                    />
                    <label className="form-check-label px-4" htmlFor="Checked">
                      Change Password Tha User
                    </label>
                  </div>
                </div>

                <div className="col-6 my-2">
                  <label className="form-label">Status</label>

                  {loadingInput ? (
                    <Skeleton count={1} style={{ height: "35px" }} />
                  ) : (
                    <select
                      className="form-select"
                      name="status"
                      onChange={handelChangeInputs}
                      value={inputs.status}
                    >
                      <option>select status</option>
                      <option value="1">Active</option>
                      <option value="0">Not Active</option>
                    </select>
                  )}
                </div>

                <div className="col-6 my-2">
                  <label className="form-label">Type</label>

                  {loadingInput ? (
                    <Skeleton count={1} style={{ height: "35px" }} />
                  ) : (
                    <select
                      className="form-select"
                      name="roles"
                      onChange={handelChangeInputs}
                      value={inputs.roles}
                    >
                      <option>select rouls</option>

                      <option value="0">Manger</option>
                      <option value="1">Admin</option>
                      <option value="2">User</option>
                    </select>
                  )}
                </div>

                <div className="col-12 my-2 user-image-uplode">
                  <input
                    className="form-control d-none"
                    type="file"
                    name="avatar"
                    id="files"
                    onChange={handelChangeAvatar}
                  />

                  <label
                    className="form-label btn btn-danger px-5 "
                    htmlFor="files"
                  >
                    uplode Image Avatar
                  </label>

                  <button
                    disabled={avatarPreview === null}
                    onClick={RemoveAvatar}
                    className="form-label mx-3 btn btn-primary"
                  >
                    Old Image
                  </button>

                  {loadingInput ? (
                    <Skeleton
                      circle={true}
                      style={{ width: "100px", height: "100px" }}
                      className="mx-5 rounded-circle shadow"
                    />
                  ) : avatarPreview !== null ? (
                    <>
                      <img
                        src={avatarPreview}
                        className="mx-5 rounded-circle shadow"
                        style={{ width: "100px", height: "100px" }}
                        alt="test"
                      />
                    </>
                  ) : (
                    <>
                      <img
                        src={
                          inputs.avatar === "null"
                            ? `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y`
                            : `http://localhost:8000/photo/${inputs.avatar}`
                        }
                        className="mx-5 rounded-circle shadow"
                        style={{ width: "100px", height: "100px" }}
                        alt="test"
                      />
                    </>
                  )}
                </div>

                {/*  <div className="col-12 my-2">
                  <label className="form-label">Full description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    placeholder="Full description"
                    rows={3}
                    cols={4}
                  />
                </div> */}

                <div className="col-6 my-2"></div>
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-primary px-4">
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <>Update User</>
                  )}
                </button>

                <button
                  onClick={() => navgate("/admin/users/all_users")}
                  className="btn btn-danger mx-3 px-4"
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </FadeOutAnimation>
  );
};

export default Edit_Users;
