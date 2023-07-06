import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { toastSuccess } from "../../../Global/ToastContainer";
import {
  all_Orders,
  delete_Orders,
  create_tasks,
} from "../../../app/toolkit/OrdersSlice";

const ShowOrder = (props) => {
  const [show, setShow] = useState(false);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [inputs, setInputs] = useState("");

  const handleAccept = async () => {
    setLoading(true);
    await dispatch(create_tasks({ id: props.id, auther: user.username }));
    await dispatch(delete_Orders(props.id));
    setTimeout(() => {
      toastSuccess("success delete ");
      dispatch(all_Orders());
      setShow(!show);
      setLoading(false);
    }, 2000);
  };

  const handleClose = async () => {
    setShow(!show);
  };

  const handleRejected = async () => {
    setLoading(true);
    await dispatch(delete_Orders(props.id));
    setTimeout(() => {
      dispatch(all_Orders());
      toastSuccess("success delete ");
      setShow(!show);
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <div className="">
        <div
          className="bi border-none btn-block btn btn-info  "
          onClick={handleClose}
        >
          <i className="bi bi-eye-fill px-5" />
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="bg-info text-white text-center">
          <Modal.Title>
            {Loading ? (
              <Spinner
                size="lg"
                className="mx-3"
                animation="border"
                variant="dark"
              />
            ) : (
              <div className="d-flex justify-content-center">
                Show Order info
              </div>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className=" h3">
          <form encType="multipart/form-data">
            <div className="row">
              <div className="col-3 my-2">
                <label className="form-label"> Full Name </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Full name for task "
                  name="fullname"
                  disabled
                  value={props.fullname}
                />
              </div>

              <div className="col-3 my-2">
                <label className="form-label"> Email </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email for  task"
                  name="email"
                  disabled
                  value={props.email}
                />
              </div>

              <input
                className="d-none"
                hidden
                name="auther"
                value={user.username}
                onChange={(e) => setInputs(e.target.value)}
              />

              <div className="col-3 my-2">
                <label className="form-label">Mobile Phoen </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Product Serial Number"
                  name="mobile"
                  disabled
                  value={props.mobile}
                />
              </div>

              <div className="mb-3 col-3 my-2">
                <label className="form-label">delivery_time</label>
                <input
                  type="text"
                  name="delivery_time"
                  className="form-control"
                  disabled
                  value={props.created_at}
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
                  disabled
                  value={props.body}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button
            className="mx-4 px-5"
            variant="danger"
            onClick={handleRejected}
          >
            Rejected
          </Button>

          <Button className="mx-4 px-5" variant="primary" onClick={handleClose}>
            close
          </Button>

          <Button
            className="mx-4 px-5"
            variant="success"
            onClick={handleAccept}
          >
            Accept
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShowOrder;
