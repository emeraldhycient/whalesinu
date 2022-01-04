import React, { useState, useEffect } from "react";
import axios from "axios";
function MiniTransact() {
  const { REACT_APP_API_URL } = process.env;

  const [transactions, settransactions] = useState("");
  const [isloading, setisloading] = useState(false);
  const toggleloading = () => {
    setisloading((e) => !e);
  };

  const fetchTransactions = () => {
    toggleloading();
    axios
      .get(`${REACT_APP_API_URL}api/admin/deposits.php`)
      .then((res) => {
        if (res.data.status === "success") {
          const data = Object.values(res.data.data).slice(0, 4);
          settransactions(data);
        } else {
          alert(res.data.message);
        }
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

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
      <table className="table tnx-table">
        <tbody>
          {isloading ? (
            <tr>
              <td className="m-5">Loading ...</td>
            </tr>
          ) : transactions ? (
            transactions.map((trans, i) => (
              <tr key={i}>
                <td>
                  <h5 className="lead mb-1 text-uppercase">{trans.tx_ref}</h5>
                  <span className="sub">{trans.createdAt}</span>
                </td>
                <td class="d-none d-sm-table-cell">
                  <h5 class="lead mb-1">+{trans.qty}</h5>
                  <span class="sub ucap">
                    {trans.price} {trans.currency}
                  </span>
                </td>
                <td class="text-right">
                  {trans.statuz ? (
                    <div className="border  border-success rounded text-center">
                      A
                    </div>
                  ) : (
                    <div className="border border-warning rounded text-center">
                      P
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>Loading ...</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default MiniTransact;
