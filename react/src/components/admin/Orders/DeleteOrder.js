import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { all_Orders, delete_Orders } from "../../../app/toolkit/OrdersSlice";
import { toastSuccess } from "../../../Global/ToastContainer";

const DeleteOrder = (props) => {
  const [show, setShow] = useState(false);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleYes = async () => {
    setLoading(true);

    setTimeout(() => {
      dispatch(delete_Orders(props.id));
      dispatch(all_Orders());
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
      <span className="bi border-none btn btn-danger" onClick={handleNo}>
        Rejected
      </span>

      <Modal
        show={show}
        onHide={handleNo}
        //size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="bg-danger text-white text-center">
          <Modal.Title>
            {Loading ? (
              <Spinner
                size="lg"
                className="mx-3"
                animation="border"
                variant="dark"
              />
            ) : (
              <>Delete Orders</>
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
          <Button className="mx-4 px-5" variant="danger" onClick={handleYes}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteOrder;
