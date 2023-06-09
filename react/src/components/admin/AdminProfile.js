import React from "react";
import GlobalAnimation from "../../Animation/GlobalAnimation";

const AdminProfile = () => {
  return (
    <GlobalAnimation>
      <div className="row">
        <div className="col-12 col-lg-8">
          <div className="card">
            <div className="card-body">
              <div className="">
                <form className="row g-3" encType="multipart/form-data">
                  <div className="row">
                    <div className="col-6 my-2">
                      <label className="form-label"> Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter Name"
                      />
                    </div>

                    <div className="col-6 my-2">
                      <label className="form-label"> Username </label>
                      <input
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="Enter username"
                      />
                    </div>

                    <div className="col-6 my-2">
                      <label className="form-label">Email </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter Email"
                      />
                    </div>

                    <div className="col-6 my-2">
                      <label className="form-label"> Phone </label>
                      <input
                        type="number"
                        name="phone"
                        className="form-control"
                        placeholder="Enter phone"
                      />
                    </div>

                    <div className="col-6 my-2">
                      <label className="form-label">Status</label>
                      <select name="status" className="form-select">
                        <option value="1">Active</option>
                        <option value="0">Not Active</option>
                      </select>
                    </div>

                    <div className="col-6 my-2">
                      <label className="form-label">Type</label>
                      <select name="rouls" className="form-select">
                        <option value="2">User</option>
                        <option value="1">Admin</option>

                        <option value="0">Manger</option>
                      </select>
                    </div>

                    <div className="col-6 my-2">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Password"
                        name="password"
                        id="password"
                      />

                      <div className="form-check form-switch">
                        <input
                          className="form-check-input "
                          type="checkbox"
                          id="Checked"
                          style={{ width: "100px", height: "20px" }}
                          // onChange={(e) => handelChangechecked(e)}
                        />
                        <label
                          // className={
                          //     Checked ?
                          //     "form-check-label mx-3  px-5 my-1 bg-warning  text-dark " :
                          //     "form-check-label mx-3 px-5  my-1  bg-danger text-white"
                          // }
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
                      <input
                        name="photo"
                        className="form-control d-none"
                        type="file"
                        id="file"
                      />
                      <label className="btn btn-dark px-4 my-3" htmlFor="file">
                        Uplode Images Avatar
                      </label>
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
                      className="btn btn-success  mx-2"
                      style={{ width: "200px" }}
                    >
                      Update User
                    </button>

                    <button className="btn btn-danger px-4 mx-2">Back</button>
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
                        <img
                          src={`https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y`}
                          className="user-img rounded-circle"
                          alt={"user-profile"}
                          style={{ width: "250px", height: "250px" }}
                        />
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
              
            </div>
          </div>
        </div>
      </div>
    </GlobalAnimation>
  );
};

export default AdminProfile;
