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
          <div className="ps-3">
            <nav aria-label="breadcrumb">
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

          <div className="ms-auto  flex-row-start">
            <NavLink
              to={"/admin/categories/sub_categories"}
              className=" btn btn-outline-warning mx-2"
            >
              Add Sub Categorie
            </NavLink>

            <NavLink
              to={"/admin/categories/add_categories"}
              className="btn btn-outline-primary mx-2"
            >
              Add Categorie
            </NavLink>

            <NavLink
              to={"/admin/categories/all_categories"}
              type="button"
              className="btn btn-outline-dark mx-2"
            >
              All Categories
            </NavLink>

            <div className="d-flex flex-row-reverse">
              <button
                className="btn btn-danger m-3"
                onClick={() => Rediract(-1)}
              >
                Back
              </button>
            </div>
          </div>
        </div>

        <Outlet />
      </div>
    </FadeOutAnimation>
  );
};

export default MasterCategories;
