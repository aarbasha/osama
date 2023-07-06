import React, { useEffect, useState } from "react";
import FadeOutAnimation from "../../../Animation/FadeOutAnimation";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  all_Orders,
  create_tasks,
  delete_Orders,
} from "../../../app/toolkit/OrdersSlice";
import { TimeDay } from "../../../Global/Time";
import Skeleton from "react-loading-skeleton";
import DeleteOrder from "./DeleteOrder";
import { Container } from "../../../Global/ToastContainer";
import Spinner from "react-bootstrap/esm/Spinner";
import AccpoetOrder from "./AccpoetOrder";
import ShowOrder from "./ShowOrder";

const AllOrder = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navgate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const { orders, createBtnTasks } = useSelector((state) => state.orders);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      dispatch(all_Orders());
      setLoading(false);
    }, 2000);
  }, [dispatch]);

  return (
    <FadeOutAnimation>
      {Container()}
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
              {loading ? (
                <Skeleton count={16} />
              ) : orders?.length === 0 ? (
                <h2 className="text-center my-4">
                  Not found any orders .....{" "}
                </h2>
              ) : (
                <>
                  <table className="table align-middle mb-0">
                    <thead className="table-light">
                      <tr className="text-center">
                        <th>#ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Mobile Phone</th>
                        <th>Data at</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders?.length > 0
                        ? orders.map((order) => (
                            <tr className="text-center" key={order.id}>
                              <td> {order.id}</td>
                              <td>{order.fullname}</td>

                              <td className="nav-item">{order.email}</td>

                              <td>{order.mobile}</td>
                              <td>{TimeDay(order.created_at)}</td>

                              <td>
                                <div className=" gap-3 fs-6 ">
                                  {/* <AccpoetOrder
                                    id={order.id}
                                    fullname={order.fullname}
                                    email={order.email}
                                    mobile={order.mobile}
                                    data={order.created_at}
                                  />

                                  <DeleteOrder
                                    id={order.id}
                                    fullname={order.fullname}
                                    email={order.email}
                                    mobile={order.mobile}
                                    data={order.created_at}
                                  /> */}

                                  <ShowOrder
                                    id={order.id}
                                    fullname={order.fullname}
                                    email={order.email}
                                    mobile={order.mobile}
                                    data={order.created_at}
                                    body={order.body}
                                  />
                                </div>
                              </td>
                            </tr>
                          ))
                        : null}
                    </tbody>
                  </table>
                </>
              )}
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

export default AllOrder;
