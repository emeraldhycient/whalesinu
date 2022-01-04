import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header/Header";

function Ico() {
  const { REACT_APP_API_URL } = process.env;

  const [isloading, setisloading] = useState(false);
  const [error, seterror] = useState("");

  const toggleloading = () => {
    setisloading((e) => !e);
  };

  const [icos, seticos] = useState("");

  const get_all_ico = () => {
    toggleloading();

    axios
      .get(`${REACT_APP_API_URL}/api/coin/all_ico.php`)
      .then((res) => {
        if (res.data.status === "success") {
          const data = Object.values(res.data.data);
          seticos(data);
          console.log(res.data.data);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        error(err);
      })
      .finally((done) => {
        setTimeout(() => {
          toggleloading();
        }, 1000);
      });
  };

  useEffect(() => {
    get_all_ico();
  }, []);

  const deleteIco = (coin_id) => {
    axios
      .get(`${REACT_APP_API_URL}/api/coin/delete.php?coin_id=${coin_id}`)
      .then((res) => {
        if (res.data.status === "success") {
          alert(res.data.message);
          window.location.reload();
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        error(err);
      });
  };

  const mark_active = (coin_id) => {
    axios
      .get(`${REACT_APP_API_URL}/api/coin/activate.php?coin_id=${coin_id}`)
      .then((res) => {
        if (res.data.status === "success") {
          alert(res.data.message);
          window.location.reload();
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        error(err);
      });
  };

  useEffect(() => {
    document.title = "admin/ create ,edit and view all icos";
  }, []);
  return (
    <div>
      <Header />
      <div class="page-content">
        <div class="container">
          <div class="card content-area">
            <div class="card-innr">
              <div class="card-head d-flex justify-content-between align-items-center">
                <h4 class="card-title mb-0">Available ICO/STO Stage</h4>

                <a
                  href="/admin/ico/create-ico"
                  class="btn btn-auto btn-sm btn-primary"
                >
                  <em class="fas fa-plus-circle"> </em>
                  <span>
                    Create <span class="d-none d-md-inline-block">Ico</span>
                  </span>
                </a>
              </div>
              <div class="gaps-1-5x"></div>
              <div class="row guttar-vr-30px">
                {!isloading ? (
                  icos ? (
                    icos.map((ico, i) => (
                      <div class="col-xl-4 col-md-6">
                        <div class="stage-item stage-card ">
                          <div class="stage-head">
                            <div class="stage-title">
                              <h6>{ico.coin_name} </h6>
                              {parseInt(ico.statuz) ? (
                                <span class="badge badge-success">Running</span>
                              ) : (
                                <span class="badge badge-danger">Inactive</span>
                              )}
                              <h4>ICO Stage</h4>
                            </div>

                            <div class="stage-action dropdown">
                              <button
                                className="dropdown-toggle border"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <em class="fa fa-ellipsis-v"></em>
                              </button>
                              <div
                                class="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <ul class="dropdown-list">
                                  <li>
                                    {parseInt(ico.statuz) ? (
                                      ""
                                    ) : (
                                      <a
                                        href="javascript:void(0);"
                                        className="stages-ajax-action"
                                        data-action="overview"
                                        data-view="modal"
                                        data-stage="1"
                                        onClick={(e) =>
                                          mark_active(ico.coin_id)
                                        }
                                      >
                                        Activate
                                      </a>
                                    )}
                                  </li>
                                  <li onClick={(e) => deleteIco(ico.coin_id)}>
                                    <a>
                                      Delete
                                      <i className="fa fa-trash text-danger ml-1"></i>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div class="stage-info stage-info-status">
                            <div class="stage-info-graph">
                              <div class="progress-pie progress-circle">
                                <input
                                  class="knob d-none"
                                  data-thickness=".125"
                                  data-width="100%"
                                  data-fgColor="#2b56f5"
                                  data-bgColor="#c8d2e5"
                                  value="97.7"
                                />
                                <div class="progress-txt">
                                  <span class="progress-amount">
                                    {parseInt(ico.purchased) !== 0
                                      ? (
                                          (ico.purchased / ico.qty) *
                                          100
                                        ).toFixed(2)
                                      : "0"}
                                  </span>
                                  %<span class="progress-status">Sold</span>
                                </div>
                              </div>
                            </div>
                            <div class="stage-info-txt">
                              <h6>Token Issued</h6>
                              <span class="stage-info-total h2">
                                {ico.purchased}
                              </span>
                              <div class="stage-info-count">
                                Sold <span>{ico.purchased}</span> Tokens
                              </div>
                            </div>
                          </div>
                          <div class="stage-info">
                            <div class="row">
                              <div class="col-6">
                                <div class="stage-info-txt">
                                  <h6>Base Price</h6>
                                  <div class="h2 stage-info-number">
                                    {ico.price}
                                    <small>USD</small>
                                  </div>
                                </div>
                              </div>
                              <div class="col-6">
                                <div class="stage-info-txt">
                                  <h6>Base Bonus</h6>
                                  <div class="h2 stage-info-number">
                                    10<small>%</small>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="stage-date">
                            <div class="row">
                              <div class="col-6">
                                <h6>Start Date</h6>
                                <h5>{ico.createdAt}</h5>
                              </div>
                              <div class="col-6">
                                <h6>End Date</h6>
                                <h5>{ico.ends_on}</h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="border border-success p-2 mx-auto my-5">
                      Loading...
                    </p>
                  )
                ) : (
                  <p className="border border-success p-2 mx-auto my-5">
                    Loading...
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ico;
