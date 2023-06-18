import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import FadeOutAnimation from "../../../Animation/FadeOutAnimation";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { profile } from "../../../app/toolkit/AuthSlice";
import { UserOnlineOffline } from "../../../app/toolkit/UsersSlice";
import {Time} from "../../../Global/Time";
import moment from "moment";
import Spinner from "react-bootstrap/esm/Spinner";

const Users_online = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { isAuth } = useSelector((state) => state.auth);
  const { usersOnline, usersOffline } = useSelector((state) => state.users);

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
                <div className="row d-flex">
                  {usersOnline &&
                    usersOnline.map((item) => (
                      <div
                        className="card  mx-5 col-4 "
                        style={{ width: "300px", height: "400px" }}
                        key={item.id}
                      >
                        <img
                          className="card-img-top"
                          src={
                            item.avatar === "null"
                              ? `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y`
                              : `http://localhost:8000/photo/${item.avatar}`
                          }
                          alt="Card image cap"
                          style={{
                            width: "100px",
                            height: "100px",
                            margin: "0 auto",
                            borderRadius: "50%",
                          }}
                        />
                        <div className="card-body  text-center">
                          <h5 className="card-title">{item.name}</h5>
                          <p className="card-text">
                            {moment.unix(Time(item.last_seen_at)).fromNow()}
                          </p>
                          <p>
                            {item.status == "1" ? (
                              <span className="bg-success rounded-50 p-2">
                                Active
                              </span>
                            ) : item.status == "0" ? (
                              <span className="bg-danger p-2 text-white">
                                Not Active
                              </span>
                            ) : null}
                          </p>
                          <p>
                            {item.is_online === 1 ? (
                              <Spinner animation="grow" variant="success" />
                            ) : null}
                          </p>
                          <p>
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
                          </p>
                        </div>
                      </div>
                    ))}
                </div>

               
              </>
            )}

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

export default Users_online;
