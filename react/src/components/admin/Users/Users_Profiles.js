import React from "react";
import FadeOutAnimation from '../../../Animation/FadeOutAnimation';

const Users_Profiles = () => {
    

    return (
        <FadeOutAnimation>
            <div className="row">
                <div className="col-12 col-lg-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="">
                                {/* <form className="row g-3"> */}
                                <div className="row">
                                    <div className="col-6 my-2">
                                        <label className="form-label"> Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="Enter Name"
                                           
                                        />
                                    </div>

                                    <div className="col-6 my-2">
                                        <label className="form-label"> Username </label>
                                        <input
                                            
                                            type="text"
                                            name="username"
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="col-12 my-2">
                                        <label className="form-label">Email </label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Enter Email"
                                         
                                        />
                                    </div>

                                    <div className="col-6 my-2">
                                        <label className="form-label"> Phone </label>
                                        <input
                                            type="number"
                                            name="phone"
                                            className="form-control"
                                            placeholder="Enter phone"
                                            
                                        />
                                    </div>

                                    <div className="col-6 my-2">
                                        <label className="form-label">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="Enter Password"
                                          
                                        />
                                    </div>

                                    <div className="col-6 my-2">
                                        <label className="form-label">Status</label>
                                        <select name="status" className="form-select">
                                            <option value={1} >Active</option>
                                            <option value={0}>Not Active</option>
                                        </select>
                                    </div>

                                    <div className="col-6 my-2">
                                        <label className="form-label">Type</label>
                                        <select name="roles" className="form-select">
                                            <option value={2}>User</option>
                                            <option value={1}>Admin</option>
                                            <option value={0}>Manger</option>
                                        </select>
                                    </div>

                                    <div className="col-12 my-2">
                                        <label className="form-label">Images</label>
                                        <input className="form-control" type="file" />
                                    </div>

                                    <div className="col-12 my-2">
                                        <label className="form-label">Full description</label>
                                        <textarea
                                            className="form-control"
                                            placeholder="Full description"
                                            rows={3}
                                            cols={4}
                                            defaultValue={""}
                                        />
                                    </div>

                                    <div className="col-6 my-2"></div>
                                </div>

                                <div className="col-12">
                                    <button  className="btn btn-primary px-4 mx-2">
                                        Update User
                                    </button>

                                    <button
                                       
                                        className="btn btn-danger px-4 mx-2"
                                    >
                                        Back
                                    </button>
                                </div>
                                {/* </form> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-4">
                    <div className="card shadow-sm border-0 overflow-hidden">
                        <div className="card-body">
                            <div className="profile-avatar text-center">
                                <img
                                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                                    className="rounded-circle shadow"
                                    width={120}
                                    height={120}
                                    alt="test"
                                />
                            </div>
                    
                        </div>
                    </div>
                </div>
            </div>
        </FadeOutAnimation>
    );
};

export default Users_Profiles;
