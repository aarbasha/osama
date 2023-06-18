import React, { useState, useEffect } from "react";
import FadeOutAnimation from "../../../Animation/FadeOutAnimation";
import { useDispatch, useSelector } from "react-redux";
import { add_Categories } from "../../../app/toolkit/CategorieSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../../Global/ToastContainer";
import Spinner from "react-bootstrap/Spinner";

const AddCategories = () => {
  const dispatch = useDispatch();
  const rediract = useNavigate();
  const location = useLocation();
  const { status } = useSelector((state) => state.categories);
  const { message } = useSelector((state) => state.categories);
  const { error } = useSelector((state) => state.categories);
  const { user } = useSelector((state) => state.auth);

  const [inputs, setInputs] = useState({
    name: "",
    name_folder: "",
    info: "",
    auther: "",
  });
  const [cover, setCover] = useState([]);
  const [coverPreview, setCoverPreview] = useState(null);
  const [ErrorMessage, setErrorMessage] = useState({});
  const [loading, setLoading] = useState(false);

  const handelChangeInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handelChangeCover = (e) => {
    setCover({ cover: e.target.files[0] });
    setCoverPreview(URL.createObjectURL(e.target.files[0]));
  };

  const RemoveCover = (e) => {
    e.preventDefault();
    setCover([]);
    setCoverPreview(null);
  };

  const add_categories = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", inputs.name);
    data.append("name_folder", inputs.name_folder);
    data.append("info", inputs.info);
    data.append("auther", user.username);
    data.append("cover", cover.cover);

    await dispatch(add_Categories(data));
    setLoading(true);
    setTimeout(() => {
      if (status === 200) {
        toastSuccess("success add categories");
        rediract("/admin/categories/all_categories");
      } else {
        toastError("Error");
        rediract(location.pathname);
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
                  onSubmit={add_categories}
                  className="row g-3"
                  encType="multipart/form-data"
                >
                  <div className="row">
                    <div className="col-12 my-2">
                      <label className="form-label"> Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Name"
                        name="name"
                        onChange={handelChangeInputs}
                        value={inputs.name}
                      />
                    </div>

                    {ErrorMessage ? (
                      <p className="text-danger ">{ErrorMessage.name}</p>
                    ) : null}

                    <div className="col-12 my-2">
                      <label className="form-label">
                        Name folder Images Prodacts
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Name"
                        name="name_folder"
                        onChange={handelChangeInputs}
                        value={inputs.name_folder}
                      />
                    </div>

                    {error ? (
                      <p className="text-danger ">{error.name_folder}</p>
                    ) : null}

                    {/* enter input auther */}

                    <input
                      type="text"
                      hidden
                      className="form-control"
                      name="auther"
                      onChange={handelChangeInputs}
                      value={user.username}
                    />

                    <div className="col-12 my-2">
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

                      {error ? (
                        <p
                          className="text-danger float-right "
                          style={{ position: "absolute" }}
                        >
                          {error.cover}
                        </p>
                      ) : null}

                      {coverPreview !== null ? (
                        <img
                          src={coverPreview}
                          className="mx-5 rounded-circle shadow"
                          width={75}
                          height={75}
                          alt="test"
                        />
                      ) : null}
                    </div>

                    <div className="col-12 my-2">
                      <label className="form-label">Full description</label>
                      <textarea
                        className="form-control"
                        placeholder="Full description"
                        rows={5}
                        cols={4}
                        onChange={handelChangeInputs}
                        name="info"
                        value={inputs.info}
                      />
                    </div>

                    <div className="col-6 my-2"></div>
                  </div>

                  {error ? <p className="text-danger ">{error.info}</p> : null}

                  <div className="col-12">
                    <button type="submit" className="btn btn-dark px-4 mx-2">
                      {loading ? (
                        <Spinner
                          size="sm"
                          className="mx-3"
                          animation="border"
                          variant="white"
                        />
                      ) : (
                        <> Add Categories</>
                      )}
                    </button>

                    <button className="btn btn-danger px-4 mx-2">Back</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="col-12 col-lg-4">
          <div className="card shadow-sm border-0 overflow-hidden">
            <div className="card-body">
              <div className="profile-avatar text-center">
                <img
                  src={""}
                  className="rounded-circle shadow"
                  width={200}
                  height={200}
                  alt="test"
                />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </FadeOutAnimation>
  );
};

export default AddCategories;
