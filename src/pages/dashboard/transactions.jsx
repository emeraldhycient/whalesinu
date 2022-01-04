import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header/Header";

function Transactionx() {
  const { REACT_APP_API_URL } = process.env;

  const [transactions, settransactions] = useState("");

  const [isloading, setisloading] = useState(false);
  const [isloading2, setisloading2] = useState(false);

  const toggleloading = () => {
    setisloading((e) => !e);
  };

  const toggleloading2 = () => {
    setisloading2((e) => !e);
  };

  const userid = sessionStorage.getItem("userid");
  const fetchTransactions = () => {
    axios
      .get(`${REACT_APP_API_URL}api/admin/deposits.php`)
      .then((res) => {
        if (res.data.status === "success") {
          const data = Object.values(res.data.data);
          settransactions(data);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const deleteTranx = (tx_ref) => {
    toggleloading();
    axios
      .get(`${REACT_APP_API_URL}api/user/deleteDeposit.php?tx_ref=${tx_ref}`)
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

  const approveTranx = (tx_ref, amount, userid, coinid) => {
    const formdata = new FormData();
    formdata.append("tx_ref", tx_ref);
    formdata.append("amount", amount);
    formdata.append("coinid", coinid);
    formdata.append("userid", userid);

    toggleloading2();

    axios({
      method: "POST",
      url: `${REACT_APP_API_URL}api/admin/processdeposit.php`,
      data: formdata,
    })
      .then((res) => {
        alert(res.data.message);
        window.location.reload();
        console.log(res);
      })
      .catch((err) => {
        window.alert(err.response.data.message);
        console.log(err.response.data);
      })
      .finally((e) => {
        setTimeout(() => {
          toggleloading2();
        }, 1000);
      });
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    document.title = "admin/ view , edit , approve or delete any contribution";
  }, []);

  return (
    <section className="user-dashboard page-user theme-modern">
      <Header />
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="main-content col-lg-12">
              <div className="card content-area content-area-mh">
                <div className="card-innr">
                  <div className="card-head">
                    <h4 className="card-title">Transactions list</h4>
                  </div>
                  <div className="gaps-1x"></div>
                  <div className="table-responsive py-3">
                    <table className="table table-hover table-bordered">
                      <thead>
                        <tr>
                          <th>TRANX NO</th>
                          <th>TOKENS</th>
                          <th>CURRENCY</th>
                          <th>AMOUNT</th>
                          <th>FROM</th>
                          <th>TYPE</th>
                          <th>STATUS</th>
                          <th>
                            <i className="fa fa-cog"></i>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions ? (
                          transactions.map((item, i) => (
                            <tr>
                              <td className="text-block">{item.tx_ref}</td>
                              <td className="text-block">{item.qty}</td>
                              <td className="text-block">{item.currency}</td>
                              <td className="text-block">{item.price}</td>
                              <td className="text-block">{item.wallet}</td>
                              <td>
                                <p className="text-block border border-success p-2">
                                  purchase
                                </p>
                              </td>
                              {item.statuz ? (
                                <td>
                                  <p className="text-block border border-success p-2">
                                    Approved
                                  </p>
                                </td>
                              ) : (
                                <td>
                                  <p className="text-block   text-warning p-2">
                                    Pending
                                  </p>
                                </td>
                              )}
                              <td>
                                {isloading ? (
                                  <div
                                    class="spinner-border text-danger"
                                    role="status"
                                  >
                                    <span class="sr-only">Loading...</span>
                                  </div>
                                ) : (
                                  <i
                                    className="fa fa-trash text-danger mx-2"
                                    onClick={(e) => deleteTranx(item.tx_ref)}
                                  ></i>
                                )}
                                {isloading2 ? (
                                  <div
                                    class="spinner-border text-success"
                                    role="status"
                                  >
                                    <span class="sr-only">Loading...</span>
                                  </div>
                                ) : (
                                  <i
                                    className="fa fa-check-double text-success"
                                    onClick={(e) =>
                                      approveTranx(
                                        item.tx_ref,
                                        item.qty,
                                        item.userid,
                                        item.coin_id
                                      )
                                    }
                                  ></i>
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td className="text-block">No Data found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Transactionx;
