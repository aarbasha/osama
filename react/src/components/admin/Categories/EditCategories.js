import React, { useState, useEffect } from "react";
import FadeOutAnimation from "../../../Animation/FadeOutAnimation";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  All_Categories,
  Categories,
  editCategories,
  updateCategories,
} from "../../../app/toolkit/CategorieSlice";
import Spinner from "react-bootstrap/Spinner";
import { toastError, toastSuccess } from "../../../Global/ToastContainer";
import Skeleton from "react-loading-skeleton";

const EditCategories = () => {
  const { id } = useParams();
  const rediract = useNavigate();
  const Location = useLocation();
  const dispatch = useDispatch();
  const { all_categories, old_categories, error, status, current_page } =
    useSelector((state) => state.categories);
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [loadingInput, setLoadingInput] = useState(false);
  const [cover, setCover] = useState([]);
  const [coverPreview, setCoverPreview] = useState(null);
  const [Errors, setErrors] = useState({});
  const [inputs, setInputs] = useState({
    name: "",
    name_folder: "",
    info: "",
    auther: "",
    parent_id: "",
  });
  useEffect(() => {
    setLoadingInput(true);
    dispatch(editCategories(id));
    dispatch(All_Categories(current_page));
    setTimeout(() => {
      setInputs(old_categories);
      setLoadingInput(false);
    }, 1000);
    setErrors(error);
  }, []);

  const handelChangeInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handelChangeCover = (e) => {
    setCover({ cover: e.target.files[0] });
    if (e.target.files[0]) {
      setCoverPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const RemoveCover = (e) => {
    e.preventDefault();
    setCover([]);
    setCoverPreview(null);
  };

  const UpdateCategories = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", inputs.name);
    data.append("name_folder", inputs.name_folder);
    data.append("info", inputs.info);
    data.append("auther", user.username);
    data.append("cover", cover.cover);
    if (old_categories.parent_id !== null) {
      data.append("parent_id", inputs.parent_id);
    }

    await dispatch(updateCategories({ data: data, id: id }));
    setLoading(true);
    setTimeout(() => {
      if (status === 200) {
        toastSuccess("success update");
        rediract("/admin/categories/all_categories");
      } else {
        toastError("error update ");
        rediract(Location.pathname);
      }
      setLoading(false);
    }, 2000);
  };
  return (
    <FadeOutAnimation>
      <div className="row">
        <div className="col-12 col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="">
                <form
                  onSubmit={UpdateCategories}
                  enctype="multipart/form-data"
                  className="row g-3"
                >
                  <div className="row">
                    <div className="col-12 my-2">
                      <label className="form-label"> Name</label>
                      {loadingInput ? (
                        <Skeleton count={1} style={{ height: "35px" }} />
                      ) : (
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Name"
                          name="name"
                          onChange={handelChangeInputs}
                          value={inputs.name}
                          required
                        />
                      )}

                      {Errors ? (
                        <p className="text-danger h6 my-2">Errors.name</p>
                      ) : null}
                    </div>

                    <div className="col-6 my-2">
                      <label className="form-label">
                        Name folder Images Prodacts
                      </label>
                      {loadingInput ? (
                        <Skeleton count={1} style={{ height: "35px" }} />
                      ) : (
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Name"
                          name="name_folder"
                          onChange={handelChangeInputs}
                          value={inputs.name_folder}
                          required
                        />
                      )}

                      {Errors ? (
                        <p className="text-danger h6 my-2">
                          Errors.name_folder
                        </p>
                      ) : null}
                    </div>

                    {/* enter input auther */}

                    <div className="col-6 my-2">
                      <label className="form-label">
                        Selected Primary Categories
                      </label>

                      {loadingInput ? (
                        <Skeleton count={1} style={{ height: "35px" }} />
                      ) : (
                        <select
                          className="form-select mb-3"
                          aria-label="Default select example"
                          onChange={handelChangeInputs}
                          name="parent_id"
                          value={inputs.parent_id}
                          required

                          //disabled={old_categories.parent_id == null}
                        >
                          <option defaultValue={null}>
                            Open this select menu
                          </option>

                          {all_categories ? (
                            all_categories.map((item) => (
                              <option
                                className=""
                                key={item.id}
                                value={item.id}
                              >
                                {item.name}
                              </option>
                            ))
                          ) : (
                            <option
                              defaultChecked
                              disabled={all_categories.length === 0}
                            >
                              Go To Add Primary Categories
                            </option>
                          )}
                        </select>
                      )}
                    </div>

                    <div className="col-12 d-none">
                      <input
                        type="text"
                        hidden
                        className="form-control"
                        name="auther"
                        onChange={handelChangeInputs}
                        value={user.username}
                      />
                    </div>

                    <div className="col-8 my-2">
                      <input
                        className="form-control d-none"
                        type="file"
                        id="file"
                        name="cover"
                        onChange={handelChangeCover}
                      />
                      <label
                        className="form-label my-2 btn btn-secondary"
                        htmlFor="file"
                      >
                        Cover Tha Categorie + <i className="bi bi-image mx-3" />
                      </label>

                      <button
                        onClick={RemoveCover}
                        disabled={coverPreview === null}
                        className="btn btn-primary mx-3"
                      >
                        Remove image
                      </button>

                      {Errors ? (
                        <p className="text-danger h6 my-2">Errors.cover</p>
                      ) : null}
                    </div>

                    <div className="col-4">
                      {loadingInput ? (
                        <Skeleton
                          circle={true}
                          style={{ width: "75px", height: "75px" }}
                          className="mx-5 rounded-circle shadow"
                        />
                      ) : coverPreview !== null ? (
                        <>
                          <img
                            src={coverPreview}
                            className="mx-5 rounded-circle shadow"
                            width={75}
                            height={75}
                            alt="test"
                          />
                        </>
                      ) : (
                        <>
                          <img
                            src={`http://localhost:8000/cover/${inputs.cover}`}
                            className="mx-5 rounded-circle shadow"
                            width={75}
                            height={75}
                            alt="test"
                          />
                        </>
                      )}
                    </div>

                    <div className="col-12 my-2">
                      <label className="form-label">Full description</label>
                      {loadingInput ? (
                        <Skeleton count={1} style={{ height: "120px" }} />
                      ) : (
                        <textarea
                          className="form-control"
                          placeholder="Full description"
                          rows={5}
                          cols={4}
                          onChange={handelChangeInputs}
                          name="info"
                          value={inputs.info}
                        />
                      )}

                      {Errors ? (
                        <p className="text-danger h6 my-2">Errors.info</p>
                      ) : null}
                    </div>

                    <div className="col-6 my-2"></div>
                  </div>

                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-info px-4 mx-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        <>Update Categories</>
                      )}
                    </button>

                    <button
                      onClick={() => rediract(-1)}
                      className="btn btn-danger px-4 mx-2"
                    >
                      Back
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeOutAnimation>
  );
};

export default EditCategories;
