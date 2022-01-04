import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Sector,
  Cell,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import DonutChart from "react-donut-chart";

import Header from "./components/Header/Header";
import MiniTransact from "./components/MiniTransact";

function Admin() {
  const { REACT_APP_API_URL } = process.env;
  const [ico, setico] = useState("");
  const [totaluser, settotaluser] = useState("");

  const [activeIndex, setactiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setactiveIndex(index);
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

  const total_user = () => {
    axios
      .get(`${REACT_APP_API_URL}api/admin/totalusers.php`)
      .then((res) => {
        if (res.data.status === "success") {
          settotaluser(res.data.data.users);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    current_ico();
    total_user();
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

  const purchasedUsd = purchased * price;
  const totaltokenUsd = qty * price;

  const formatedqty = parseInt(qty).toLocaleString();

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const data02 = [
    {
      name: "Weeks A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Weeks B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Weeks C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Weeks D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Weeks E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Weeks F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Weeks G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  useEffect(() => {
    document.title =
      "admin/ admin dashboard get glimpse of all details at once";
  }, []);

  return (
    <div>
      <Header />

      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="card height-auto">
                <div className="card-innr">
                  <div className="tile-header">
                    <h6 className="tile-title text-uppercase">
                      Token - {coin_name}
                    </h6>
                  </div>
                  <div className="tile-data">
                    <span className="tile-data-number">{formatedqty}</span>
                    <span
                      className="tile-data-status tile-data-active"
                      title="Sales %"
                      data-toggle="tooltip"
                      data-placement="right"
                    >
                      100%
                    </span>
                  </div>
                  <div className="tile-footer">
                    <div className="tile-recent">
                      <span className="tile-recent-number"></span>
                      <span className="tile-recent-text"></span>
                    </div>
                    <div className="tile-link">
                      <a
                        href="/admin/ico"
                        className="link link-thin link-ucap link-dim"
                      >
                        View
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card height-auto">
                <div className="card-innr">
                  <ul className="tile-nav nav">
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#view-kycs"
                      ></a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-toggle="tab"
                        href="#view-users"
                      >
                        User
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div className="tab-pane fade show active" id="view-users">
                      <div className="tile-header">
                        <h6 className="tile-title">Total Users</h6>
                      </div>
                      <div className="tile-data">
                        <span className="tile-data-number">{totaluser}</span>
                        <span
                          className="tile-data-status tile-data-active"
                          title="Verified"
                          data-toggle="tooltip"
                          data-placement="right"
                        >
                          100%
                        </span>
                      </div>
                      <div className="tile-footer">
                        <div className="tile-recent">
                          <span className="tile-recent-number"></span>
                          <span className="tile-recent-text"></span>
                        </div>
                        <div className="tile-link">
                          <a
                            href="/admin/users"
                            className="link link-thin link-ucap link-dim"
                          >
                            View
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="view-kycs">
                      <div className="tile-header">
                        <h6 className="tile-title">Total KYC</h6>
                      </div>
                      <div className="tile-data">
                        <span className="tile-data-number">107</span>
                        <span
                          className="tile-data-status tile-data-active"
                          title="Approved"
                          data-toggle="tooltip"
                          data-placement="right"
                        >
                          10%
                        </span>
                      </div>
                      <div className="tile-footer">
                        <div className="tile-recent">
                          <span className="tile-recent-number">0</span>
                          <span className="tile-recent-text">
                            since last week
                          </span>
                        </div>
                        <div className="tile-link">
                          <a
                            href="/admin/kyc-list"
                            className="link link-thin link-ucap link-dim"
                          >
                            View
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="token-statistics card card-token height-auto">
                <div className="card-innr">
                  <ul className="tile-nav nav">
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#view-fiat"
                      ></a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-toggle="tab"
                        href="#view-crypto"
                      >
                        Crypto
                      </a>
                    </li>
                  </ul>
                  <div className="token-balance token-balance-s3">
                    <div className="token-balance-text">
                      <h6 className="card-sub-title">AMOUNT COLLECTED</h6>
                      <span className="lead">
                        {parseInt(purchased) * price}
                        <span>
                          USD
                          <em
                            className="fas fa-info-circle fs-11"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Combined calculation of all transactions in base currency."
                          ></em>
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="tab-content">
                    <div className="tab-pane fade show active" id="view-crypto">
                      <div className="token-balance token-balance-s2">
                        <ul className="token-balance-list">
                          <li className="token-balance-sub">
                            <span className="lead">
                              {(parseInt(purchased) * price_eth).toFixed(3)}
                            </span>
                            <span className="sub">ETH</span>
                          </li>
                          <li className="token-balance-sub">
                            <span className="lead">
                              {(parseInt(purchased) * price_btc).toFixed(3)}
                            </span>
                            <span className="sub">BTC</span>
                          </li>
                          <li className="token-balance-sub">
                            <span className="lead">
                              {(parseInt(purchased) * price_bnb).toFixed(3)}
                            </span>
                            <span className="sub">BNB</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="tab-pane fade show" id="view-fiat">
                      <div className="token-balance token-balance-s2">
                        <ul className="token-balance-list">
                          <li className="token-balance-sub">
                            <span className="lead">968197.2</span>
                            <span className="sub">USD</span>
                          </li>
                          <li className="token-balance-sub">
                            <span className="lead">248170.458</span>
                            <span className="sub">EUR</span>
                          </li>
                          <li className="token-balance-sub">
                            <span className="lead">15686.327</span>
                            <span className="sub">GBP</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="token-transaction card card-full-height">
                <div className="card-innr">
                  <div className="card-head has-aside">
                    <h4 className="card-title card-title-sm">
                      Recent Transaction
                    </h4>
                    <div className="card-opt">
                      <a href="/admin/transactions" className="link ucap">
                        View ALL <em className="fas fa-angle-right ml-2"></em>
                      </a>
                    </div>
                  </div>
                  <MiniTransact />
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="token-sale-graph card card-full-height">
                <div className="card-innr">
                  <div className="card-head has-aside">
                    <h4 className="card-title card-title-sm">
                      Token Sale Graph
                    </h4>
                    <div className="card-opt">
                      <a
                        href="/admin"
                        className="link ucap link-light toggle-tigger toggle-caret"
                      >
                        15 Days
                      </a>
                      <div className="toggle-class dropdown-content">
                        <ul className="dropdown-list">
                          <li>
                            <a href="/admin?chart=7">7 Days</a>
                          </li>
                          <li>
                            <a href="/admin?chart=15">15 Days</a>
                          </li>
                          <li>
                            <a href="/admin?chart=30">30 Days</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="chart-tokensale chart-tokensale-long">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        width={500}
                        height={400}
                        data={data02}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="uv"
                          stroke="#8884d8"
                          fill="#8884d8"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="reg-statistic-graph card card-full-height">
                <div className="card-innr">
                  <div className="card-head has-aside">
                    <h4 className="card-title card-title-sm">
                      Registration Statistics
                    </h4>
                    <div className="card-opt">
                      <a
                        href="/admin/dashboard"
                        className="link ucap link-light toggle-tigger toggle-caret"
                      >
                        15 Days
                      </a>
                      <div className="toggle-class dropdown-content">
                        <ul className="dropdown-list">
                          <li>
                            <a href="/admin/dashboard">7 Days</a>
                          </li>
                          <li>
                            <a href="/admin/dashboard">15 Days</a>
                          </li>
                          <li>
                            <a href="/admin/dashboard">30 Days</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="chart-statistics mb-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart width={150} height={40} data={data}>
                        <Bar dataKey="uv" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="card card-full-height">
                <div className="card-innr">
                  <div className="phase-block guttar-20px">
                    <div className="fake-className">
                      <div className="card-head has-aside">
                        <h4 className="card-title card-title-sm">
                          Stage - {coin_name}
                        </h4>
                      </div>
                      <ul className="phase-status">
                        <li>
                          <div className="phase-status-title">Total</div>
                          <div className="phase-status-subtitle">
                            {formatedqty}
                          </div>
                        </li>
                        <li>
                          <div className="phase-status-title">Sold</div>
                          <div className="phase-status-subtitle">
                            {parseInt(purchased).toLocaleString()}{" "}
                            <span>*</span>
                          </div>
                        </li>
                        <li>
                          <div className="phase-status-title">Sale %</div>
                          <div className="phase-status-subtitle">
                            {(
                              (parseInt(purchased) / parseInt(qty)) *
                              100
                            ).toFixed(2)}
                            % Sold
                          </div>
                        </li>
                        <li>
                          <div className="phase-status-title">Unsold</div>
                          <div className="phase-status-subtitle">
                            {(
                              parseInt(qty) - parseInt(purchased)
                            ).toLocaleString()}
                          </div>
                        </li>
                      </ul>
                      <div className="notes">
                        * Not included pending token sales.
                      </div>
                    </div>
                    <div className="fake-className pt-3">
                      <div class="chart-phase pt-3">
                        <DonutChart
                          data={[
                            {
                              label: "Total Token",
                              value: parseInt(qty),
                            },
                            {
                              label: "Sold Token",
                              value: parseInt(purchased),
                            },
                          ]}
                          height={200}
                          width={200}
                          colors={["	#0000ff", "#00FF00"]}
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
  );
}

export default Admin;
