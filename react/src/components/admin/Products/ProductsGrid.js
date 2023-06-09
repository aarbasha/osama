import React from "react";
import FadeOutAnimation from "../../../Animation/FadeOutAnimation";
const ProductsGrid = () => {
 
  return (
    <FadeOutAnimation>
      <div className="card">
        <div className="card-header py-3">
          <div className="row g-3 align-items-center">
            <div className="col-lg-3 col-md-6 me-auto">
              <div className="ms-auto position-relative">
                <div className="position-absolute top-50 translate-middle-y search-icon px-3">
                  <i className="bi bi-search" />
                </div>
                <input
                  className="form-control ps-5"
                  type="text"
                  placeholder="search produts"
                />
              </div>
            </div>

            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>All category</option>
                <option>Fashion</option>
                <option>Electronics</option>
                <option>Furniture</option>
                <option>Sports</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Latest added</option>
                <option>Cheap first</option>
                <option>Most viewed</option>
              </select>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="product-grid">
            <div className="row row-cols-1 row-cols-lg-4 row-cols-xl-4 row-cols-xxl-5 g-3">
            
                <div className="col ">
                  <div className="card border card-prodact shadow-none mb-0">
                    <button >
                      <div className="card-body text-center">
                        <img
                          src={''}
                          height={400}
                          width={400}
                          className="img-fluid img-prodact mb-3"
                          alt="test"
                        />
                        <h6 className="product-title">xxxxx</h6>
                        <p className="product-price fs-5 mb-1">
                          <span>$4567</span>
                        </p>
                        <div className="rating mb-0">
                          <i className="bi bi-star-fill text-warning" />
                          <i className="bi bi-star-fill text-warning" />
                          <i className="bi bi-star-fill text-warning" />
                          <i className="bi bi-star-fill text-warning" />
                          <i className="bi bi-star-fill text-warning" />
                        </div>
                        <small>74 Reviews</small>
                        <div className="actions d-flex align-items-center justify-content-center gap-2 mt-3">
                          <button
                            
                            className="btn btn-sm btn-outline-primary"
                          >
                            <i className="bi bi-pencil-fill" /> Edit
                          </button>
                          <a href="" className="btn btn-sm btn-outline-danger">
                            <i className="bi bi-trash-fill" /> Delete
                          </a>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
             
            </div>
            {/*end row*/}

       

  

            <nav className={ "float-end mt-3"}>
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

export default ProductsGrid;
