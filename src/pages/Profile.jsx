import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";

import Header from "../components/shared/Header/Header";

function Profile() {
  const { REACT_APP_API_URL } = process.env;
  const history = useHistory();

  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");

  const [wallet, setwallet] = useState("");

  const [oldpassword, setoldpassword] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const [isloading, setisloading] = useState(false);
  const [error, seterror] = useState("");

  const toggleloading = () => {
    setisloading((e) => !e);
  };

  const userid = sessionStorage.getItem("userid");

  const addwallet = () => {
    const formdata = new FormData();
    formdata.append("userid", userid);
    formdata.append("wallet", wallet);

    axios
      .post(`${REACT_APP_API_URL}api/auth/addWallet.php`, formdata)
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          alert(res.data.message);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });

    return false;
  };

  const updatedetails = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("userid", userid);
    formdata.append("fullname", fullname);
    formdata.append("email", email);

    axios
      .post(`${REACT_APP_API_URL}api/auth/updatesettings.php`, formdata)
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          alert(res.data.message);
          sessionStorage.clear();
          history.push("/");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });

    return false;
  };

  const handleChange = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("userid", userid);
    formdata.append("oldpassword", oldpassword);
    formdata.append("newpassword", password);
    formdata.append("email", email);

    axios
      .post(`${REACT_APP_API_URL}api/auth/changepassword.php`, formdata)
      .then((res) => {
        if (res.data.status === "success") {
          alert(res.data.message);
          sessionStorage.clear();
          history.push("/");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });

    return false;
  };

  const validatePass = () => {
    if (password !== "") {
      if (password.length > 6) {
        if (cpassword !== "") {
          if (password === cpassword) {
            seterror("");
          } else {
            seterror("passwords do not match ");
          }
        } else {
          seterror("");
        }
      } else {
        seterror("password length is too small ");
      }
    } else {
      seterror("");
    }
  };

  const copyTextToClipboard = (text) => {
    if ("clipboard" in navigator) {
      navigator.clipboard.writeText(text);
      alert(text + " copied successfully");
    } else {
      document.execCommand("copy", true, text);
      alert(text + " copied successfully ");
    }
  };

  useEffect(() => {
    validatePass();
  }, [password, cpassword]);

  useEffect(() => {
    setemail(sessionStorage.getItem("email"));
    setfullname(sessionStorage.getItem("fullname"));
    setwallet(sessionStorage.getItem('wallet'))
  }, []);

  useEffect(() => {
    document.title = "profile/ Edit and view your details";
  }, []);

  return (
    <div>
      <Header />
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="main-content col-lg-8">
              <div className="content-area card">
                <div className="card-innr">
                  <div className="card-head">
                    <h4 className="card-title">Profile Details</h4>
                  </div>
                  <ul className="nav nav-tabs nav-tabs-line" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-toggle="tab"
                        href="#personal-data"
                      >
                        Personal Data
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#password"
                      >
                        Password
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="profile-details">
                    <div
                      className="tab-pane fade show active"
                      id="personal-data"
                    >
                      <form
                        className="validate-modern"
                        id="nio-user-personal"
                        autoComplete="off"
                        onSubmit={updatedetails}
                      >
                        <div className="row">
                          <div className="col-md-6">
                            <div className="input-item input-with-label">
                              <label
                                htmlFor="full-name"
                                className="input-item-label"
                              >
                                Full Name
                              </label>
                              <div className="input-wrap">
                                <input
                                  className="input-bordered"
                                  type="text"
                                  id="full-name"
                                  name="name"
                                  required="required"
                                  placeholder="Enter Full Name"
                                  minLength="3"
                                  value={fullname}
                                  onChange={(e) => setfullname(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-item input-with-label">
                              <label
                                htmlFor="email-address"
                                className="input-item-label"
                              >
                                Email Address
                              </label>
                              <div className="input-wrap">
                                <input
                                  className="input-bordered"
                                  type="text"
                                  id="email-address"
                                  name="email"
                                  required="required"
                                  placeholder="Enter Email Address"
                                  value={email}
                                  onChange={(e) => setemail(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="gaps-1x"></div>
                        <div className="d-sm-flex justify-content-between align-items-center">
                          <button type="submit" className="btn btn-primary">
                            Update Profile
                          </button>
                          <div className="gaps-2x d-sm-none"></div>
                        </div>
                      </form>
                    </div>

                    <div className="tab-pane fade" id="password">
                      <form onSubmit={handleChange}>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="input-item input-with-label">
                              <label
                                htmlFor="old-pass"
                                className="input-item-label"
                              >
                                Old Password
                              </label>
                              <div className="input-wrap">
                                <input
                                  className="input-bordered"
                                  type="password"
                                  name="old-password"
                                  id="old-pass"
                                  value={oldpassword}
                                  onChange={(e) =>
                                    setoldpassword(e.target.value)
                                  }
                                  required="required"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {error ? (
                          <div className="bg-warning text-light mb-2 pl-2">
                            {error}
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="row">
                          <div className="col-md-6">
                            <div className="input-item input-with-label">
                              <label
                                htmlFor="new-pass"
                                className="input-item-label"
                              >
                                New Password
                              </label>
                              <div className="input-wrap">
                                <input
                                  className="input-bordered"
                                  id="new-pass"
                                  type="password"
                                  name="new-password"
                                  required="required"
                                  value={password}
                                  onChange={(e) => setpassword(e.target.value)}
                                  minLength="6"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="input-item input-with-label">
                              <label
                                htmlFor="confirm-pass"
                                className="input-item-label"
                              >
                                Confirm New Password
                              </label>
                              <div className="input-wrap">
                                <input
                                  id="confirm-pass"
                                  className="input-bordered"
                                  type="password"
                                  name="re-password"
                                  value={cpassword}
                                  onChange={(e) => setcpassword(e.target.value)}
                                  data-msg-equalto="Password not match."
                                  required="required"
                                  minLength="6"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="note note-plane note-info pdb-1x">
                          <em className="fas fa-info-circle"></em>
                          <p>
                            Password should be a minimum of 6 digits and include
                            lower and uppercase letter.
                          </p>
                        </div>
                        <div className="gaps-1x"></div>
                        <div className="d-sm-flex justify-content-between align-items-center">
                          {isloading ? (
                            <button className="btn btn-info btn-block">
                              Updating..
                            </button>
                          ) : (
                            <button
                              type="submit"
                              className="btn btn-primary btn-block"
                            >
                              Update
                            </button>
                          )}
                          <div className="gaps-2x d-sm-none"></div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-area card">
                <div className="card-innr">
                  <div className="card-head">
                    <h4 className="card-title">Two-Factor Verification</h4>
                  </div>
                  <p>
                    Two-factor authentication is a method for protection of your
                    account. When it is activated you are required to enter not
                    only your password, but also a special code. You can receive
                    this code in mobile app. Even if third party gets access to
                    your password, they still won't be able to access your
                    account without the 2FA code.
                  </p>
                  <div className="d-sm-flex justify-content-between align-items-center pdt-1-5x">
                    <span className="text-light ucap d-inline-flex align-items-center">
                      <span className="mb-0">
                        <small>Current Status:</small>
                      </span>
                      <span className="badge badge-disabled ml-2">
                        Disabled
                      </span>
                    </span>
                    <div className="gaps-2x d-sm-none"></div>
                    <button
                      type="button"
                      data-toggle="modal"
                      data-target="#g2fa-modal"
                      className="order-sm-first btn btn-primary"
                    >
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="aside sidebar-right col-lg-4">
              <div className="account-info card">
                <div className="card-innr">
                  <div className="user-account-status">
                    <h6 className="card-title card-title-sm">
                      Your Account Status
                    </h6>
                    <div className="gaps-1-5x"></div>
                    <ul className="btn-grp">
                      <li>
                        <a href="" className="btn btn-xs btn-auto btn-success">
                          Email Verified
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="gaps-2-5x"></div>
                  <div className="user-receive-wallet">
                    <h6 className="card-title card-title-sm">
                      Receiving Wallet
                    </h6>
                    <div className="gaps-1x"></div>
                    <div className="">
                      <form
                        action=""
                        className="form-group d-flex justify-content-between"
                      >
                        <input
                          type="text"
                          name=""
                          value={wallet}
                          onChange={(e) => setwallet(e.target.value)}
                          className="form-control form-control-sm mr-1 "
                          placeholder="Enter Receiving Address"
                        />
                        <a
                          onClick={(e) => addwallet()}
                          className="user-wallet link link-ucap"
                        >
                          Add
                        </a>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="referral-info card">
                <div className="card-innr">
                  <div className="card-head has-aside">
                    <h6 className="card-title card-title-sm">
                      Earn with Referral
                    </h6>
                    <div className="card-opt">
                      <a href="/user/dashboard" className="link ucap">
                        More<em className="fas fa-angle-right ml-1"></em>
                      </a>
                    </div>
                  </div>
                  <p className="pdb-0-5x">
                    <strong>Invite your friends & family.</strong>
                  </p>
                  <div className="copy-wrap mgb-0-5x">
                    <span className="copy-feedback"></span>
                    <em className="copy-icon fas fa-link"></em>
                    <input
                      type="text"
                      className="copy-address"
                      value={window.location.hostname + "/register/" + email}
                      disabled
                    />
                    <button
                      className="copy-trigger copy-clipboard"
                      onClick={(e) =>
                        copyTextToClipboard(
                          window.location.hostname + "/register/" + email
                        )
                      }
                    >
                      <i className="fa fa-copy"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
