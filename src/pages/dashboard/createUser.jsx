import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header/Header";

function CreateUser() {
  const { REACT_APP_API_URL } = process.env;

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [isadmin, setisadmin] = useState("");
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
    formdata.append("isadmin", isadmin);

    axios({
      method: "POST",
      url: `${REACT_APP_API_URL}api/auth/createaccount.php`,
      data: formdata,
    })
      .then((res) => {
        if (res.data.status === "success") {
          window.alert(res.data.message);
          window.location.reload();
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
    document.title = "admin/ create Users and admins";
  }, []);

  return (
    <div class="page-content">
      <Header />
      <div class="container">
        <div class="card content-area content-area-mh">
          <div class="card-innr">
            <div class="card-head has-aside">
              <h4 class="card-title">Create User/Admin</h4>
            </div>
            <div className="col-md-7 mt-4 border p-3">
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
                <div className="input-item">
                  <input
                    type="number"
                    placeholder="Enter 0 if user and 1 if admin"
                    className="input-bordered"
                    minlength="1"
                    maxlength="1"
                    value={isadmin}
                    onChange={(e) => setisadmin(e.target.value)}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
