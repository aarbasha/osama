import React from "react";
import FadeOutAnimation from "../../../Animation/FadeOutAnimation";

const EditCategories = () => {
  return (
    <FadeOutAnimation>
      <div className="row">
        <div className="col-12 col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="">
                <form className="row g-3">
                  <div className="row">
                    <div className="col-12 my-2">
                      <label className="form-label"> Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Name"
                      />
                    </div>

                    <div className="col-12 my-2">
                      <label className="form-label">
                        Name folder Images Prodacts
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Name"
                      />
                    </div>

                    {/* enter input auther */}

                    <input type="text" hidden className="form-control" />
                    <div className="col-12 my-2">
                      <input
                        name="cover"
                        className="form-control d-none"
                        type="file"
                        id="file"
                      />
                      <label
                        className="form-label my-2 btn btn-secondary"
                        htmlFor="file"
                      >
                        Cover Tha Categorie + <i className="bi bi-image mx-3" />
                      </label>
                      <button className="btn btn-primary mx-3">
                        {" "}
                        Remove image{" "}
                      </button>

              
                        <img
                          src={"http://commondatastorage.googleapis.com/codeskulptor-assets/lathrop/nebula_blue.s2014.png"}
                          className="mx-5 rounded-circle shadow"
                          width={75}
                          height={75}
                          alt="test"
                        />
                      
                    </div>

                    <div className="col-12 my-2">
                      <label className="form-label">Full description</label>
                      <textarea
                        className="form-control"
                        placeholder="Full description"
                        rows={5}
                        cols={4}
                      />
                    </div>

                    <div className="col-6 my-2"></div>
                  </div>

                  <div className="col-12">
                    <button type="submit" className="btn btn-success px-4 mx-2">
                      Update Categories
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

export default EditCategories;
