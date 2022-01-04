import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";

import Header from "./components/Header/Header";

function Settings() {
  const { REACT_APP_API_URL } = process.env;
  const history = useHistory();

  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");

  const [wallet, setwallet] = useState("");

  const [oldpassword, setoldpassword] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const [btc, setbtc] = useState("");
  const [eth, seteth] = useState("");
  const [bnb, setbnb] = useState("");
  const [usdt, setusdt] = useState("");
  const [instructions, setinstructions] = useState("");

  const paymentmethods = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("id", 1);
    formdata.append("update", "update");
    formdata.append("bitcoin", btc);
    formdata.append("ethereum", eth);
    formdata.append("bnb", bnb);
    formdata.append("usdt", usdt);
    formdata.append("instruction", instructions);

    axios
      .post(`${REACT_APP_API_URL}api/admin/paymentmethods.php`, formdata)
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

  const [isloading, setisloading] = useState(false);
  const [error, seterror] = useState("");

  const toggleloading = () => {
    setisloading((e) => !e);
  };

  const userid = sessionStorage.getItem("adminid");

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

  useEffect(() => {
    validatePass();
  }, [password, cpassword]);

  useEffect(() => {
    setemail(sessionStorage.getItem("email"));
    setfullname(sessionStorage.getItem("fullname"));

    axios
      .get(`${REACT_APP_API_URL}api/admin/paymentmethods.php?all=all`)
      .then((res) => {
        if (res.data.status === "success") {
          setbtc(res.data.data.bitcoin);
          seteth(res.data.data.ethereum);
          setbnb(res.data.data.bnb);
          setusdt(res.data.data.usdt)
          setinstructions(res.data.data.instructions);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }, []);

  useEffect(() => {
    document.title = "Settings/ Edit and view your details";
  }, []);

  return (
    <div>
      <Header />
      <div className="page-content">
        <div className="container">
          <div className="row ">
            <div className="main-content mx-auto col-lg-8">
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
              <div className="content-area card ">
                <div className="card-innr">
                  <div className="card-head">
                    <h4 className="card-title">Set Payment Wallets</h4>
                  </div>
                  <form
                    action=""
                    className="form-group"
                    onSubmit={paymentmethods}
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <div className="input-item input-with-label">
                          <label htmlFor="" className="input-item-label">
                            <i className="fa fa-btc mr-1 text-warning"></i>BTC
                            wallet
                          </label>
                          <div className="input-wrap">
                            <input
                              type="text"
                              value={btc}
                              onChange={(e) => setbtc(e.target.value)}
                              placeholder="Enter BTC wallet address"
                              className="input-bordered"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-item input-with-label">
                          <label htmlFor="" className="input-item-label">
                            <i className="fa fa-ethernet mr-1 text-warning"></i>
                            ETH wallet
                          </label>
                          <div className="input-wrap">
                            <input
                              type="text"
                              placeholder="Enter ETH wallet address"
                              className="input-bordered"
                              value={eth}
                              onChange={(e) => seteth(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-item input-with-label">
                          <label htmlFor="" className="input-item-label">
                            <i className="fa fa-coins mr-1 text-warning"></i>BNB
                            wallet
                          </label>
                          <div className="input-wrap">
                            <input
                              type="text"
                              placeholder="Enter BNB wallet address"
                              className="input-bordered"
                              value={bnb}
                              onChange={(e) => setbnb(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-item input-with-label">
                          <label htmlFor="" className="input-item-label">
                            <i className="fa fa-coins mr-1 text-warning"></i>USDT
                            wallet
                          </label>
                          <div className="input-wrap">
                            <input
                              type="text"
                              placeholder="Enter BNB wallet address"
                              className="input-bordered"
                              value={usdt}
                              onChange={(e) => setusdt(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="input-item input-with-label">
                          <label htmlFor="" className="input-item-label">
                            <i className="fa fa-coins mr-1 text-warning"></i>
                            special instructions,can inlcude the network for a
                            wallet or any special wallet of choice
                          </label>
                          <div className="input-wrap">
                            <textarea
                              className="input-bordered"
                              value={instructions}
                              onChange={(e) => setinstructions(e.target.value)}
                            >
                              Enter Instructions
                            </textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                      Update
                    </button>
                  </form>
                  <div className="gaps-2x d-sm-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
