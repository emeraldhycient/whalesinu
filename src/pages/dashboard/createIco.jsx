import React, { useState } from "react";
import axios from "axios";
import Header from "./components/Header/Header";

function CreateIco() {
  const { REACT_APP_API_URL } = process.env;

  const [isloading, setisloading] = useState(false);
  const [error, seterror] = useState("");

  const toggleloading = () => {
    setisloading((e) => !e);
  };

  const [coin_name, setcoin_name] = useState("");
  const [qty, setqty] = useState(0);
  const [price, setprice] = useState("");
  const [bnb, setbnb] = useState("");
  const [btc, setbtc] = useState("");
  const [eth, seteth] = useState("");
  const [purchased, setpurchased] = useState("");
  const [endingon, setendingon] = useState("");

  const createico = (e) => {
    e.preventDefault();
    toggleloading();

    const formdata = new FormData();
    formdata.append("coin_name", coin_name);
    formdata.append("qty", qty);
    formdata.append("price", price);
    formdata.append("bnb", bnb);
    formdata.append("eth", eth);
    formdata.append("btc", btc);
    formdata.append("purchased", purchased);
    formdata.append("endingon", endingon);

    axios({
      method: "POST",
      url: `${REACT_APP_API_URL}api/coin/create_ico.php`,
      data: formdata,
    })
      .then((res) => {
        if (res.data.status === "success") {
          window.alert(res.data.message);
          window.location.reload();
        }
        console.log(res.data);
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      })
      .finally(() => {
        setTimeout(() => {
          toggleloading();
        }, 1000);
      });

    return false;
  };

  return (
    <div class="page-content">
      <Header />
      <div class="container">
        <div class="card content-area content-area-mh ">
          <div class="card-innr">
            <div class="card-head  has-aside">
              <h4 class="card-title">Create An ICO</h4>
            </div>
            <form className="mt-5" onSubmit={createico}>
              <div className="row">
                <div className="col-md-6">
                  <div className="input-item input-with-label">
                    <label htmlFor="" className="input-item-label">
                      <i className="fa fa-btc mr-1 text-warning"></i>Ico Name
                    </label>
                    <div className="input-wrap">
                      <input
                        type="text"
                        value={coin_name}
                        onChange={(e) => setcoin_name(e.target.value)}
                        placeholder="E.G  whalesinu ico 1"
                        className="input-bordered"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-item input-with-label">
                    <label htmlFor="" className="input-item-label">
                      <i className="fa fa-ethernet mr-1 text-warning"></i>
                      Quantity
                    </label>
                    <div className="input-wrap">
                      <input
                        type="text"
                        placeholder="Number to be distributed"
                        className="input-bordered"
                        value={qty}
                        onChange={(e) => setqty(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-item input-with-label">
                    <label htmlFor="" className="input-item-label">
                      <i className="fa fa-coins mr-1 text-warning"></i>
                      The price In dollar
                    </label>
                    <div className="input-wrap">
                      <input
                        type="text"
                        placeholder="1 whalesinu to dollar"
                        className="input-bordered"
                        value={price}
                        onChange={(e) => setprice(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-item input-with-label">
                    <label htmlFor="" className="input-item-label">
                      <i className="fa fa-coins mr-1 text-warning"></i>Price BNB
                    </label>
                    <div className="input-wrap">
                      <input
                        type="text"
                        placeholder="1 dollar to bnb"
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
                      <i className="fa fa-coins mr-1 text-warning"></i>Price BTC
                    </label>
                    <div className="input-wrap">
                      <input
                        type="text"
                        placeholder="1 dollar to bnb"
                        className="input-bordered"
                        value={btc}
                        onChange={(e) => setbtc(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-item input-with-label">
                    <label htmlFor="" className="input-item-label">
                      <i className="fa fa-coins mr-1 text-warning"></i>Price
                      Ethereum
                    </label>
                    <div className="input-wrap">
                      <input
                        type="text"
                        placeholder="1 dollar to bnb"
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
                      <i className="fa fa-coins mr-1 text-warning"></i>Ending
                      Date
                    </label>
                    <div className="input-wrap">
                      <input
                        type="datetime-local"
                        placeholder="Distribution ending date"
                        className="input-bordered"
                        value={endingon}
                        onChange={(e) => setendingon(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-item input-with-label">
                    <label htmlFor="" className="input-item-label">
                      <i className="fa fa-coins mr-1 text-warning"></i>Purchased
                    </label>
                    <div className="input-wrap">
                      <input
                        type="number"
                        placeholder="How Many have been distributed"
                        className="input-bordered"
                        value={purchased}
                        onChange={(e) => setpurchased(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {isloading ? (
                <button className="btn btn-info float-right">
                  Creating ico
                </button>
              ) : (
                <button type="submit" className="btn btn-primary float-right">
                  Create Ico
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateIco;
