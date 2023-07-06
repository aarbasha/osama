import React , {useState} from 'react'
import { Container } from "../../../Global/ToastContainer";
import FadeOutAnimation from "../../../Animation/FadeOutAnimation";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

const AllBehance = () => {
  const [loading, setLoading] = useState(false);

  return (
    <FadeOutAnimation>
      {Container()}
      <div className="card">
        <div className="card-header py-3">
          <div className="row g-3">
            <div className="col-lg-3 col-md-6 me-auto">
              <div className="ms-auto position-relative">
                <div className="position-absolute top-50 translate-middle-y search-icon px-3">
                  <i className="bi bi-search" />
                </div>
                <input
                  className="form-control ps-5"
                  type="text"
                  placeholder="Search Payment"
                />
              </div>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select onChange={''} className="form-select">
                <option value={0} selected>
                  choes{" "}
                </option>
                <option value={1}>Primary Categories</option>
                <option value={2}>Sub Categories</option>

                {/*   <option>Status</option>
                <option>Active</option>
                <option>Disabled</option>
                <option>Pending</option>
                <option>Show All</option> */}
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Show 10</option>
                <option>Show 30</option>
                <option>Show 50</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <Skeleton
            count={15}
            style={{
              width: "100%",
              margin: "5px",
            }}
          />
        ) : (
          <>
            <div className={"table-responsive"}>
              <table className="table align-middle mb-0">
                <thead className="table-light">
                  <tr className="text-center">
                    <th>#ID</th>
                    <th>Name</th>
                    <th>cover</th>
                    <th>name_folder</th>
                    <th>auther</th>
                    <th>primary</th>
                    <th>Date add </th>
                    <th>Action</th>
                  </tr>
                </thead>
              {/*   <TableCategories all_categories={all_categories} /> */}
              </table>
            </div>
          </>
        )}

        <nav className={"mt-5 h5 d-flex justify-content-center mt-3"}>
          {/* {Pagination()} */}
        </nav>

        <div className="card-body"></div>
      </div>
    </FadeOutAnimation>
  )
}

export default AllBehance