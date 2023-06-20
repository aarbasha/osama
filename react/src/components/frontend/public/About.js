import React, { useState } from "react";
import GlobalAnimation from "../../../Animation/GlobalAnimation";
import axios from "axios";
import Spinner from "react-bootstrap/esm/Spinner";
import { toastSuccess, Container } from "../../../Global/ToastContainer";

const About = () => {
  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    fullname: "",
    email: "",
    mobile: "",
    body: "",
  });

  const handelChangeInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handelSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      axios
        .post("http://localhost:8000/api/add-order", inputs)
        .then((res) => {
          if (res.data.status === 200) {
            toastSuccess(
              "done send order to admin web site to replace you 48 hours"
            );
            setInputs({
              fullname: "",
              email: "",
              mobile: "",
              body: "",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });

      setLoading(false);
    }, 3500);
  };

  return (
    <GlobalAnimation>
      {Container()}
      <div className="">
        <div className="card-body">
          {loading ? (
            <Spinner
              variant="success"
              animation="border"
              style={{ position: "absolute", right: "100px", top: "50px" }}
            />
          ) : null}

          <form onSubmit={handelSubmitForm} encType="multipart/form-data">
            <div className="col-md-8 offset-2">
              <div className="col-12 my-2 ">
                <label className="form-label"> Full Name :</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter full Name"
                  name="fullname"
                  onChange={handelChangeInputs}
                  value={inputs.fullname}
                  required
                />
              </div>

              <div className="col-12 my-2 ">
                <label className="form-label"> Email </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Your Email "
                  name="email"
                  onChange={handelChangeInputs}
                  value={inputs.email}
                  required
                />
              </div>

              <div className="col-12 my-2 ">
                <label className="form-label"> Mobile Phone</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Your Mobile Phone "
                  name="mobile"
                  onChange={handelChangeInputs}
                  value={inputs.mobile}
                  required
                />
              </div>

              <div className="col-12 my-2 ">
                <label className="form-label"> price </label>
                <textarea
                  type="number"
                  className="form-control"
                  placeholder="Enter discription Serves ..."
                  rows={10}
                  name="body"
                  onChange={handelChangeInputs}
                  value={inputs.body}
                  required
                ></textarea>
              </div>

              <div className="row">
                <div className="col-12 mt-3 mx-2 d-flex justify-content-center">
                  <button
                    disabled={loading}
                    type="submit"
                    className="btn-success btn font-bold mx-2"
                    style={{ width: "200px" }}
                  >
                    create Orders
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </GlobalAnimation>
  );
};

export default About;
