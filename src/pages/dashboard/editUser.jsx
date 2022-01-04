import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header/Header";

function EditUser() {
  const { userid } = useParams();
  const { REACT_APP_API_URL } = process.env;

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [isadmin, setisadmin] = useState("");
  const [password, setpassword] = useState("");
  const [wallet, setwallet] = useState("");
  const [act_bal, setact_bal] = useState("");

  const [isloading, setisloading] = useState(false);
  const [error, seterror] = useState("");

  const toggleloading = () => {
    setisloading((e) => !e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toggleloading();

    const formdata = new FormData();
    formdata.append("userid", userid);
    formdata.append("fullname", username);
    formdata.append("password", password);
    formdata.append("email", email);
    formdata.append("wallet", wallet);
    formdata.append("act_bal", act_bal);
    formdata.append("isadmin", isadmin);

    axios({
      method: "POST",
      url: `${REACT_APP_API_URL}api/auth/updateuser.php`,
      data: formdata,
    })
      .then((res) => {
        if (res.data.status === "success") {
          window.alert(res.data.message);
          window.location.reload();
        } else {
          window.alert(res.data.message);
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

  const getUser = () => {
    axios
      .get(`${REACT_APP_API_URL}/api/admin/userdetails.php?userid=${userid}`)
      .then((res) => {
        if (res.data.status === "success") {
          setusername(res.data.data.fullname);
          setpassword(res.data.data.pass);
          setwallet(res.data.data.wallet);
          setact_bal(res.data.data.act_bal);
          setisadmin(res.data.data.isadmin);
          setemail(res.data.data.email);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        error(err);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    document.title = "admin/ edit and view users details";
  }, []);

  return (
    <div className="page-content">
      <Header />
      <div className="container">
        <div className="card content-area content-area-mh">
          <div className="card-innr">
            <div className="card-head has-aside">
              <h4 className="card-title mx-auto">Edit {username}</h4>
            </div>
            <div className="col-md-7 mt-4 mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="input-item">
                  <label htmlFor="">FullName</label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="input-bordered"
                    name="username"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
                <div className="input-item">
                  <label htmlFor="">Email</label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="input-bordered"
                    name="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
                {error ? (
                  <div className="bg-warning text-light mb-2 pl-2">{error}</div>
                ) : (
                  ""
                )}
                <div className="input-item">
                  <label htmlFor="">Password</label>
                  <input
                    type="text"
                    placeholder="Password"
                    minLength="6"
                    className="input-bordered"
                    name="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    required
                  />
                </div>
                <div className="input-item">
                  <label htmlFor="">Wallet</label>
                  <input
                    type="text"
                    placeholder="wallet"
                    minLength="6"
                    className="input-bordered"
                    name="wallet"
                    value={wallet}
                    onChange={(e) => setwallet(e.target.value)}
                  />
                </div>
                <div className="input-item">
                  <label htmlFor="">Token</label>
                  <input
                    type="number"
                    placeholder="Token"
                    className="input-bordered"
                    value={act_bal}
                    onChange={(e) => setact_bal(e.target.value)}
                    required
                  />
                </div>
                <div className="input-item">
                  <label htmlFor="">IsAdmin</label>
                  <input
                    type="number"
                    placeholder="Enter 0 if user and 1 if admin"
                    className="input-bordered"
                    minLength="1"
                    maxLength="1"
                    value={isadmin}
                    onChange={(e) => setisadmin(e.target.value)}
                    required
                  />
                </div>
                {isloading ? (
                  <button className="btn btn-info btn-block">
                    updating user..
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary btn-block">
                    Update Account
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
