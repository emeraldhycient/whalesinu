import React, { useState } from "react";
import logo from "../../../assets/images/Whales Inu 1-01.svg";
import { logout } from "../../../auth/auth";

function Header() {
  const [showtooltip, setshowtooltip] = useState(false);
  const toggletooltip = () => {
    setshowtooltip((prev) => !prev);
  };

  const [togglenav, settogglenav] = useState(false);
  const toggler = () => [settogglenav((prev) => !prev)];

  const username = sessionStorage.getItem("fullname");
  const email = sessionStorage.getItem("email");
  const userid = sessionStorage.getItem("userid");

  return (
    <header>
      <div className="topbar-wrap">
        <div className="topbar is-sticky">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <ul className="topbar-nav d-lg-none">
                <li className="topbar-nav-item relative">
                  <a className="toggle-nav" onClick={(e) => toggler()}>
                    <div className="toggle-icon">
                      <span className="toggle-line"></span>
                      <span className="toggle-line"></span>
                      <span className="toggle-line"></span>
                      <span className="toggle-line"></span>
                    </div>
                  </a>
                </li>
              </ul>

              <a className="m-0 p-0" href="/">
                <img
                  height="100px"
                  className="m-0 p-0"
                  src={logo}
                  alt="whalesinu"
                />
              </a>
              <ul className="topbar-nav">
                <li className="topbar-nav-item relative">
                  <span className="user-welcome d-none d-lg-inline-block">
                    Welcome! {username ? username : "unkown user"}
                  </span>
                  <div
                    className="toggle-tigger user-thumb"
                    onClick={(e) => toggletooltip()}
                  >
                    <em className="fa fa-user"></em>
                  </div>
                  {showtooltip ? (
                    <div className="toggle-className dropdown-content dropdown-content-right dropdown-arrow-right user-dropdown">
                      <div className="user-status bg-primary">
                        <h6 className="text-white">
                          {email ? email : "unkown user"}
                          <small className="text-white-50">
                            ({userid ? userid : "UD04620"})
                          </small>
                        </h6>
                        <h6 className="user-status-title">Token Balance</h6>
                        <div className="user-status-balance">
                          {sessionStorage.getItem('bal')} <small>WHALESINU</small>
                        </div>
                      </div>
                      <ul className="user-links">
                        <li>
                          <a href="/user/profile">
                            <i className="fa fa-id-badge mr-1"></i>My Profile
                          </a>
                        </li>
                      </ul>
                      <ul className="user-links bg-light">
                        <li>
                          <a onClick={(e) => logout()}>
                            <i className="fa fa-power-off mr-1"></i>Logout
                          </a>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={"navbar" + (togglenav ? "toggle-nav" : "")}>
          <div className="container">
            <div className="navbar-innr">
              <ul className="navbar-menu" id="main-nav">
                <li>
                  <a href="/user/dashboard">
                    <i
                      className="fa fa-border-all pr-2"
                      style={{ fontSize: 21 }}
                    ></i>{" "}
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="/user/contribute">
                    <i
                      className="fa fa-coins pr-2"
                      style={{ fontSize: 21 }}
                    ></i>{" "}
                    Buy Token
                  </a>
                </li>
                <li>
                  <a href="/user/transactions">
                    <i
                      className="fa fa-random pr-2"
                      style={{ fontSize: 21 }}
                    ></i>{" "}
                    Transactions
                  </a>
                </li>
                <li>
                  <a href="/user/profile">
                    <i
                      className="fa fa-id-card pr-2"
                      style={{ fontSize: 21 }}
                    ></i>{" "}
                    Profile
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
