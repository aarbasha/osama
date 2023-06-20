import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  all_Orders,
  delete_Orders,
  create_tasks,
} from "../../../app/toolkit/OrdersSlice";
import { toastSuccess } from "../../../Global/ToastContainer";

const AccpoetOrder = (props) => {
  const [show, setShow] = useState(false);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [inputs, setInputs] = useState("");
  const handleYes = async () => {
    setLoading(true);
    await dispatch(create_tasks({ id: props.id, auther: user.username }));
    await dispatch(delete_Orders(props.id));
    await dispatch(all_Orders());
    setTimeout(() => {
      toastSuccess("success delete ");
      setShow(!show);
      setLoading(false);
    }, 3000);
  };
  const handleNo = () => {
    setShow(!show);
  };
  return (
    <>
      <span className="bi border-none btn btn-success mx-2" onClick={handleNo}>
        Accept
      </span>

      <Modal
        show={show}
        onHide={handleNo}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="bg-success">
          <Modal.Title>
            {Loading ? (
              <Spinner
                size="lg"
                className="mx-3"
                animation="border"
                variant="dark"
              />
            ) : (
              <span className="text-white"> Create new Task </span>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className=" h3">
          <div className="row">
            <div className="col-12 my-2 d-flex justify-content-center">
              {props.fullname}
            </div>
            <div className="col-12 my-2  d-flex justify-content-center">
              {props.mobile}
            </div>
            <input
              className="d-none"
              hidden
              name="auther"
              value={user.username}
              onChange={(e) => setInputs(e.target.value)}
            />
            <div className="col-12 my-2  d-flex justify-content-center">
              {props.email}
            </div>
            <div className="col-12 my-2 d-flex justify-content-center ">
              Deleted : <span className="text-danger mx-1"> {props.id}</span>?
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button className="mx-4 px-5" variant="primary" onClick={handleNo}>
            No
          </Button>
          <Button className="mx-4 px-5" variant="success" onClick={handleYes}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AccpoetOrder;
