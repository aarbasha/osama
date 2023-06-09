import React from "react";
import FadeOutAnimation from "../../../Animation/FadeOutAnimation";



const AllProducts = () => {

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
                        <div className={"table-responsive"}>
                            <table className="table align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>#ID</th>
                                        <th>Name</th>
                                        <th>cover</th>
                                        <th>price</th>
                                        <th>Categorie</th>
                                        <th>Data</th>
                                        <th>auther</th>
                                        <th>الكمية</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                
                                        <tr>
                                            <td> 1</td>
                                            <td>product</td>
                                            <td>
                                                <div className="d-flex align-items-center gap-3 cursor-pointer">
                                                    <img
                                                        src={``}
                                                        className="user-img rounded-circle"
                                                        alt={"username"}
                                                        width={40}
                                                        height={40}
                                                    />
                                                </div>
                                            </td>

                                            <td>5000 $</td>
                                            <td>
                                            categories
                                            {/* {item.categories.name} */}
                                            </td>

                                            <td>DATE</td>
                                            <td>By anas</td>

                                            <td>55</td>

                                            <td>
                                                <div className="d-flex align-items-center gap-3 fs-6">
                                                    <button
                                                       
                                                        className="text-primary btn"
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="bottom"
                                                        data-bs-original-title="View detail"
                                                        aria-label="Views"
                                                    >
                                                        <i className="bi bi-eye-fill" />
                                                    </button>
                                                    <button
                                                        
                                                        className="text-warning btn"
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="bottom"
                                                        data-bs-original-title="Edit info"
                                                        aria-label="Edit"
                                                    >
                                                        <i className="bi bi-pencil-fill" />
                                                    </button>
                                                    <button
                                                        
                                                        className="text-danger btn"
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="bottom"
                                                        data-bs-original-title="Delete"
                                                        aria-label="Delete"
                                                    >
                                                        <i className="bi bi-trash-fill" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                 
                                </tbody>
                            </table>
                        </div>

                    

                     

                        <nav className={"float-end mt-3"}>
                            <ul className="pagination">
                                <li className="page-item disabled">
                                    <a className="page-link" href="#">
                                        Previous
                                    </a>
                                </li>
                                <li className="page-item active">
                                    <a className="page-link" href="#">
                                        1
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        2
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        3
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        Next
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </FadeOutAnimation>

    );
};

export default AllProducts;
