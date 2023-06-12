import React, { useEffect, useState } from "react";
import FadeOutAnimation from "../../../Animation/FadeOutAnimation";
import { useDispatch, useSelector } from "react-redux";
import { All_Categories } from "../../../app/toolkit/CategorieSlice";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import TableCategories from "./TableCategories";
import { Container } from "../../../Global/ToastContainer";
import ReactPaginate from "react-paginate";

const AllCategories = () => {
  const dispatch = useDispatch();
  const { all_categories, current_page, total, per_page } = useSelector(
    (state) => state.categories
  );
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    setPageCount(Math.ceil(total / per_page));
    Pagination()
    setTimeout(() => {
      dispatch(All_Categories(current_page));
      setLoading(false);
    }, 500);
  }, [dispatch, current_page]);

  const Pagination =  () =>{
    return (
       <ReactPaginate
            breakLabel="***"
            nextLabel="next >>>"
            onPageChange={handlePageClick}
            pageRangeDisplayed={per_page}
            marginPagesDisplayed={5}
            pageCount={pageCount} //total
            previousLabel="<<< previous"
            renderOnZeroPageCount={null}
            containerClassName="pagination rounded "
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            activeClassName="active"
          />
    )
  }

  const handlePageClick = async (e) => {
    let current_page = e.selected + 1;
   await dispatch(All_Categories(current_page));
  };

  const handelChangeSelect = (e) => {
    console.log(e.target.value);
  };

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
              <select onChange={handelChangeSelect} className="form-select">
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
                <TableCategories all_categories={all_categories} />
              </table>
            </div>
          </>
        )}

        <nav className={"mt-5 h5 d-flex justify-content-center mt-3"}>
          {Pagination()}
        </nav>

        <div className="card-body"></div>
      </div>
    </FadeOutAnimation>
  );
};

export default AllCategories;
