import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/shared/Header/Header";
import logo from "../assets/images/Whales Inu-01.svg";

function Home() {
  const { REACT_APP_API_URL } = process.env;

  const [user, setuser] = useState("");
  const [ico, setico] = useState("");

  const [wallet, setwallet] = useState("");

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

  const userid = sessionStorage.getItem("userid");
  const getUser = () => {
    axios
      .get(`${REACT_APP_API_URL}api/user/userdetails.php?userid=${userid}`)
      .then((res) => {
        if (res.data.status === "success") {
          setuser(res.data.data);
          setwallet(res.data.data.wallet)
          sessionStorage.getItem("wallet",res.data.data.wallet)
          sessionStorage.setItem("bal",res.data.data.act_bal)
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const current_ico = () => {
    axios
      .get(`${REACT_APP_API_URL}api/coin/current_ico.php`)
      .then((res) => {
        if (res.data.status === "success") {
          setico(res.data.data);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    getUser();
    current_ico();
  }, []);

  const {
    coin_name,
    price,
    price_bnb,
    price_btc,
    price_eth,
    qty,
    purchased,
    statuz,
  } = ico;

  const usd = price * user.act_bal;
  const bnb = (user.act_bal / price) * price_bnb;
  const btc = (user.act_bal / price) * price_btc;
  const purchasedUsd = purchased * price_bnb;
  const totaltokenUsd = qty * price_bnb;

  useEffect(() => {
    document.title =
      "welcome to your WhalesInu Dashboard " + sessionStorage.getItem("email");
  }, []);

  return (
    <main className="user-dashboard page-user theme-modern">
      <Header />
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="main-content col-lg-12">
              <div className="content-area user-account-dashboard">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="token-statistics card card-token card-full-height">
                      <div className="card-innr">
                        <div className="token-balance token-balance-with-icon">
                          <div className="token-balance-icon">
                            <img src={logo} alt="" />
                          </div>
                          <div className="token-balance-text">
                            <h6 className="card-sub-title">Token Balance</h6>
                            <span className="lead">
                              {user ? user.act_bal : 0}
                              <span className="pl-1">
                                WHALES
                                <em
                                  className="fas fa-info-circle fs-11"
                                  data-toggle="tooltip"
                                  data-placement="right"
                                  title="Equivalent to ~ USD"
                                ></em>
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="token-balance token-balance-s2">
                          <h6 className="card-sub-title">
                            Your Contribution in
                          </h6>
                          <ul className="token-balance-list">
                            <li className="token-balance-sub">
                              <span className="lead">{usd.toFixed(1)}</span>
                              <span className="sub">USD</span>
                            </li>
                            <li className="token-balance-sub">
                              <span className="lead">
                                ~
                              </span>
                              <span className="sub">BNB</span>
                            </li>
                            <li className="token-balance-sub">
                              <span className="lead">
                                ~
                              </span>
                              <span className="sub">BTC</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="card card-full-height">
                      <div className="card-innr">
                        <h6 className="card-title card-title-sm">
                          {!!statuz ? (
                            <>
                              {coin_name}
                              <span className="badge badge-success ucap">
                                Running
                              </span>
                            </>
                          ) : (
                            <>
                              {coin_name}
                              <span className="badge badge-info ucap">
                                completed
                              </span>
                            </>
                          )}
                        </h6>
                        <h3 className="text-dark">
                          1 WHALES = {price}
                          <span className="d-block text-exlight ucap fs-12">
                            1 USD = {price_eth} ETH
                          </span>
                        </h3>
                        <div className="gaps-0-5x"></div>
                        <div className="d-flex align-items-center justify-content-between mb-0">
                          <a
                            href="/user/contribute"
                            className="btn btn-md btn-primary"
                          >
                            Buy Token Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="account-info card card-full-height">
                      <div className="card-innr">
                        <div className="user-account-status">
                          <h6 className="card-title card-title-sm">
                            Your Account Status
                          </h6>
                          <div className="gaps-1-5x"></div>
                          <ul className="btn-grp">
                            <li>
                              <a
                                href=""
                                className="btn btn-xs btn-auto btn-success"
                              >
                                Email Verified
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="gaps-2x"></div>
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
                  </div>
                  <div className="col-12 col-lg-7">
                    <div className="card content-welcome-block card-full-height">
                      <div className="card-innr">
                        <div className="row guttar-vr-20px">
                          <div className="col-sm-5 col-md-4">
                            <div className="card-image card-image-sm">
                              <img width="240" src={logo} alt="" />
                            </div>
                          </div>
                          <div className="col-sm-7 col-md-8">
                            <div className="card-content">
                              <h4>Whales Inu: Owned and Ruled By it's Community</h4>

                              <p>Be Part of the $Whales, Meme Token Movers..</p> 

                              <p> Hold whales Inu and get rewarded</p> 
                              
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-block d-md-none gaps-0-5x mb-0"></div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-5">
                    <div className="card card-sales-progress card-full-height">
                      <div className="card-innr">
                        <div className="card-head">
                          <h5 className="card-title card-title-sm">
                            Token Sales Progress
                          </h5>
                        </div>
                        <ul className="progress-info">
                          <li>
                            <span>
                              Raised Amount <br />
                            </span>
                            {purchasedUsd.toFixed(3)} BNB
                          </li>
                          <li>
                            <span>
                              Total Token <br />
                            </span>
                            {totaltokenUsd.toFixed(3)} BNB
                          </li>
                        </ul>
                        <div className="mt-3">
                          <input
                            type="range"
                            max={qty}
                            min={0}
                            value={purchased}
                            className="col"
                            name=""
                            id=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
