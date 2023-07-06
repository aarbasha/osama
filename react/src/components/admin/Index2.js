import React, { useState, useEffect } from "react";
import FadeOutAnimation from "../../Animation/FadeOutAnimation";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/esm/Spinner";
import { UserOnlineOffline, allusers } from "../../app/toolkit/UsersSlice";
import { setOnline } from "../../app/toolkit/AuthSlice";
import { Posts, all_Posts } from "../../app/toolkit/PostSlice";
import { Categories } from "../../app/toolkit/CategorieSlice";
import { all_tasks } from "../../app/toolkit/TasksSlice";
import { all_Orders } from "../../app/toolkit/OrdersSlice";
import { NavLink } from "react-router-dom";
const Index2 = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { isAuth } = useSelector((state) => state.auth);
  const { usersOnline, usersOffline, users } = useSelector(
    (state) => state.users
  );
  const { posts } = useSelector((state) => state.post);
  const { all_categories } = useSelector((state) => state.categories);
  const { orders } = useSelector((state) => state.orders);
  const { tasks } = useSelector((state) => state.tasks);

  useEffect(() => {
    // if (isAuth) {
    dispatch(UserOnlineOffline());
    dispatch(setOnline());
    dispatch(allusers());
    dispatch(Posts());
    dispatch(Categories());
    dispatch(all_Orders());
    dispatch(all_tasks());
    //}
  }, []);

  return (
    <FadeOutAnimation>
      <div>
        <div>
          {/*breadcrumb*/}
          <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
            <div className="breadcrumb-title pe-3">Dashboards</div>
            <div className="ps-3">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0 p-0">
                  <li className="breadcrumb-item">
                    <a href="#">
                      <i className="bx bx-home-alt" />
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    CMS Dashboard
                  </li>
                </ol>
              </nav>
            </div>
            <div className="ms-auto">
              <div className="btn-group">
                <button type="button" className="btn btn-primary">
                  Settings
                </button>
                <button
                  type="button"
                  className="btn btn-primary split-bg-primary dropdown-toggle dropdown-toggle-split"
                  data-bs-toggle="dropdown"
                >
                  {" "}
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <div className="dropdown-menu dropdown-menu-right dropdown-menu-lg-end">
                  {" "}
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                  <div className="dropdown-divider" />{" "}
                  <a className="dropdown-item" href="#">
                    Separated link
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/*end breadcrumb*/}
          <div className="row">
            <div className="col-12 col-lg-12 col-xl-6 d-flex">
              <div className="card radius-10 w-100">
                <div className="card-body">
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-xl-3 row-cols-xxl-3 g-3">
                    <div className="col">
                      <div className="card radius-10 bg-purple mb-0">
                        <NavLink
                          to={"/admin/categories/all_categories"}
                          className="card-body text-center"
                        >
                          <div className="widget-icon mx-auto mb-3 bg-white-1 text-white">
                            <i className="bi bi-tags-fill" />
                          </div>
                          <h3 className="text-white">
                            {all_categories?.length}
                          </h3>
                          <p className="mb-0 text-white">Categories</p>
                        </NavLink>
                      </div>
                    </div>

                    <div className="col">
                      <div className="card radius-10 bg-danger mb-0">
                        <NavLink
                          to={"/admin/posts/all_posts"}
                          className="card-body text-center"
                        >
                          <div className="widget-icon mx-auto mb-3 bg-white-1 text-white">
                            <i className="bi bi-hdd-fill" />
                          </div>
                          <h3 className="text-white">{posts?.length}</h3>
                          <p className="mb-0 text-white">Posts</p>
                        </NavLink>
                      </div>
                    </div>

                    <div className="col">
                      <div className="card radius-10 bg-success mb-0">
                        <NavLink
                          to={"/admin/Users/all_Users"}
                          className="card-body text-center"
                        >
                          <div className="widget-icon mx-auto mb-3 bg-white-1 text-white">
                            <i className="bi bi-people-fill" />
                          </div>
                          <h3 className="text-white">{users?.length}</h3>
                          <p className="mb-0 text-white">Users</p>
                        </NavLink>
                      </div>
                    </div>

                    <div className="col">
                      <div className="card radius-10 bg-tiffany mb-0">
                        <div className="card-body text-center">
                          <div className="widget-icon mx-auto mb-3 bg-white-1 text-white">
                            <i className="bi bi-file-earmark-break-fill" />
                          </div>
                          <h3 className="text-white">25</h3>
                          <p className="mb-0 text-white">Pages</p>
                        </div>
                      </div>
                    </div>

                    <div className="col">
                      <div className="card radius-10 bg-warning mb-0">
                        <NavLink
                          to={"/admin/tasks/all_tasks"}
                          className="card-body text-center"
                        >
                          <div className="widget-icon mx-auto mb-3 bg-white-1 text-white">
                            <i className="bi bi-file-earmark-check-fill" />
                          </div>
                          <h3 className="text-white">{tasks?.length}</h3>
                          <p className="mb-0 text-white">Tasks</p>
                        </NavLink>
                      </div>
                    </div>

                    <div className="col">
                      <div className="card radius-10 bg-dark mb-0">
                        <NavLink
                          to={"/admin/orders/all_orders"}
                          className="card-body text-center"
                        >
                          <div className="widget-icon mx-auto mb-3 bg-white-1 text-white">
                            <i className="bi bi-chat-left-quote-fill" />
                          </div>
                          <h3 className="text-white">
                            {orders?.length}
                            {orders?.length > 0 ? (
                              <Spinner
                                variant={"danger"}
                                animation={"grow"}
                                style={{
                                  position: "absolute",
                                  top: "10px",
                                  right: "10px",
                                }}
                              />
                            ) : null}
                          </h3>
                          <p className="mb-0 text-white">Orders</p>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-12 col-xl-6 d-flex">
              <div className="card radius-10 w-100">
                <div className="card-header bg-transparent">
                  <div className="row g-3 align-items-center">
                    <div className="col-12 p-3">
                      <h5 className="mb-0">User Status</h5>
                      <hr />

                      {isAuth ? (
                        <div className="d-flex my-2 flex-column">
                          {/*  <h3>Users Active </h3> */}
                          {usersOnline &&
                            usersOnline.map((item) => (
                              <div
                                key={item.id}
                                className=" my-2   d-flex justify-content-start "
                              >
                                <div className="mr-auto">
                                  <img
                                    className="card-img-top "
                                    src={
                                      item.avatar === "null"
                                        ? `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y`
                                        : `http://localhost:8000/photo/${item.avatar}`
                                    }
                                    alt="Card image cap"
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      margin: "0 auto",
                                      borderRadius: "50%",
                                    }}
                                  />
                                </div>

                                <div className="d-flex align-items-end">
                                  <div className="h5 mx-3"> {item.name}</div>

                                  <div className="ml-auto ">
                                    {item.is_online === 1 ? (
                                      <Spinner
                                        animation="grow"
                                        variant="success"
                                      />
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      ) : null}
                    </div>
                    <div className="col">
                      <div className="d-flex align-items-center justify-content-end gap-3 cursor-pointer">
                        <div className="dropdown">
                          <a
                            className="dropdown-toggle dropdown-toggle-nocaret"
                            href="#"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="bx bx-dots-horizontal-rounded font-22 text-option" />
                          </a>
                          <ul className="dropdown-menu">
                            <li>
                              <a className="dropdown-item" href="#">
                                Action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Another action
                              </a>
                            </li>
                            <li>
                              <hr className="dropdown-divider" />
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Something else here
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div id="chart1" />
                </div>
              </div>
            </div>
          </div>
          {/*end row*/}
          <div className="row">
            <div className="col-12 col-lg-12 col-xl-12 col-xxl-6 d-flex">
              <div className="card radius-10 w-100">
                <div className="card-header bg-transparent">
                  <div className="row g-3 align-items-center">
                    <div className="col">
                      <h5 className="mb-0">Statistics</h5>
                    </div>
                    <div className="col">
                      <div className="d-flex align-items-center justify-content-end gap-3 cursor-pointer">
                        <div className="dropdown">
                          <a
                            className="dropdown-toggle dropdown-toggle-nocaret"
                            href="#"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="bx bx-dots-horizontal-rounded font-22 text-option" />
                          </a>
                          <ul className="dropdown-menu">
                            <li>
                              <a className="dropdown-item" href="#">
                                Action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Another action
                              </a>
                            </li>
                            <li>
                              <hr className="dropdown-divider" />
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Something else here
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="d-lg-flex align-items-center justify-content-center gap-4">
                    <div id="chart3" />
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <i className="bi bi-circle-fill text-primary me-1" />{" "}
                        Visitors: <span className="me-1">89</span>
                      </li>
                      <li className="list-group-item">
                        <i className="bi bi-circle-fill text-danger me-1" />{" "}
                        Subscribers: <span className="me-1">45</span>
                      </li>
                      <li className="list-group-item">
                        <i className="bi bi-circle-fill text-success me-1" />{" "}
                        Contributor: <span className="me-1">35</span>
                      </li>
                      <li className="list-group-item">
                        <i className="bi bi-circle-fill text-orange me-1" />{" "}
                        Author: <span className="me-1">62</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-12 col-xl-12 col-xxl-6 d-flex">
              <div className="card radius-10 w-100">
                <div className="card-header bg-transparent">
                  <div className="row g-3 align-items-center">
                    <div className="col">
                      <h5 className="mb-0">Site Speed</h5>
                    </div>
                    <div className="col">
                      <div className="d-flex align-items-center justify-content-end gap-3 cursor-pointer">
                        <div className="dropdown">
                          <a
                            className="dropdown-toggle dropdown-toggle-nocaret"
                            href="#"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="bx bx-dots-horizontal-rounded font-22 text-option" />
                          </a>
                          <ul className="dropdown-menu">
                            <li>
                              <a className="dropdown-item" href="#">
                                Action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Another action
                              </a>
                            </li>
                            <li>
                              <hr className="dropdown-divider" />
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Something else here
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row align-items-center justify-content-center">
                    <div className="col-12 col-lg-6 col-xl-6">
                      <div id="chart4" />
                    </div>
                    <div className="col-12 col-lg-6 col-xl-6">
                      <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-2 g-3">
                        <div className="col">
                          <div className="card radius-10 mb-0 shadow-none bg-light-purple">
                            <div className="card-body p-4">
                              <div className="text-center">
                                <h5 className="mb-0 text-purple">75</h5>
                                <p className="mb-0 text-purple">Grade</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <div className="card radius-10 mb-0 shadow-none bg-light-orange">
                            <div className="card-body p-4">
                              <div className="text-center">
                                <h5 className="mb-0 text-orange">1.9mb</h5>
                                <p className="mb-0 text-orange">Page Size</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <div className="card radius-10 mb-0 shadow-none bg-light-success">
                            <div className="card-body p-4">
                              <div className="text-center">
                                <h5 className="mb-0 text-success">634 mc</h5>
                                <p className="mb-0 text-success">Load Time</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <div className="card radius-10 mb-0 shadow-none bg-light-primary">
                            <div className="card-body p-4">
                              <div className="text-center">
                                <h5 className="mb-0 text-primary">48</h5>
                                <p className="mb-0 text-primary">Requests</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*end row*/}
          <div className="row">
            <div className="col-12 col-lg-12 col-xl-6 d-flex">
              <div className="card radius-10 w-100">
                <div className="card-header bg-transparent p-3">
                  <div className="row row-cols-1 row-cols-lg-2 g-3 align-items-center">
                    <div className="col">
                      <h5 className="mb-0">Posts vs Comments</h5>
                    </div>
                    <div className="col">
                      <div className="d-flex align-items-center justify-content-sm-end gap-3 cursor-pointer">
                        <div className="font-13">
                          <i className="bi bi-circle-fill text-info" />
                          <span className="ms-2">Posts</span>
                        </div>
                        <div className="font-13">
                          <i className="bi bi-circle-fill text-orange" />
                          <span className="ms-2">Comments</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div id="chart5" />
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-12 col-xl-6 d-flex">
              <div className="card radius-10 w-100">
                <div className="card-header bg-transparent">
                  <div className="row g-3 align-items-center">
                    <div className="col">
                      <h5 className="mb-0">Statistics</h5>
                    </div>
                    <div className="col">
                      <div className="d-flex align-items-center justify-content-end gap-3 cursor-pointer">
                        <div className="dropdown">
                          <a
                            className="dropdown-toggle dropdown-toggle-nocaret"
                            href="#"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="bx bx-dots-horizontal-rounded font-22 text-option" />
                          </a>
                          <ul className="dropdown-menu">
                            <li>
                              <a className="dropdown-item" href="#">
                                Action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Another action
                              </a>
                            </li>
                            <li>
                              <hr className="dropdown-divider" />
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Something else here
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div id="chart2" />
                </div>
              </div>
            </div>
          </div>
          {/*end row*/}
        </div>
      </div>
    </FadeOutAnimation>
  );
};

export default Index2;
