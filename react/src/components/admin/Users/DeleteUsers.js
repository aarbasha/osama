import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { toastSuccess } from "../../../Global/ToastContainer";
import { allusers, deleteUser } from "../../../app/toolkit/UsersSlice";

const DeleteUsers = (props) => {
  const [show, setShow] = useState(false);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { message, current_page } = useSelector((state) => state.categories);

  const handleYes = () => {
    setLoading(true);
    dispatch(deleteUser(props.id));
    setTimeout(() => {
      dispatch(allusers());
      //toastSuccess("success delete ");
      setShow(!show);
      setLoading(false);
    }, 500);
  };

  const handleNo = () => {
    setShow(!show);
  };

  return (
    <>
      <span className="" onClick={handleNo}>
        <i className="bi border-none btn btn-outline-danger bi-trash-fill" />
      </span>

      <Modal
        show={show}
        onHide={handleNo}
        //size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {Loading ? (
              <Spinner
                size="lg"
                className="mx-3"
                animation="border"
                variant="danger"
              />
            ) : (
              <>Delete User</>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className=" h3">
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <img
                src={
                  props.avatar === "null"
                    ? `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y`
                    : "http://127.0.0.1:8000/photo/" + props.avatar
                }
                className="rounded-circle"
                width={100}
                height={100}
                alt="test"
              />
            </div>
            <div className="col-12 d-flex justify-content-center  mt-3">
              {props.roles === 0 ? (
                <span className="bg-dark text-white p-1 mx-1"> Manger</span>
              ) : props.roles === 1 ? (
                <span className="bg-danger text-white p-1 mx-1"> Admin </span>
              ) : props.roles === 2 ? (
                <span className="bg-primary text-white p-1 mx-1">User </span>
              ) : null}
            </div>
            <div className="col-12 d-flex justify-content-center  mt-3">
              Deleted : <span className="text-danger mx-1">{props.name}</span>?
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

export default DeleteUsers;
