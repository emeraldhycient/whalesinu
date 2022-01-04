import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from "./components/Header/Header";

function Users() {
  const { REACT_APP_API_URL } = process.env;
  const [users, setusers] = useState("");

  const [isloading, setisloading] = useState(false);

  const toggleloading = () => {
    setisloading((e) => !e);
  };

  const deleteUser = (userid) => {
    toggleloading();
    axios
      .get(`${REACT_APP_API_URL}api/admin/deleteuser.php?userid=${userid}`)
      .then((res) => {
        alert(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response.data);
      })
      .finally(() => {
        setTimeout(() => {
          toggleloading();
        }, 1000);
      });
  };

  const fetchUsers = () => {
    toggleloading();

    axios
      .get(`${REACT_APP_API_URL}api/admin/users.php`)
      .then((res) => {
        if (res.data.status === "success") {
          const data = Object.values(res.data.data);
          setusers(data);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      })
      .finally((e) => {
        setTimeout(() => {
          toggleloading();
        }, 1000);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    document.title = "admin / list of all registered users";
  }, []);

  return (
    <div class="page-content">
      <Header />
      <div class="container">
        <div class="card content-area content-area-mh">
          <div class="card-innr">
            <div class="card-head has-aside">
              <h4 class="card-title">All User List</h4>
              <div class="card-opt data-action-list d-block">
                <ul class="btn-grp btn-grp-block guttar-20px">
                  <li>
                    <a
                      href="/admin/users/create-user"
                      class="btn btn-auto btn-sm btn-primary"
                    >
                      <em class="fas fa-plus-circle"> </em>
                      <span>
                        Add <span class="d-none d-md-inline-block">User</span>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="table-responsive mt-3 p-3">
              <table className="table table-hover table-bordered-plain">
                <thead>
                  <tr>
                    <th>USER</th>
                    <th>EMAIL</th>
                    <th>WALLET</th>
                    <th>TOKEN</th>
                    <th>isAdmin ?</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {isloading ? (
                    <tr className="m-5">
                      <td class="spinner-border text-info" role="status">
                        <span class="">Loading...</span>
                      </td>
                    </tr>
                  ) : users ? (
                    users.map((user, item) => (
                      <tr key={item}>
                        <td>
                          <div class="d-flex align-items-center">
                            <div class="fake-class">
                              <span class="lead user-name text-wrap">
                                {user.fullname}
                              </span>
                              <br />
                              <span class="sub user-id">{user.userid}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span class="sub sub-s2 sub-email text-wrap">
                            {user.email}
                          </span>
                        </td>
                        <td>{user.wallet}</td>
                        <td>{user.act_bal}</td>
                        <td>{user.isadmin ? "YES" : "No"}</td>
                        <td>
                          <i
                            className="fa fa-trash text-danger mr-2"
                            onClick={(e) => deleteUser(user.userid)}
                          ></i>
                          <a href={`/admin/users/${user.userid}`}>
                            <i className="fa fa-edit text-info"></i>
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>no user found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
