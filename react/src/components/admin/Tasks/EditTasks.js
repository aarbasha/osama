import React, { useState, useEffect } from "react";
import FadeOutAnimation from "../../../Animation/FadeOutAnimation";
import { useDispatch, useSelector } from "react-redux";
import {
  Update_tasks,
  all_tasks,
  edit_task,
} from "../../../app/toolkit/TasksSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import Spinner from "react-bootstrap/esm/Spinner";
import { toastSuccess, Container } from "../../../Global/ToastContainer";

const EditTasks = () => {
  const { id } = useParams();
  const navgate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {task , status, errors } = useSelector((state) => state.tasks);

/*   const tasks = useSelector((state) => state.tasks.tasks);
  const task = tasks.find((task) => task.id === id); */

  const [loading, setLoading] = useState(false);
  const [loadingBTN, setLoadingBTN] = useState(false);
  const [inputs, setInputs] = useState({
    fullname: "",
    email: "",
    mobile: "",
    body: "",
    status: "",
    delivery_time: "",
  });

  useEffect(() => {
    setLoading(true);
    dispatch(edit_task(id));
    setTimeout(() => {
       setInputs(task);
      setLoading(false);
    }, 2000);
  }, []);

  const handelChangeInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handelSubmitForm = async (e) => {
    e.preventDefault();
    setLoadingBTN(true);
    console.log(inputs);
    /* const data = new FormData();
    data.append("fullname", inputs.fullname);
    data.append("email", inputs.email);
    data.append("mobile", inputs.mobile);
    data.append("body", inputs.body);
    data.append("status", inputs.status);
    data.append("delivery_time", inputs.delivery_time);
    */

    await dispatch(Update_tasks({ inputs, id }));

    setTimeout(() => {
      toastSuccess("update tasks");
      setTimeout(() => {
        if (status === 200) {
          navgate("/admin/tasks/all_tasks");
        } else {
          navgate(location.pathname);
        }
      }, 3000);
      setLoadingBTN(false);
    }, 2000);
  };

  return (
    <FadeOutAnimation>
      {Container()}
      <div className="card">
        <div className="card-body">
          <form onSubmit={handelSubmitForm} encType="multipart/form-data">
            <div className="row">
              <div className="col-6 my-2">
                <label className="form-label"> Full Name </label>
                {loading ? (
                  <Skeleton count={1} style={{ height: "35px" }} />
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Full name for task "
                    name="fullname"
                    onChange={handelChangeInputs}
                    value={inputs?.fullname}
                  />
                )}
                {errors ? <span>{errors.fullname}</span> : null}
              </div>

              <div className="col-6 my-2">
                <label className="form-label"> Email </label>
                {loading ? (
                  <Skeleton count={1} style={{ height: "35px" }} />
                ) : (
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email for  task"
                    name="email"
                    onChange={handelChangeInputs}
                    value={inputs?.email}
                  />
                )}

                {errors ? <span>{errors.email}</span> : null}
              </div>

              {/* ------------------------------------------------------------------ */}
              <input hidden type={"text"} name="auther" value={user.username} />
              {/* ------------------------------------------------------------------ */}

              <div className="col-6 my-2">
                <label className="form-label">Mobile Phoen </label>
                {loading ? (
                  <Skeleton count={1} style={{ height: "35px" }} />
                ) : (
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Product Serial Number"
                    name="mobile"
                    onChange={handelChangeInputs}
                    value={inputs?.mobile}
                  />
                )}

                {errors ? <span>{errors.mobile}</span> : null}
              </div>

              <div className="col-6 my-2">
                <label className="form-label">Status</label>
                {loading ? (
                  <Skeleton count={1} style={{ height: "35px" }} />
                ) : (
                  <select
                    className="form-select mb-3"
                    aria-label="Default select example"
                    name="status"
                    onChange={handelChangeInputs}
                    value={inputs?.status}
                  >
                    <option selected>Open this select menu</option>
                    <option value={"pending"}>Pending</option>
                    <option value={"in progress"}>in Progress</option>
                    <option value={"complete"}>Ccomplete</option>
                  </select>
                )}

                {errors ? <span>{errors.status}</span> : null}
              </div>

              <div className="mb-3">
                <label className="form-label">delivery_time</label>
                {loading ? (
                  <Skeleton count={1} style={{ height: "35px" }} />
                ) : (
                  <input
                    type="datetime-local"
                    name="delivery_time"
                    className="form-control"
                    onChange={handelChangeInputs}
                    value={inputs?.delivery_time}
                  />
                )}

                {errors ? <span>{errors.delivery_time}</span> : null}
              </div>
            </div>

            <div className="row">
              <div className="col-12 my-1">
                <label className="form-label">Full description</label>

                {loading ? (
                  <Skeleton count={1} style={{ height: "200px" }} />
                ) : (
                  <textarea
                    className="form-control"
                    placeholder="Full description"
                    rows={10}
                    cols={4}
                    name="body"
                    onChange={handelChangeInputs}
                    value={inputs?.body}
                  />
                )}
                {errors ? <span>{errors.body}</span> : null}
              </div>

              <div className="col-12 mt-3 mx-2 d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn  mx-2"
                  style={{ width: "200px", background: "rgb(0, 255, 165)" }}
                >
                  {loadingBTN ? (
                    <Spinner animation="border" variant="danger" size="sm" />
                  ) : (
                    <span> Update Task </span>
                  )}
                </button>

                <button
                  className="btn btn-danger px-4 mx-2"
                  style={{ width: "200px" }}
                >
                  Back
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </FadeOutAnimation>
  );
};

export default EditTasks;
