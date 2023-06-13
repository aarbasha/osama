import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import FadeOutAnimation from "../../../Animation/FadeOutAnimation";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { profile } from "../../../app/toolkit/AuthSlice";
import { UserOnlineOffline } from "../../../app/toolkit/UsersSlice";

const Users_online = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { isAuth } = useSelector((state) => state.auth);
  const { usersOnline, usersOffline } = useSelector((state) => state.users);

  const [usersMapOnline, setUsersMapOnline] = useState();
  const [usersMapOffline, setUsersMapOffline] = useState();
  /*  useEffect(() => {
    dispatch(profile());
  }, []); */

  useEffect(() => {
    dispatch(UserOnlineOffline());
  /*   const interval = setInterval(() => {
    
    }, 60000); // Refresh the list of online users every 10 seconds
    return () => clearInterval(interval); */
  }, []);

  useEffect(() => {
    setUsersMapOnline(usersOnline);
    setUsersMapOffline(usersOffline);
    console.log(usersOnline);
    console.log(usersOffline);
  }, []);

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
            <div className="row justify-content-around">
              {usersMapOnline
                ? usersMapOnline.map((item) => {
                    <div className="">{item.name}</div>;
                  })
                : 

                <Skeleton count={10} />
                
                }
            </div>
          </div>
        </div>
      </div>
    </FadeOutAnimation>
  );
};

export default Users_online;
