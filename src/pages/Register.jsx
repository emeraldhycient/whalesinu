import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

import logo from "../assets/images/Whales Inu 1-01.svg";

function Register() {
  const { REACT_APP_API_URL } = process.env;

  const history = useHistory();
  const { referralid } = useParams();

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const [isloading, setisloading] = useState(false);
  const [error, seterror] = useState("");

  const toggleloading = () => {
    setisloading((e) => !e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toggleloading();

    const formdata = new FormData();
    formdata.append("fullname", username);
    formdata.append("password", password);
    formdata.append("email", email);
    formdata.append("isadmin", "");
    formdata.append("referredby", referralid);

    axios({
      method: "POST",
      url: `${REACT_APP_API_URL}api/auth/createaccount.php`,
      data: formdata,
    })
      .then((res) => {
        if (res.data.status === "success") {
          window.alert(res.data.message);
          setTimeout(() => {
            history.push("/login");
          }, 1000);
        }
        console.log(e);
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

  const validatePass = () => {
    if (password !== "") {
      if (password.length > 6) {
        if (cpassword !== "") {
          if (password === cpassword) {
            seterror("");
          } else {
            seterror("passwords do not match ");
          }
        } else {
          seterror("");
        }
      } else {
        seterror("password length is too small ");
      }
    } else {
      seterror("");
    }
  };

  useEffect(() => {
    validatePass();
  }, [password, cpassword]);

  useEffect(() => {
    document.title =
      "Create a WhalesInu account today, access your dashboard afterwards";
  }, []);

  return (
    <div className="page-ath theme-modern page-ath-modern page-ath-alt">
      <div className="page-ath-wrap">
        <div className="page-ath-content">
          <div className="page-ath-header">
            <a href="/" className="page-ath-logo">
              <img className="page-ath-logo-img" src={logo} alt="whalesinu" />
            </a>
          </div>
          <div className="page-ath-form">
            <h2 className="page-ath-heading">
              Create <small>a new WhalesInu Account</small>
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="input-item">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input-bordered"
                  name="username"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  required
                  autofocus
                />
              </div>
              <div className="input-item">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input-bordered"
                  name="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required
                  autofocus
                />
              </div>
              {error ? (
                <div className="bg-warning text-light mb-2 pl-2">{error}</div>
              ) : (
                ""
              )}
              <div className="input-item">
                <input
                  type="password"
                  placeholder="Password"
                  minlength="6"
                  className="input-bordered"
                  name="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-item">
                <input
                  type="password"
                  placeholder="confirm Password"
                  minlength="6"
                  className="input-bordered"
                  name="cpassword"
                  value={cpassword}
                  onChange={(e) => setcpassword(e.target.value)}
                  required
                />
              </div>
              {isloading ? (
                <button className="btn btn-info btn-block">
                  account creation in progress..
                </button>
              ) : (
                <button type="submit" className="btn btn-primary btn-block">
                  Create Account
                </button>
              )}
            </form>

            <div className="gaps-4x"></div>
            <div className="form-note">
              Already have an account?{" "}
              <a href="/login">
                <strong>Login</strong>
              </a>
            </div>
          </div>

          <div className="page-ath-footer">
            <ul className="footer-links guttar-20px align-items-center">
              <li>
                <a href="">Privacy and Policy</a>
              </li>
              <li>
                <a href="">Terms and Condition</a>
              </li>
            </ul>
            <div className="copyright-text">
              &copy; 2021 WhalesInu. All Right Reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
