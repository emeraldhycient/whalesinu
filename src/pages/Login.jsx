import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import "./style.css";
import logo from "../assets/images/Whales Inu 1-01.svg";
import logo2 from "../assets/images/Whales Inu-01.svg";

function Login() {
  const { REACT_APP_API_URL } = process.env;

  const history = useHistory();

  const [isloading, setisloading] = useState(false);

  const toggleloading = () => {
    setisloading((e) => !e);
  };

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const submitForm = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);

    toggleloading();

    axios({
      method: "POST",
      url: `${REACT_APP_API_URL}api/auth/login.php`,
      data: formdata,
    })
      .then((res) => {
        if (res.data.data.user.isadmin) {
          window.alert(res.data.message);
          sessionStorage.setItem("adminid", res.data.data.user.userid);
          sessionStorage.setItem("fullname", res.data.data.user.fullname);
          sessionStorage.setItem("email", res.data.data.user.email);
          setTimeout(() => {
            history.push("/admin/dashboard/");
          }, 600);
        } else {
          window.alert(res.data.message);
          sessionStorage.setItem("userid", res.data.data.user.userid);
          sessionStorage.setItem("fullname", res.data.data.user.fullname);
          sessionStorage.setItem("email", res.data.data.user.email);
          setTimeout(() => {
            history.push("/user/dashboard");
          }, 600);
        }
        console.log(res);
      })
      .catch((err) => {
        window.alert(err.response.data.message);
        console.log(err.response.data);
      })
      .finally((e) => {
        setTimeout(() => {
          toggleloading();
        }, 1000);
      });

    return false;
  };

  useEffect(() => {
    document.title = "login to your WhalesInu Dashboard";
  }, []);

  return (
    <div className="page-ath theme-modern page-ath-modern page-ath-alt">
      <div className="page-ath-header">
        <a href="/" className="page-ath-logo">
          <img className="page-ath-logo-img" src={logo} alt="whalesinu" />
        </a>
      </div>
      <div className="page-ath-form">
        <h2 className="page-ath-heading">
          Sign in<small>with your WhalesInu Account</small>
        </h2>
        <form
          className="login-form validate validate-modern"
          onSubmit={submitForm}
        >
          <div className="input-item">
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
          <div className="input-item">
            <input
              type="password"
              placeholder="Password"
              minLength="6"
              className="input-bordered"
              name="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
            />
          </div>
          {isloading ? (
            <button className="btn btn-info btn-block">
              Validating Details...
            </button>
          ) : (
            <button type="submit" className="btn btn-primary btn-block">
              Sign In
            </button>
          )}
        </form>

        <div className="gaps-4x"></div>
        <div className="form-note">
          Don’t have an account?
          <a href="/register">
            <strong>Sign up here</strong>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
