import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { MdSecurity } from "react-icons/md";
import { HiUserGroup, HiUsers } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const SidebarContent = () => {
  const { orders } = useSelector((state) => state.orders);

  return (
    <>
      <div className="tab-content">
        <div className="tab-pane fade active show" id="dashboards">
          <div className="list-group list-group-flush">
            <div className="list-group-item">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-0">Dashboards</h5>
              </div>
              <small className="mb-0">Some placeholder content</small>
            </div>
            <NavLink to="/admin/index" className="list-group-item">
              <i className="bi bi-cart-plus" />
              e-Commerce
            </NavLink>
            <NavLink to="/admin/app" className="list-group-item">
              <i className="bi bi-wallet" />
              Sales
            </NavLink>
            <NavLink to="/admin/app2" className="list-group-item">
              <i className="bi bi-bar-chart-line" />
              Analytics
            </NavLink>
            <NavLink to="/admin/app3" className="list-group-item">
              <i className="bi bi-archive" />
              Project Management
            </NavLink>
            <NavLink to="/admin/ds" className="list-group-item">
              <i className="bi bi-cast" />
              CMS Dashboard
            </NavLink>
          </div>
        </div>

        <div className="tab-pane fade" id="application">
          <div className="list-group list-group-flush">
            <div className="list-group-item">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-0">Application</h5>
              </div>
              <small className="mb-0">Some placeholder content</small>
            </div>

            <NavLink
              to="/admin/categories/all_categories"
              className="list-group-item"
            >
              <i className="bi bi-envelope" />
              Categories
            </NavLink>

            {/*  <NavLink
              to="/admin/products/all_products"
              className="list-group-item"
            >
              <i className="bi bi-chat-left-text" />
              Products
            </NavLink> */}

            <NavLink to="/admin/posts/all_posts" className="list-group-item">
              <i className="bi bi-receipt" />
              Posts
            </NavLink>

            <NavLink
              to="/admin/postBehance/all_post_behance"
              className="list-group-item"
            >
              <i className="bi bi-receipt" />
              post in Behance
            </NavLink>

            <NavLink to="/admin/orders/all_orders" className="list-group-item">
              <i className="bi bi-check2-square" />
              Ordars
              {orders?.length === 0 ? null : (
                <span
                  className="bg-danger  text-center p-1 px-2"
                  style={{ position: "absolute", right: "10px", top: "5px" }}
                >
                  {orders?.length > 0 ? orders.length : null}
                </span>
              )}
            </NavLink>

            <NavLink to="/admin/tasks/all_tasks" className="list-group-item">
              <i className="bi bi-list-task" />
              Tasks
            </NavLink>
          </div>
        </div>

        <div className="tab-pane fade" id="widgets">
          <div className="list-group list-group-flush">
            <div className="list-group-item">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-0">Widgets</h5>
              </div>
              <small className="mb-0">Some placeholder content</small>
            </div>
            <a href="widgets-static-widgets.html" className="list-group-item">
              <i className="bi bi-box" />
              Static Widgets
            </a>
            <a href="widgets-data-widgets.html" className="list-group-item">
              <i className="bi bi-bar-chart" />
              Data Widgets
            </a>
          </div>
        </div>

        <div className="tab-pane fade" id="Users-pages">
          <div className="list-group list-group-flush">
            <div className="list-group-item">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-0">Admins & Users</h5>
              </div>
              <small className="mb-0">Some placeholder content</small>
            </div>

            <NavLink to="/admin/roles/all_roles" className="list-group-item">
              <HiUserGroup />
              <span className="mx-3">Roles</span>
            </NavLink>

            <NavLink
              to="/admin/permissions/all_Permissions"
              className="list-group-item"
            >
              <MdSecurity />
              <span className="mx-3">Permissions</span>
            </NavLink>

            <NavLink to="/admin/Users/all_Users" className="list-group-item">
              <HiUsers className="" /> <span className="mx-3">Users</span>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarContent;
