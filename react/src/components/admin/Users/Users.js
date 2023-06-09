import React from "react";
import { Link } from "react-router-dom";
import FadeOutAnimation from "../../../Animation/FadeOutAnimation";

const Users = () => {
  return (
    <FadeOutAnimation>
      <div className="card">
        <div className="card-header py-3">
          <div className="row g-3">
            <div className="col-lg-3 col-md-6 me-auto">
              <div className="ms-auto position-relative">
                <div className="position-absolute top-50 translate-middle-y search-icon px-3">
                  <i className="bi bi-search" />
                </div>
                <input
                  className="form-control ps-5"
                  type="text"
                  placeholder="Search Payment"
                />
              </div>
            </div>

            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Users</option>
                <option>Admins</option>
                <option>Mangers</option>
              </select>
            </div>

            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Status</option>
                <option>Active</option>
                <option>Disabled</option>
                <option>Pending</option>
                <option>Show All</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Show 10</option>
                <option>Show 30</option>
                <option>Show 50</option>
              </select>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div>
            <div className={"table-responsive"}>
              <table className="table align-middle mb-0">
                <thead className="table-light">
                  <tr className="text-center">
                    <th>#ID</th>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>username</th>
                    <th>Email</th>
                    <th>phone</th>
                    <th>status</th>
                    <th>roles</th>

                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="text-center">
                    <td>4</td>
                    <td>
                      <img
                        src={`https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y`}
                        className="user-img rounded-circle"
                        alt={"username"}
                        width={40}
                        height={40}
                      />
                    </td>
                    <td>xxxxxx</td>

                    <td>xxxxxxxxx</td>

                    <td>
                      <span className="text-primary p-2">xxxxxx</span>
                    </td>
                    <td>5455566</td>
                    <td>Mangers</td>

                    <td>active</td>

                    <td>
                      <div className="d-flex justify-content-around">
                        <Link
                          to={"/admin/users/users_profiles/" + 4}
                          className="text-primary btn"
                        >
                          <i className="bi bi-eye-fill" />
                        </Link>
                        <Link
                          to={"/admin/users/edit_users/" + 4}
                          className="text-warning btn"
                        >
                          <i className="bi bi-pencil-fill" />
                        </Link>

                        <a className="text-danger btn">
                          <i className="bi bi-trash-fill" />
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <nav className={"float-end mt-3"}>
              <ul className="pagination">
                <li className="page-item disabled">
                  <a className="page-link" href="#">
                    Previous
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </FadeOutAnimation>
  );
};

export default Users;
