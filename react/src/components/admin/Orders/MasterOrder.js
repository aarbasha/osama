import React from "react";
import { useLocation, Outlet, NavLink } from "react-router-dom";
import FadeOutAnimation from "../../../Animation/FadeOutAnimation";

const MasterOrder = () => {
  const location = useLocation();
  const slice = location.pathname;
  const my = slice.split("/");

  return (
    <FadeOutAnimation>
      <div>
        <div className="page-breadcrumb  d-flex align-items-center mx-2 mb-3">
          <div className="breadcrumb-title pe-3">eCommerce</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item px-2">
                  <a>
                    <i className="bx bx-home-alt mx-3" />
                    {my[2]}
                  </a>
                </li>

                <li className="breadcrumb-item px-2">
                  <a>
                    <i className="bx bx-home-alt mx-3" />
                    {my[3]}
                  </a>
                </li>
              </ol>
            </nav>
          </div>
          <div className="ms-auto">
            <NavLink
              to={"/admin/orders/all_orders"}
              type="button"
              className="btn btn-dark mx-2"
            >
              All Orders
            </NavLink>

            <NavLink
              to={"/admin/orders/add_orders"}
              type="button"
              className="btn btn-success mx-2"
            >
              Add Ordars
            </NavLink>
          </div>
        </div>
        <Outlet />
      </div>
    </FadeOutAnimation>
  );
};

export default MasterOrder;
