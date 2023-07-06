import React, { useState } from "react";
import FadeOutAnimation from "../../../Animation/FadeOutAnimation";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import { TaskAdd } from "../../../app/toolkit/TasksSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { toastSuccess, Container } from "../../../Global/ToastContainer";

const AddTasks = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navgate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { status } = useSelector((state) => state.tasks);

  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    fullname: "",
    email: "",
    mobile: "",
    body: "",
    status: "",
    delivery_time: "",
    auther: user.username,
  });

  const handelChangeInputs = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handelSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(TaskAdd(inputs));
 
    setTimeout(() => {
      setLoading(false);
      toastSuccess("success add task ...");
      setTimeout(() => {
        navgate("/admin/tasks/all_tasks");
      }, 2000);
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
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Full name for task "
                  name="fullname"
                  onChange={handelChangeInputs}
                  value={inputs.fullname}
                />
              </div>

              <div className="col-6 my-2">
                <label className="form-label"> Email </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email for  task"
                  name="email"
                  onChange={handelChangeInputs}
                  value={inputs.email}
                />
              </div>

              {/* ------------------------------------------------------------------ */}
              <input
                hidden
                type={"text"}
                onChange={handelChangeInputs}
                name="auther"
                value={user.username}
              />
              {/* ------------------------------------------------------------------ */}

              <div className="col-6 my-2">
                <label className="form-label">Mobile Phoen </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Product Serial Number"
                  name="mobile"
                  onChange={handelChangeInputs}
                  value={inputs.mobile}
                />
              </div>

              <div className="col-6 my-2">
                <label className="form-label">Status</label>
                <select
                  className="form-select mb-3"
                  aria-label="Default select example"
                  name="status"
                  onChange={handelChangeInputs}
                  value={inputs.status}
                >
                  <option selected>Open this select menu</option>
                  <option value={"pending"}>Pending</option>
                  <option value={"in progress"}>in Progress</option>
                  <option value={"complete"}>Ccomplete</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">delivery_time</label>
                <input
                  type="datetime-local"
                  name="delivery_time"
                  className="form-control"
                  onChange={handelChangeInputs}
                  value={inputs.delivery_time}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12 my-1">
                <label className="form-label">Full description</label>
                <textarea
                  className="form-control"
                  placeholder="Full description"
                  rows={10}
                  cols={4}
                  name="body"
                  onChange={handelChangeInputs}
                  value={inputs.body}
                />
              </div>

              <div className="col-12 mt-3 mx-2 d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn  mx-2"
                  style={{ width: "200px", background: "rgb(255, 255, 0)" }}
                >
                  {loading ? (
                    <Spinner animation="border" size="sm" variant="success" />
                  ) : (
                    <span> Save Task </span>
                  )}
                </button>

                <button
                  className="btn btn-danger px-4 mx-2"
                  style={{ width: "200px" }}
                  disabled={loading}
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

export default AddTasks;
