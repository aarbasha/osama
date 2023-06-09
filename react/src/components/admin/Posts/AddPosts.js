import React, { useState, useEffect } from "react";
import ScaleInAnimation from "../../../Animation/ScaleInAnimation";
import GlobalAnimation from "../../../Animation/GlobalAnimation";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { Categories } from "../../../app/toolkit/CategorieSlice";
import { add_Posts, all_Posts } from "../../../app/toolkit/PostSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { toastSuccess, toastError } from "../../../Global/ToastContainer";
import Spinner from "react-bootstrap/esm/Spinner";
const AddPosts = () => {
  const {progress} = add_Posts();
  useEffect(() => {
    dispatch(Categories());

    console.log(progress);
  }, []);



  const dispatch = useDispatch();
  const rediract = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);
  const { all_categories } = useSelector((state) => state.categories);
  const { status, error } = useSelector((state) => state.post);
  const [Errors, setErrors] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);

  const [cover, setCover] = useState([]);
  const [coverPreview, setCoverPreview] = useState(null);

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    body: "",
    tags: "",
    categorie_id: "",
    images: [],
    cover: "",
  });

  const handelChangeInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handelChangeCover = (e) => {
    setCover({ cover: e.target.files[0] });
    setCoverPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handelChangeImages = (e) => {
    setImages(e.target.files);
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      // console.log("filesArray: ", filesArray);

      setImagesPreview((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  };

  const renderPhotos = (source) => {
    // console.log("source: ", source);
    return source.map((photo) => {
      return (
        <img src={photo} key={photo} alt="test" width={100} height={100} />
      );
    });
  };

  const CoverClear = (e) => {
    e.preventDefault();
    setCover([]);
    setCoverPreview(null);
  };

  const ImagesClear = (e) => {
    e.preventDefault();
    setImages([]);
    setImagesPreview([]);
  };

  const ResetForm = (e) => {
    e.preventDefault();
    setCover([]);
    setCoverPreview(null);
    setImages([]);
    setImagesPreview([]);
    setInputs({
      title: "",
      body: "",
      tags: "",
      categorie_id: "",
      images: [],
      cover: "",
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    for (let i = 0; i < images.length; i++) {
      data.append("images[]", images[i]);
    }
    data.append("title", inputs.title);
    data.append("auther", user.username);
    data.append("categorie_id", inputs.categorie_id);
    data.append("tags", inputs.tags);
    data.append("body", inputs.body);
    data.append("cover", cover.cover);

    await dispatch(add_Posts(data));
    await dispatch(all_Posts(1))
    setTimeout(() => {
      if (status == 200) {
        toastSuccess("success add post");
       // rediract("/admin/posts/all_posts");
      } else {
        toastError("Error filed ....");
        setErrors(error);
       // rediract(location.pathname);
      }
      setLoading(false);
    }, 3000);
  };

  return (
    <ScaleInAnimation>
      <div className="card">
        <div className="card-body">
          <form encType="multipart/form-data" onSubmit={submitForm}>
            <Tabs
              defaultActiveKey="home"
              id="uncontrolled-tab-example"
              className="mx-3 d-flex  justify-content-center"
            >
              <Tab eventKey="home" title="Information Prodact">
                <div className="row">
                  <div className="col-4 my-2">
                    <label className="form-label"> Title Post</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Title post"
                      name="title"
                      value={inputs.title}
                      onChange={handelChangeInputs}
                    />
                    {error ? (
                      <p className="text-danger">{error.title}</p>
                    ) : null}
                  </div>

                  <div className="col-4 my-2">
                    <label className="form-label"> Tags Post</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Tags post"
                      name="tags"
                      value={inputs.tags}
                      onChange={handelChangeInputs}
                    />
                    {error ? <p className="text-danger">{error.tags}</p> : null}
                  </div>

                  {/* ------------------------------------------------------------------ */}
                  <input
                    hidden
                    type={"text"}
                    name="auther"
                    value={user.username}
                  />
                  {/* ------------------------------------------------------------------ */}

                  <div className="col-4 my-2">
                    <label className="form-label">
                      Selected Primary Categories
                    </label>
                    <select
                      className="form-select mb-3"
                      aria-label="Default select example"
                      onChange={handelChangeInputs}
                      name="categorie_id"
                      value={inputs.categorie_id}
                      required
                    >
                      <option value={"x"}>Open this select menu</option>

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
                    {error ? (
                      <p className="text-danger">{error.categorie_id}</p>
                    ) : null}
                  </div>
                </div>
              </Tab>

              <Tab eventKey="contact" title="Discription and Sava Prodact ">
                <div className="row">
                  <div className="col-12 my-1">
                    <label className="form-label">Full description</label>
                    <textarea
                      className="form-control"
                      placeholder="Full description"
                      rows={8}
                      cols={4}
                      name="body"
                      value={inputs.body}
                      onChange={handelChangeInputs}
                    />
                  </div>
                  {error ? <p className="text-danger">{error.body}</p> : null}
                </div>
              </Tab>

              <Tab eventKey="profile" title="Uplode Photos Prodact">
                <div className="row">
                  <div className="col-lg-6 col-12 my-2 d-flex justify-content-center ">
                    <input
                      className="form-control d-none"
                      type="file"
                      id="file"
                      onChange={handelChangeCover}
                    />
                    <label
                      className="form-label my-2 btn btn-success"
                      htmlFor="file"
                    >
                      product cover + <i className="bi bi-image mx-4" />
                    </label>
                    {error ? (
                      <p className="text-danger">{error.cover}</p>
                    ) : null}
                    <button
                      className="form-label my-2 btn btn-success mx-2"
                      disabled={coverPreview === null}
                      onClick={CoverClear}
                    >
                      clear cover
                    </button>
                  </div>

                  {/*   <div className="col-lg-4 col-12 my-2 d-flex justify-content-center ">
                    
                    </div> */}

                  <div className="col-lg-6 col-12 my-2 d-flex justify-content-center">
                    <input
                      className="form-control d-none"
                      name="images[]"
                      type="file"
                      multiple
                      id="files"
                      onChange={handelChangeImages}
                    />
                    <label
                      className="form-label my-2 btn btn-danger "
                      htmlFor="files"
                    >
                      images / Multiple +++ /{" "}
                      <i className="bi bi-images mx-4 " />
                    </label>

                    <button
                      className="form-label my-2 btn btn-danger mx-2"
                      disabled={imagesPreview.length === 0}
                      onClick={ImagesClear}
                    >
                      clear Images
                    </button>
                  </div>

                  <div className="row ">
                    <div
                      className=" mx-1 card-body border border-dark d-flex my-2 justify-content-around"
                      style={{ minHeight: "135px" }}
                    >
                      <img
                        className="previewimg"
                        src={
                          coverPreview !== null
                            ? coverPreview
                            : `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y`
                        }
                        alt="test"
                        width={100}
                        height={100}
                      />
                    </div>

                    <div
                      className=" d-flex my-2  mx-1 card-body border border-info flex-wrap justify-content-around"
                      style={{ minHeight: "135px" }}
                    >
                      {renderPhotos(imagesPreview)}
                    </div>

                    <div
                      className="progress p-0 mt-2"
                      style={{ fontSize: "16px", height: "30px" }}
                    >
                      <div
                        className={
                          ""
                          // progressBar <= 35 ? "progress-bar bg-danger " :
                          //   progressBar <= 66 ? "progress-bar bg-warning " :
                          //     progressBar <= 100 ? "progress-bar bg-success " : null
                        }
                        role="progressbar"
                        // style={{ width: `${progressBar}%` }}
                        // aria-valuenow={progressBar}
                        // aria-valuemin='0'
                        // aria-valuemax='100'
                      >
                        {/* {`${progressBar}%`} */}
                        1000000 %
                      </div>
                    </div>
                  </div>

                  <div className="col-12 mt-3 mx-2 d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-dark  mx-2"
                      style={{ width: "200px" }}
                    >
                      {loading ? (
                        <Spinner variant="success" animation="border" />
                      ) : (
                        <span>Add Prodact</span>
                      )}
                    </button>

                    {/*     <button
                      className="btn btn-danger px-4 mx-2"
                      style={{ width: "200px" }}
                      //onClick={rediract('/admin/posts/all_posts')}
                    >
                      Back
                    </button> */}

                    <button
                      onClick={ResetForm}
                      className="btn btn-warning px-4 mx-2"
                      style={{ width: "400px" }}
                    >
                      Reset OR Clear all input fields x
                    </button>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </form>
        </div>
      </div>
    </ScaleInAnimation>
  );
};

export default AddPosts;
