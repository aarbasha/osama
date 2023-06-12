import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FadeOutAnimation from "../../../Animation/FadeOutAnimation";
import { useDispatch, useSelector } from "react-redux";
import { allusers, editUser } from "../../../app/toolkit/UsersSlice";
import Skeleton from "react-loading-skeleton";
import DeleteUsers from "./DeleteUsers";

const Users = () => {
  const navgate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { users } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      dispatch(allusers());
      setLoading(false);
    }, 1000);
  }, []);

  // const [userChek  , setUserChek ] = useState(null)
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(allusers());
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, []); 

  const dispatchEdit = async (id) => {
    await dispatch(editUser(id));
    navgate(`/admin/users/edit_users/${id}`);
  };

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
            {loading ? (
              <Skeleton
                count={1}
                style={{
                  width: "100%",
                  height: "250px",
                  margin: "5px",
                }}
              />
            ) : (
              <>
                <div className={"table-responsive"}>
                  <table className="table align-middle mb-0">
                    <thead className="table-light">
                      <tr className="text-center">
                        <th>#ID</th>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Roles</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody className="">
                      {users &&
                        users.map((item) => (
                          <tr
                            className={
                              user.id === item.id
                                ? "text-center  bg-info"
                                : "text-center"
                            }
                            key={item.id}
                          >
                            <td>{item.id}</td>

                            <td>
                              <img
                                src={
                                  item.avatar === "null"
                                    ? `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y`
                                    : `http://localhost:8000/photo/${item.avatar}`
                                }
                                className="user-img rounded-circle"
                                alt={item.name}
                                width={40}
                                height={40}
                              />
                            </td>
                            <td>{item.name}</td>

                            <td>{item.username}</td>

                            <td>
                              <span className="text-primary p-2">
                                {item.email}
                              </span>
                            </td>
                            <td>{item.phone}</td>

                            <td>
                              {item.status == "1" ? (
                                <span className="bg-success rounded-50 p-2">
                                  Active
                                </span>
                              ) : item.status == "0" ? (
                                <span className="bg-danger p-2 text-white">
                                  Not Active
                                </span>
                              ) : null}
                            </td>
                            <td>
                              {item.roles == "2" ? (
                                <span className="bg-primary p-2 text-white">
                                  User
                                </span>
                              ) : item.roles == "1" ? (
                                <span className="bg-warning p-2">Admin</span>
                              ) : item.roles == "0" ? (
                                <span className="bg-dark p-2 text-white">
                                  Mangers
                                </span>
                              ) : null}
                            </td>

                            <td>
                              <div className="d-flex justify-content-around">
                                <Link
                                  to={"/admin/users/users_profiles/" + 4}
                                  className="text-primary btn"
                                >
                                  <i className="bi bi-eye-fill" />
                                </Link>
                                {/*     <Link
                                  to={"/admin/users/edit_users/" + 4}
                                  className="text-warning btn"
                                >
                                  <i className="bi bi-pencil-fill" />
                                </Link> */}

                                <button
                                  onClick={() => {
                                    dispatchEdit(item.id);
                                  }}
                                  className="text-warning btn"
                                >
                                  <i className="bi bi-pencil-fill" />
                                </button>

                                <DeleteUsers
                                  id={item.id}
                                  name={item.name}
                                  avatar={item.avatar}
                                  roles={item.roles}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
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
              </>
            )}
          </div>
        </div>
      </div>
    </FadeOutAnimation>
  );
};

export default Users;
