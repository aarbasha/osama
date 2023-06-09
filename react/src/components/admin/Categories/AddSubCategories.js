import React, { useState, useEffect } from "react";
import FadeOutAnimation from "../../../Animation/FadeOutAnimation";
import { useDispatch, useSelector } from "react-redux";
import {
  Categories,
  add_subCategories,
} from "../../../app/toolkit/CategorieSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../../Global/ToastContainer";

const AddSubCategories = () => {
  const dispatch = useDispatch();
  const rediract = useNavigate();
  const location = useLocation();
  const { success } = useSelector((state) => state.categories);
  const { all_categories } = useSelector((state) => state.categories);
  const { message } = useSelector((state) => state.categories);
  const { status } = useSelector((state) => state.categories);
  const { error } = useSelector((state) => state.categories);
  const { user } = useSelector((state) => state.auth);

  console.log(status);
  const [Errors, setErrors] = useState(null);
  const [inputs, setInputs] = useState({
    name: "",
    name_folder: "",
    info: "",
    auther: "",
    parent_id: "",
  });
  const [cover, setCover] = useState([]);
  const [coverPreview, setCoverPreview] = useState(null);
  const handelChangeInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    if (e.target.value) {
      setErrors(null);
    }
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

  const add_subcategories = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", inputs.name);
    data.append("name_folder", inputs.name_folder);
    data.append("info", inputs.info);
    data.append("auther", user.username);
    data.append("parent_id", inputs.parent_id);
    data.append("cover", cover.cover);

    dispatch(add_subCategories(data));
    setErrors(error);
    console.log(error);
    if (status !== "filed") {
      toastSuccess(message);
      //rediract("/admin/categories/all_categories");
    } else {
    
      toastError("error add categores");
    }
  };

  return (
    <FadeOutAnimation>
      <div className="row">
        <div className="col-12 col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="">
                <form onSubmit={add_subcategories} enctype="multipart/form-data" className="row g-3">
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
                        required
                      />

                      {Errors ? (
                        <p className="text-danger h6 my-2">Errors.name</p>
                      ) : null}
                    </div>

                    <div className="col-6 my-2">
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
                        required
                      />

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
                      <select
                        className="form-select mb-3"
                        aria-label="Default select example"
                        onChange={handelChangeInputs}
                        name="parent_id"
                        value={inputs.parent_id}
                        required
                      >
                        <option defaultValue={null}>
                          Open this select menu
                        </option>

                        {all_categories ? (
                          all_categories.map((item) => (
                            <option className="" key={item.id} value={item.id}>
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

                      {Errors ? (
                        <p className="text-danger h6 my-2">Errors.info</p>
                      ) : null}
                    </div>

                    <div className="col-6 my-2"></div>
                  </div>

                  <div className="col-12">
                    <button type="submit" className="btn btn-success px-4 mx-2">
                      Add Sub Categories
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

export default AddSubCategories;
