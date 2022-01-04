import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from "../components/shared/Header/Header";
import logo from "../assets/images/Whales Inu-01.svg";

function Contribute() {
  const { REACT_APP_API_URL } = process.env;

  const [user, setuser] = useState("");
  const [ico, setico] = useState("");

  const [paymethod, setpaymethod] = useState("");

  const [amount, setamount] = useState("");
  const [calprice, setcalprice] = useState(0);
  const [wallet, setwallet] = useState("");

  const calculator = () => {
    const done = amount * price;
    setcalprice(done);
  };

  const bonus = (10 / 100) * amount;
  const total = parseInt(bonus) + parseInt(amount);

  const [selected, setselected] = useState("bitcoin");

  const changeSelected = (name) => {
    setselected(name);
  };

  const contribute = () => {
    const formdata = new FormData();
    formdata.append("userid", userid);
    formdata.append("coin_id", coin_id);
    formdata.append("qty", total);
    formdata.append("price", calprice);
    formdata.append("currency", selected);
    formdata.append("wallet", wallet);

    axios
      .post(`${REACT_APP_API_URL}api/user/depositrequest.php`, formdata)
      .then((res) => {
        if (res.data.status === "success") {
          alert(res.data.message);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const userid = sessionStorage.getItem("userid");

  const getUser = () => {
    axios
      .get(`${REACT_APP_API_URL}api/user/userdetails.php?userid=${userid}`)
      .then((res) => {
        if (res.data.status === "success") {
          setuser(res.data.data);
          setwallet(res.data.data.wallet)
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

  const getPaymentMethod = () => {
    axios
      .get(`${REACT_APP_API_URL}api/admin/paymentmethods.php?all=all`)
      .then((res) => {
        if (res.data.status === "success") {
          setpaymethod(res.data.data);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  useEffect(() => {
    getUser();
    current_ico();
    getPaymentMethod();
  }, []);

  useEffect(() => {
    calculator();
  }, [amount]);

  const {
    coin_id,
    coin_name,
    price,
    price_bnb,
    price_btc,
    price_eth,
    qty,
    purchased,
    statuz,
    ends_on,
  } = ico;

  const usd = price * user.act_bal;
  const bnb = (user.act_bal / price) * price_bnb;
  const btc = (user.act_bal / price) * price_btc;
  const purchasedUsd = purchased * price_bnb;
  const totaltokenUsd = qty * price_bnb;

  useEffect(() => {
    document.title = "contribute to the growth of whalesinu and be rewarded";
  }, []);

  const seperatePayment = () => {
    switch (selected) {
      case "bitcoin":
        return paymethod.bitcoin;
        break;
      case "ethereum":
        return paymethod.ethereum;
        break;
      case "bnb":
        return paymethod.bnb;
        break;
        case "usdt":
          return paymethod.usdt;
          break;
      default:
        break;
    }
  };

  return (
    <div className="user-dashboard page-user theme-modern">
      <Header />
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="main-content  col-lg-8">
              <div className="content-area card">
                <div className="card-innr">
                  <form action="" method="post" className="token-purchase">
                    <div className="card-head">
                      <h4 className="card-title">
                        Choose currency and calculate WHALESINU token price
                      </h4>
                    </div>
                    <div className="card-text">
                      <p>
                        You can buy our WHALESINU token using the below currency
                        choices to become part of our project.
                      </p>
                    </div>

                    <div className="token-currency-choose payment-list">
                      <div className="row guttar-15px">
                        <div className="col-6">
                          <div
                            className="payment-item pay-option"
                            onClick={(e) => changeSelected("ethereum")}
                          >
                            {selected === "ethereum" ? (
                              <input
                                className="pay-option-check pay-method"
                                type="radio"
                                id="payeth"
                                name="paymethod"
                                value="eth"
                                defaultChecked
                              />
                            ) : (
                              <input
                                className="pay-option-check pay-method"
                                type="radio"
                                id="payeth"
                                name="paymethod"
                                value="eth"
                              />
                            )}
                            <label className="pay-option-label" for="payeth">
                              <span className="pay-title">
                                <em className="pay-icon pay-icon-eth ikon ikon-sign-eth"></em>
                                <span className="pay-cur">ETH</span>
                              </span>
                              <span className="pay-amount">
                                {price_eth} ETH
                              </span>
                            </label>
                          </div>
                        </div>
                        <div className="col-6">
                          <div
                            className="payment-item pay-option"
                            onClick={(e) => changeSelected("bnb")}
                          >
                            {selected === "bnb" ? (
                              <input
                                className="pay-option-check pay-method"
                                type="radio"
                                id="paybnb"
                                name="paymethod"
                                value="bnb"
                                defaultChecked
                              />
                            ) : (
                              <input
                                className="pay-option-check pay-method"
                                type="radio"
                                id="paybnb"
                                name="paymethod"
                                value="bnb"
                              />
                            )}
                            <label className="pay-option-label" for="paybnb">
                              <span className="pay-title">
                                <em className="pay-icon pay-icon-bnb ikon ikon-sign-bnb"></em>
                                <span className="pay-cur">BNB</span>
                              </span>
                              <span className="pay-amount">
                                {price_bnb} BNB
                              </span>
                            </label>
                          </div>
                        </div>
                        <div className="col-6">
                          <div
                            className="payment-item pay-option"
                            onClick={(e) => changeSelected("bitcoin")}
                          >
                            {" "}
                            {selected === "bitcoin" ? (
                              <input
                                className="pay-option-check pay-method"
                                type="radio"
                                id="payusdt"
                                name="paymethod"
                                value="btc"
                                defaultChecked
                              />
                            ) : (
                              <input
                                className="pay-option-check pay-method"
                                type="radio"
                                id="paybtc"
                                name="paymethod"
                                value="btc"
                              />
                            )}
                            <label className="pay-option-label" for="paybtc">
                              <span className="pay-title">
                                <em className="pay-icon pay-icon-usdt ikon ikon-sign-usdt"></em>
                                <span className="pay-cur">BTC</span>
                              </span>
                              <span className="pay-amount">
                                {price_btc} BTC
                              </span>
                            </label>
                          </div>
                        </div>

                        <div className="col-6">
                          <div
                            className="payment-item pay-option"
                            onClick={(e) => changeSelected("usdt")}
                          >
                            {" "}
                            {selected === "usdt" ? (
                              <input
                                className="pay-option-check pay-method"
                                type="radio"
                                id="payusdt"
                                name="paymethod"
                                value="usdt"
                                defaultChecked
                              />
                            ) : (
                              <input
                                className="pay-option-check pay-method"
                                type="radio"
                                id="payusdt"
                                name="paymethod"
                                value="usdt"
                              />
                            )}
                            <label className="pay-option-label" for="payusdt">
                              <span className="pay-title">
                                <em className="pay-icon pay-icon-usdt ikon ikon-sign-usdt"></em>
                                <span className="pay-cur">USDT</span>
                              </span>
                              <span className="pay-amount">
                                {price} USDT
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-head">
                      <h4 className="card-title">Amount of contribute</h4>
                    </div>
                    <div className="card-text">
                      <p>
                        Enter the amount you would like to contribute in order
                        to calculate the amount of tokens you will receive. The
                        calculator below helps to convert the required quantity
                        of tokens into the amount of your selected currency.
                      </p>
                    </div>
                    <div className="token-contribute">
                      <div className="token-calc">
                        <div className="token-pay-amount payment-get">
                          <input
                            className="input-bordered input-with-hint token-number"
                            type="text"
                            id="token-number"
                            value={amount}
                            onChange={(e) => setamount(e.target.value)}
                            min="3000000"
                            max="50000000"
                            required
                          />
                          <div className="token-pay-currency">
                            <span className="input-hint input-hint-sap payment-get-cur payment-cal-cur ucap">
                              WHALES
                            </span>
                          </div>
                        </div>
                        <div className="token-received token-received-alt">
                          <div className="token-eq-sign">=</div>
                          <div className="token-received-amount">
                            <h5 className="token-amount pay-amount-u">
                              {calprice.toFixed(2)}
                            </h5>
                            <div className="token-symbol pay-currency ucap">
                              USD
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="token-calc-note note note-plane token-note">
                        <div className="note-box">
                          <span className="note-icon">
                            <em className="fas fa-info-circle"></em>
                          </span>
                          <span className="note-text text-light">(
                            <strong className="min-token">30,000,000</strong>
                            <span className="token-symbol ucap">WHALES</span>
                            ) Minimum contribution amount is required.
                          </span>
                        </div>
                        <div className="note-text note-text-alert"></div>
                      </div>
                    </div>

                    <div className="token-overview-wrap">
                      <div className="token-overview">
                        <div className="row">
                          <div className="col-md-4 col-sm-6">
                            <div className="token-bonus token-bonus-sale">
                              <span className="token-overview-title">
                                + Sale Bonus 10%
                              </span>
                              <span className="token-overview-value bonus-on-sale tokens-bonuses-sale">
                                {bonus}
                              </span>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="token-total">
                              <span className="token-overview-title font-bold">
                                Total WHALES
                              </span>
                              <span className="token-overview-value token-total-amount text-primary payment-summary-amount tokens-total">
                                {total}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="note note-plane note-danger note-sm pdt-1x pl-0">
                        <p>
                          Your contribution will be calculated based on exchange
                          rate at the moment when your transaction is confirmed.
                        </p>
                      </div>
                    </div>

                    <div className="pay-buttons">
                      <div className="pay-buttons pt-0">
                        {amount ? (
                          <a
                            data-type="offline"
                            href="javascript:void(0)"
                            className="btn btn-primary btn-between payment-btn  token-payment-btn offline_payment"
                            data-toggle="modal"
                            data-target="#exampleModal"
                          >
                            Make Payment&nbsp;<i className="fa fa-wallet"></i>
                          </a>
                        ) : (
                          <a
                            data-type="offline"
                            href="javascript:void(0)"
                            className="btn btn-primary btn-between payment-btn  token-payment-btn offline_payment"
                          >
                            Make Payment&nbsp;<i className="fa fa-wallet"></i>
                          </a>
                        )}
                      </div>

                      <div
                        className="modal fade"
                        id="exampleModal"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="exampleModalLabel"
                              >
                                Confirm Your Payment
                              </h5>
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <h3 className="text-success">
                                Your Contribution order has been placed
                                successfully
                              </h3>
                              <p>
                                please send the sum Equivalent of $
                                {calprice.toFixed(5)} in {selected} to the
                                address below.The token balance of your account
                                will show only after 3 confirmatiom and approved
                                by our team
                              </p>
                              <h4>
                                payment to the following {selected} address
                              </h4>
                              <p>{selected} :{seperatePayment()}</p>
                         
                              <div className="note note-plane note-danger note-sm pdt-1x pl-0">
                                <p>
                                  For faster confirmation pls paste the wallet
                                  address u will be making payment from
                                </p>
                              </div>
                              <div className="col mt-2 ml-0 pl-0">
                                <input
                                  type="text"
                                  placeholder="Enter WAllet Address"
                                  value={wallet}
                                  onChange={(e) => setwallet(e.target.value)}
                                  className="input-bordered"
                                  required
                                />
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                onClick={(e) => contribute()}
                                className="btn btn-primary"
                              >
                                Confirm
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pay-notes">
                        <div className="note note-plane note-light note-md font-italic">
                          <em className="fas fa-info-circle"></em>
                          <p>
                            Tokens will appear in your account after payment
                            successfully made and approved by our team. Please
                            note that, WHALESINU token will be distributed after
                            the token sales end-date.
                          </p>
                        </div>
                      </div>
                    </div>
                    <input type="hidden" id="data_amount" value="0" />
                    <input type="hidden" id="data_currency" value="BNB" />
                  </form>
                </div>
              </div>
            </div>

            <div className="aside sidebar-right col-lg-4">
              <div className="token-statistics card card-token">
                <div className="card-innr">
                  <div className="token-balance token-balance-with-icon">
                    <div className="token-balance-icon">
                      <img src={logo} alt="" />
                    </div>
                    <div className="token-balance-text">
                      <h6 className="card-sub-title">Token Balance</h6>
                      <span className="lead">
                        {user ? user.act_bal : 0}
                        <span className="pl-2">
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
                    <h6 className="card-sub-title">Your Contribution in</h6>
                    <ul className="token-balance-list">
                      <li className="token-balance-sub">
                        <span className="lead">{usd.toFixed(1)}</span>
                        <span className="sub">USD</span>
                      </li>
                      <li className="token-balance-sub">
                        <span className="lead">~</span>
                        <span className="sub">BNB</span>
                      </li>
                      <li className="token-balance-sub">
                        <span className="lead">~</span>
                        <span className="sub">BTC</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="token-sales card">
                <div className="card-innr">
                  <div className="card-head">
                    <h5 className="card-title card-title-sm">Token Sales</h5>
                  </div>
                  <div className="token-rate-wrap row">
                    <div className="token-rate col-md-6 col-lg-12">
                      <span className="card-sub-title">
                        WHALESINU Token Price
                      </span>
                      <h4 className="font-mid text-dark">
                        1 WHALES = <span>{price} USD</span>
                      </h4>
                    </div>
                    <div className="token-rate col-md-6 col-lg-12">
                      <span className="card-sub-title">Exchange Rate</span>
                      <span>
                        1 USD = {price} = {price_bnb} BNB
                      </span>
                    </div>
                  </div>
                  <div className="token-bonus-current">
                    <div className="fake-className">
                      <span className="card-sub-title">Current Bonus</span>
                      <div className="h3 mb-0">10 %</div>
                    </div>
                    <div className="token-bonus-date">
                      End at
                      <br />
                      {ends_on}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card card-sales-progress mb-0">
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
  );
}

export default Contribute;
