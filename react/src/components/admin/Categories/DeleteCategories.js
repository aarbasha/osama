import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  All_Categories,
  deleteCategorie,
} from "../../../app/toolkit/CategorieSlice";
import { toastInfo, toastSuccess } from "../../../Global/ToastContainer";
const DeleteCategories = (props) => {
  const [show, setShow] = useState(false);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.categories);

  const handleYes = () => {
    setLoading(true);
    dispatch(deleteCategorie(props.id));
    setTimeout(() => {
      dispatch(All_Categories());
      toastInfo("success delete ");
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
        size="lg"
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
        <Modal.Body className="text-center h3">
          Deleted <span className="text-danger">{props.name}</span> ??
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

export default DeleteCategories;
