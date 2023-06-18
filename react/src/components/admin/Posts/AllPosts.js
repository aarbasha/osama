import React, { useState, useEffect } from "react";
import FadeOutAnimation from "../../../Animation/FadeOutAnimation";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { all_Posts } from "../../../app/toolkit/PostSlice";
import Skeleton from "react-loading-skeleton";
import ReactPaginate from "react-paginate";
import { updateCurrentPage , edit_Posts } from "../../../app/toolkit/PostSlice";
import DeletePost from "./DeletePost";
import { TimeDay } from "../../../Global/Time";
const AllPosts = () => {
  const location = useLocation();
  const navgate = useNavigate();
  const dispatch = useDispatch();
  const [pageCount, setPageCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const { posts, current_page, total, per_page } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(all_Posts(current_page));
    }, 10000);
    setPageCount(Math.ceil(total / per_page));
    <ReactPaginate />;
    setLoading(true);
    setTimeout(() => {
      dispatch(all_Posts(current_page));
      setLoading(false);
      return clearInterval(interval);
    }, 500);
  }, [dispatch, current_page, total, per_page]);

  const handlePageClick = async (e) => {
    let current_page = e.selected + 1;
    await dispatch(updateCurrentPage(current_page));
  };

  const dispatchEdit = async (id) => {
   await dispatch(edit_Posts(id));
    navgate(`/admin/posts/edit_posts/${id}`);
  };

  const Show_Posts = async (id) => {
    await navgate(`/admin/posts/show_posts/${id}`);
  };

  return (
    <FadeOutAnimation>
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
              <select className="form-select">
                <option>Users</option>
                <option>Admins</option>
                <option>Mangers</option>
              </select>
            </div>

            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Status</option>
                <option>Active</option>
                <option>Disabled</option>
                <option>Pending</option>
                <option>Show All</option>
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
        <div className="card-body">
          <div>
            {loading ? (
              <Skeleton count={15} />
            ) : (
              <div className={"table-responsive"}>
                <table className="table text-center align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>#ID</th>
                      <th>Name</th>
                      <th>cover</th>
                      <th>Categorie</th>
                      <th>Data</th>
                      <th>auther</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts &&
                      posts.map((post) => (
                        <tr key={post.id}>
                          <td>{post.id}</td>
                          <td>{post.title}</td>
                          <td>
                            <div className="d-flex justify-content-center gap-3 cursor-pointer">
                              <img
                                src={`http://localhost:8000/cover/${post.cover}`}
                                className="user-img rounded-circle"
                                alt={"username"}
                                width={40}
                                height={40}
                              />
                            </div>
                          </td>

                          <td>{post.categorie.name}</td>

                          <td>{TimeDay(post.created_at)}</td>
                          <td>{post.auther}</td>

                          <td>
                            <div className="d-flex justify-content-center">
                              <button
                                className="text-primary btn"
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                                data-bs-original-title="View detail"
                                aria-label="Views"
                                onClick={() => {
                                  Show_Posts(post.id);
                                }}
                              >
                                <i className="bi bi-eye-fill" />
                              </button>
                              <button
                                className="text-warning btn"
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                                data-bs-original-title="Edit info"
                                aria-label="Edit"
                                onClick={() => {
                                  dispatchEdit(post.id);
                                }}
                              >
                                <i className="bi bi-pencil-fill" />
                              </button>

                              <DeletePost
                                id={post.id}
                                title={post.title}
                                cover={post.cover}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}

            <nav className={"mt-5 h5 d-flex justify-content-center mt-3"}>
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
            </nav>
          </div>
        </div>
      </div>
    </FadeOutAnimation>
  );
};

export default AllPosts;
