import React, { useEffect } from "react";
import FadeOutAnimation from "../../../Animation/FadeOutAnimation";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";

const MasterCategories = () => {
  const Rediract = useNavigate();
  const location = useLocation();
  const slice = location.pathname;
  const my = slice.split("/");


  return (
    <FadeOutAnimation>
      <div>
        <div className="page-breadcrumb  d-flex align-items-center mx-2 mb-3">
          <div className="breadcrumb-title pe-3">Ecommerce</div>
          <div className="row ps-3">
            <nav aria-label=" col-lg-12 breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item px-2 text-danger">
                  <a>
                    <i className="bx bx-home-alt mx-3" />
                    {my[2]}
                  </a>
                </li>

                <li className="breadcrumb-item px-2 text-warning">
                  <a>
                    <i className="bx bx-home-alt mx-3" />
                    {my[3]}
                  </a>
                </li>
              </ol>
            </nav>
          </div>
          <div className="ms-auto">
            <div className="row">
              <div className="col-lg-12">
                <NavLink
                  to={"/admin/categories/all_categories"}
                  className="btn mx-1 btn-sm btn-outline-dark"
                >
                  Categories
                </NavLink>

                <NavLink
                  to={"/admin/categories/sub_categories"}
                  className={"btn btn-sm mx-1 btn-outline-warning "}
                >
                  Add SubCategories
                </NavLink>

                <NavLink
                  to={"/admin/categories/add_categories"}
                  className="btn  btn-sm mx-1 btn-outline-primary"
                >
                  Add Pramary
                </NavLink>

                <button
                  className="btn btn-danger m-3"
                  onClick={() => Rediract(-1)}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
        {/*end breadcrumb*/}
        <Outlet />
      </div>
    </FadeOutAnimation>
  );
};

export default MasterCategories;
