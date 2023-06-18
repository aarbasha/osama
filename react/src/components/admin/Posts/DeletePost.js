import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { toastSuccess } from "../../../Global/ToastContainer";
import { all_Posts, delete_Posts } from "../../../app/toolkit/PostSlice";
import { current_page } from "../../../app/toolkit/PostSlice";

const DeletePost = (props) => {
  const [show, setShow] = useState(false);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { current_page } = useSelector((state) => state.post);

  const handleYes = async () => {
    setLoading(true);
    await dispatch(delete_Posts(props.id));
  

    setTimeout(() => {
      dispatch(all_Posts(current_page));
      toastSuccess("success delete ");
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
              <>Delete Categories</>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className=" h3">
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <img
                src={"http://127.0.0.1:8000/cover/" + props.cover}
                className="rounded-circle"
                width={100}
                height={100}
                alt="test"
              />
            </div>
            <div className="col-12 d-flex justify-content-center  mt-3">
              Deleted : <span className="text-danger mx-1">{props.title}</span>?
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

export default DeletePost;
