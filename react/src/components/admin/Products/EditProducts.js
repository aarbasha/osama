import React from "react";
import FadeOutAnimation from "../../../Animation/FadeOutAnimation";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const EditProducts = () => {
  return (
    <FadeOutAnimation>
      <div className="card">
        <div className="card-body">
          <form encType="multipart/form-data">
            <Tabs
              defaultActiveKey="home"
              id="uncontrolled-tab-example"
              className="m-3 d-flex justify-content-center"
              bg="Danger"
            >
              <Tab eventKey="home" title="Information Prodact">
                <FadeOutAnimation>
                  <div className="row">
                    <div className="col-4 my-2">
                      <label className="form-label"> name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Product Name"
                      />
                    </div>

                    <div className="col-4 my-2">
                      <label className="form-label"> price </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Product Price"
                      />
                    </div>

                    {/* ------------------------------------------------------------------ */}
                    <input hidden type={"text"} />
                    {/* ------------------------------------------------------------------ */}

                    <div className="col-4 my-2">
                      <label className="form-label">number </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Product Serial Number"
                      />
                    </div>

                    <div className="col-4 my-2">
                      <label className="form-label"> quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Product Quantity"
                      />
                    </div>

                    <div className="col-4 my-2">
                      <label className="form-label"> discount </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Product Discount"
                      />
                    </div>

                    <div className="col-4 my-2">
                      <label className="form-label">Status</label>
                      <select
                        className="form-select mb-3"
                        aria-label="Default select example"
                      >
                        <option selected>Open this select menu</option>
                        <option value={1}>available</option>
                        <option value={2}>not available</option>
                      </select>
                    </div>

                    <div className="col-4 my-2">
                      <label className="form-label"> colors</label>
                      <input
                        type="color"
                        className="form-control"
                        placeholder="Enter Name"
                      />
                    </div>

                    <div className="col-4 my-2">
                      <label className="form-label"> Sizes </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter username"
                      />
                    </div>

                    <div className="col-4 my-2">
                      <label className="form-label">Brands </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Email"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Date time:</label>
                      <input type="datetime-local" className="form-control" />
                    </div>

                    <div className="col-6 my-2">
                      <label className="form-label"> Main Categories </label>
                      <select
                        className="form-select mb-3"
                        aria-label="Default select example"
                      >
                        <option selected>Open this select menu</option>

                        <option>categories</option>
                      </select>
                    </div>

                    <div className="col-6 my-2">
                      <label className="form-label">Branched Categories</label>
                      <select
                        disabled
                        className="form-select mb-3"
                        aria-label="Default select example"
                      >
                        <option selected>Open this select menu</option>
                        <option value={1}>One</option>
                        <option value={2}>Two</option>
                        <option value={3}>Three</option>
                      </select>
                    </div>
                  </div>
                </FadeOutAnimation>
              </Tab>

              <Tab eventKey="contact" title="Discription and Sava Prodact ">
                <FadeOutAnimation>
                  <div className="row">
                    <div className="col-12 my-1">
                      <label className="form-label">Full description</label>
                      <textarea
                        className="form-control"
                        placeholder="Full description"
                        rows={14}
                        cols={4}
                      />
                    </div>
                  </div>
                </FadeOutAnimation>
              </Tab>

              <Tab eventKey="profile" title="Uplode Photos Prodact ">
                <FadeOutAnimation>
                  <div className="row">
                    <div className="col-lg-4 col-12 my-2 d-flex justify-content-center ">
                      <input
                        className="form-control d-none"
                        name="cover"
                        type="file"
                        id="file"
                      />
                      <label
                        className="form-label my-2 btn btn-success"
                        htmlFor="file"
                      >
                        product cover + <i className="bi bi-image mx-4 h5" />
                      </label>
                    </div>

                    <div className="col-lg-4 col-12 my-2 d-flex justify-content-center ">
                      <button className="my-2 btn btn-primary">
                        Reset OR Clear all input fields x
                      </button>
                    </div>

                    <div className="col-lg-4 col-12 my-2 d-flex justify-content-center">
                      <input
                        className="form-control d-none"
                        name="images[]"
                        type="file"
                        id="files"
                        max={10}
                        multiple
                      />
                      <label
                        className="form-label my-2 btn btn-danger "
                        htmlFor="files"
                      >
                        images / Multiple +++ /{" "}
                        <i className="bi bi-images mx-4 h5" />
                      </label>
                    </div>
                    <div className="row ">
                      <div
                        className=" d-flex my-2  mx-1 card-body border border-info flex-wrap justify-content-around"
                        style={{ "min-height": "135px" }}
                      >
                        <img
                          className="previewimg"
                          src={""}
                          alt="test"
                          width={100}
                          height={100}
                        />
                      </div>

                      <div
                        className=" mx-1 card-body border border-dark d-flex my-2 justify-content-around text-align-center"
                        style={{ "min-height": "135px" }}
                      >
                        {/* <span 
                                                            className="px-2 ">
                                                                <Spinner animation="grow" variant="primary" />
                                                                <Spinner animation="grow" variant="warning" />
                                                                <Spinner animation="grow" variant="secondary" />
                                                                <Spinner animation="grow" variant="dark" />
                                                                <Spinner animation="grow" variant="success" />
                                                                <Spinner animation="grow" variant="info" />
                                                                <Spinner animation="grow" variant="danger" />
                                                                <Spinner animation="grow" variant="warning" />
                                                                <Spinner animation="grow" variant="info" />
                                                                <Spinner animation="grow" variant="secondary" />
                                                                <Spinner animation="grow" variant="dark" />
                                                            </span> */}

                        <div>
                          {/* <button 
                                                                            onClick={(e) => deleteImage(e, item.id, inputs.categories.name_folder)} className="btn btn-remove">
                                                                                x
                                                                            </button> */}
                          <img
                            src=""
                            //                                                 key={item.id}

                            // src={`http://localhost:8000/images/${inputs.categories.name_folder}/${item.url}`}
                            alt="test"
                            width={100}
                            height={100}
                          />
                        </div>
                      </div>

                      <div>
                        <div
                          className="progress p-0 mt-2"
                          style={{ "font-size": "16px", height: "30px" }}
                        >
                          <div
                            className=""
                            // {
                            //     progressBar <= 35 ? "progress-bar bg-danger " :
                            //         progressBar <= 66 ? "progress-bar bg-warning " :
                            //             progressBar <= 100 ? "progress-bar bg-success " : null}
                            role="progressbar"
                            // style={{ width: `${progressBar}%` }}
                            // aria-valuenow={progressBar}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            {/* {`${progressBar}%`} */}100%
                          </div>
                        </div>
                      </div>

                      <div className="col-12 mt-3 mx-2 d-flex justify-content-center">
                        <>
                          <button
                            type="submit"
                            className="btn btn-success  mx-2"
                            style={{ width: "200px" }}
                          >
                            Update Tha Prodact
                          </button>
                        </>

                        <button
                          className="btn btn-danger px-4 mx-2"
                          style={{ width: "200px" }}
                        >
                          Back
                        </button>
                      </div>
                    </div>
                  </div>
                </FadeOutAnimation>
              </Tab>
            </Tabs>
          </form>
        </div>
      </div>
    </FadeOutAnimation>
  );
};

export default EditProducts;
