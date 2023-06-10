import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import DeleteCategories from "./DeleteCategories";
import { Link, useNavigate } from "react-router-dom";

const TableCategories = (props) => {
  const rediract = useNavigate();

  return (
    <>
      <tbody
      style={{ height: "300px" }}
      >
        {props.all_categories.map((item) => (
          <tr className="text-center" key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>
              <img
                src={"http://127.0.0.1:8000/cover/" + item.cover}
                className="rounded-circle"
                width={44}
                height={44}
                alt="test"
              />
            </td>

            <td>{item.name_folder}</td>
            <td>{item.auther}</td>

            <td>
              {item.parent_id == null ? (
                <span className="h3 text-success">
                  <i className="bi bi-house-fill"></i>
                </span>
              ) : (
                <span className="h3 text-danger">
                  <i className="bi bi-star-fill"></i>
                </span>
              )}
            </td>

            <td>{item.created_at}</td>
            <td>
              <div className="d-flex justify-content-center align-items-center gap-3 fs-6">
                {/* show  */}
                <button className="text-primary btn">
                  <i className="bi bi-eye-fill" />
                </button>

                {/* update */}
                <Link
                  to={`/admin/categories/edit_categories/${item.id}`}
                  className="text-warning btn"
                >
                  <i className="bi bi-pencil-fill" />
                </Link>

                {/* deleted */}
                <DeleteCategories
                  // on={true}
                  // off={false}
                  id={item.id}
                  name={item.name}
                  cover={item.cover}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  );
};

export default TableCategories;
