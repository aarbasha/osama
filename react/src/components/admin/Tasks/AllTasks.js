import React, { useEffect, useState } from "react";
import FadeOutAnimation from "../../../Animation/FadeOutAnimation";
import { all_tasks, edit_task } from "../../../app/toolkit/TasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { TimeDay } from "../../../Global/Time";
import Skeleton from "react-loading-skeleton";
import Spinner from "react-bootstrap/esm/Spinner";
import DeleteTasks from "./DeleteTasks";

const AllTasks = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navgate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const { tasks } = useSelector((state) => state.tasks);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      dispatch(all_tasks());

      setLoading(false);
    }, 2000);
  }, [dispatch]);

  const dispatchEditTask = async (id) => {
    await dispatch(edit_task(id));
    navgate(`/admin/tasks/edit_tasks/${id}`);
  };

 /*  const dispatchShowTask = (id) => {
    navgate(`/admin/tasks/show_tasks/${id}`);
  }; */

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
              <Skeleton count={16} />
            ) : (
              <div className={"table-responsive"}>
                <table className="table align-middle mb-0">
                  <thead className="table-light">
                    <tr className="text-center">
                      <th>#ID</th>
                      <th>Full Name</th>
                      <th>Mobile</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>delivery time</th>
                      <th>created_at</th>
                      <th>Accept by :</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {tasks &&
                      tasks?.map((task) => (
                        <tr key={task.id}>
                          <td> {task.id}</td>
                          <td>{task.fullname}</td>
                          <td>{task.mobile}</td>
                          <td className="text-primary">{task.email}</td>
                          <td>
                            {task.status == "pending" ? (
                              <span className="bg-warning rounded-pill p-2">
                                pending
                              </span>
                            ) : task.status == "in progress" ? (
                              <span className="bg-info rounded-pill p-2">
                                in progress
                              </span>
                            ) : task.status == "complete" ? (
                              <span className="bg-success rounded-pill p-2">
                                complete
                              </span>
                            ) : null}
                          </td>
                          <td>{TimeDay(task.delivery_time)}</td>
                          <td>{TimeDay(task.created_at)}</td>
                          <td>
                            <span className="bg-primary text-white p-2">
                              {task.auther}
                            </span>
                          </td>

                          <td>
                            <div className="d-flex align-items-center gap-3 fs-6">
                              {/* <button
                                className="text-primary btn"
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                                data-bs-original-title="View detail"
                                aria-label="Views"
                                onClick={() => dispatchShowTask(task.id)}
                              >
                                <i className="bi bi-eye-fill" />
                              </button> */}
                              <button
                                className="btn-outline-info btn"
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                                data-bs-original-title="Edit info"
                                aria-label="Edit"
                                onClick={() => dispatchEditTask(task.id)}
                              >
                                <i className="bi bi-pencil-fill" />
                              </button>

                              <DeleteTasks
                                id={task.id}
                                fullname={task.fullname}
                                email={task.email}
                                mobile={task.mobile}
                                data={task.created_at}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
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

export default AllTasks;
