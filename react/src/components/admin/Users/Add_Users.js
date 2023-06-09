import React from "react";
import FadeOutAnimation from "../../../Animation/FadeOutAnimation";

const Add_Users = () => {
  return (
    <FadeOutAnimation>
      <div className="card">
        <div className="card-body">
          <div className="">
            <form className="row g-3">
              <div className="row">
                <div className="col-4 my-2">
                  <label className="form-label"> Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter Name"
                  />
                </div>

                <div className="col-4 my-2">
                  <label className="form-label"> Username </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter username"
                    name="username"
                  />
                </div>

                <div className="col-4 my-2">
                  <label className="form-label">Email </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                    name="email"
                  />
                </div>

                <div className="col-6 my-2">
                  <label className="form-label"> Phone </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter phone"
                    name="phone"
                  />
                </div>

                <div className="col-6 my-2">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                    name="password"
                  />
                </div>

                <div className="col-6 my-2">
                  <label className="form-label">Status</label>
                  <select className="form-select" name="status">
                    <option>select status</option>
                    <option value="1">Active</option>
                    <option value="0">Not Active</option>
                  </select>
                </div>

                <div className="col-6 my-2">
                  <label className="form-label">Type</label>
                  <select className="form-select" name="rouls">
                    <option>select rouls</option>
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
                  />

                  <label
                    className="form-label btn btn-danger px-5 "
                    htmlFor="files"
                  >
                    uplode Image Avatar
                  </label>

                  <button
                    // disabled={imagePreview === null}
                    className="form-label mx-3 btn btn-primary"
                  >
                    Remove Image
                  </button>

                  <img
                    src={`https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y`}
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
