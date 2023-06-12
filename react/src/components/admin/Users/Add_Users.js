import React, { useState } from "react";
import FadeOutAnimation from "../../../Animation/FadeOutAnimation";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddUsers, allusers } from "../../../app/toolkit/UsersSlice";
import { toastError, toastSuccess } from "../../../Global/ToastContainer";

const Add_Users = () => {
  const navgate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { status, message } = useSelector((state) => state.users);
  const [avatar, setAvatar] = useState([]);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    password: "",
    roles: "",
    status: "",
  });
  const handelChangeInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handelChangeAvatar = (e) => {
    setAvatar({ avatar: e.target.files[0] });
    setAvatarPreview(URL.createObjectURL(e.target.files[0]));
  };

  const RemoveCover = (e) => {
    e.preventDefault();
    setAvatar([]);
    setAvatarPreview(null);
  };

  const add_users = (e) => {
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
    setTimeout(() => {
      if (status === "success") {
        toastSuccess(message);
        navgate(-1);
      } else if (status === "field") {
        toastError(message);
        navgate(location.pathname);
      }
      setLoading(false);
    }, 2000);
    dispatch(AddUsers(data));
  };

  return (
    <FadeOutAnimation>
      <div className="card">
        <div className="card-body">
          <div className="">
            <form onSubmit={add_users} className="row g-3">
              <div className="row">
                <div className="col-4 my-2">
                  <label className="form-label"> Name </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    name="name"
                    onChange={handelChangeInputs}
                    value={inputs.name}
                  />
                </div>

                <div className="col-4 my-2">
                  <label className="form-label"> Username </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter username"
                    name="username"
                    onChange={handelChangeInputs}
                    value={inputs.username}
                  />
                </div>

                <div className="col-4 my-2">
                  <label className="form-label"> Email </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                    name="email"
                    onChange={handelChangeInputs}
                    value={inputs.email}
                  />
                </div>

                <div className="col-6 my-2">
                  <label className="form-label"> Phone </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter phone"
                    name="phone"
                    onChange={handelChangeInputs}
                    value={inputs.phone}
                  />
                </div>

                <div className="col-6 my-2">
                  <label className="form-label"> Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                    name="password"
                    onChange={handelChangeInputs}
                    value={inputs.password}
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
                    <option>select status</option>
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
                    <option>select Roles</option>
                    <option value="0">Manger</option>
                    <option value="1">Admin</option>
                    <option value="2">User</option>
                  </select>
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
                    className="form-label mx-3 btn btn-primary"
                    onClick={RemoveCover}
                  >
                    Remove Image
                  </button>

                  <img
                    src={
                      avatarPreview !== null
                        ? avatarPreview
                        : `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y`
                    }
                    className="mx-5 user-img rounded-circle"
                    width={100}
                    height={100}
                    alt="test"
                  />
                </div>

                <div className="col-12 my-2">
                  <label className="form-label">Full description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    placeholder="Full description"
                    rows={3}
                    cols={4}
                  />
                </div>

                <div className="col-6 my-2"></div>
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-primary px-4">
                  Save Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </FadeOutAnimation>
  );
};

export default Add_Users;
