import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import DeleteCategories from "./DeleteCategories";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editCategories } from "../../../app/toolkit/CategorieSlice";
import { TimeDay } from "../../../Global/Time";

const TableCategories = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //const { children } = useSelector((state) => state.categories);

  const dispatchEdit = async (id) => {
    await dispatch(editCategories(id));
    navigate(`/admin/categories/edit_categories/${id}`);
  };

  const [selectedItem, setSelectedItem] = useState(null);

  const handleShowChildren = (item) => {
    setSelectedItem(selectedItem === item.id ? null : item.id);
  };

  /*  await dispatch(insertchildren(x));
    const encodedData = encodeURIComponent(JSON.stringify(x));
    */

  return (
    <>
      <tbody>
        {props.all_categories.map((item) => (
          <>
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
                {item.parent_id === null ? (
                  <span className="h3 text-success">
                    <i className="bi bi-house-fill"></i>
                  </span>
                ) : (
                  <span className="h3 text-danger">
                    <i className="bi bi-star-fill"></i>
                  </span>
                )}
              </td>

              <td>{TimeDay(item.created_at)}</td>

              <td>
                <div className="d-flex justify-content-center align-items-center gap-3 fs-6">
                  {item.children?.length > 0 ? (
                    <button
                      onClick={() => handleShowChildren(item)}
                      className="text-primary btn"
                    >
                      {item.children.length}
                      <i className="bi bi-eye-fill mx-2" />
                    </button>
                  ) : (
                    <i className="bi bi-eye-slash-fill" />
                  )}

                  {/* Update button */}
                  <button
                    onClick={() => dispatchEdit(item.id)}
                    className="text-warning btn"
                  >
                    <i className="bi bi-pencil-fill" />
                  </button>

                  {/* Deleted button */}
                  <DeleteCategories
                    id={item.id}
                    name={item.name}
                    cover={item.cover}
                  />
                </div>
              </td>
            </tr>
            {/* Show children row */}
          </>
        ))}
      </tbody>
    </>
  );
};

export default TableCategories;
