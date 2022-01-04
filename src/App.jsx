import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./assets/css/styles.css";
import Contribute from "./pages/Contribute";
import Admin from "./pages/dashboard/admin";
import CreateIco from "./pages/dashboard/createIco";
import CreateUser from "./pages/dashboard/createUser";
import EditUser from "./pages/dashboard/editUser";
import Ico from "./pages/dashboard/ico";
import Settings from "./pages/dashboard/settings";
import Transactionx from "./pages/dashboard/transactions";
import Users from "./pages/dashboard/users";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Transactions from "./pages/Transactions";

import Protectadmin from "./auth/Protectadmin";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <ProtectedRoute path="/user/dashboard" component={Home} />
        <ProtectedRoute path="/user/contribute" component={Contribute} />
        <ProtectedRoute path="/user/transactions" component={Transactions} />
        <ProtectedRoute path="/user/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/register/:referalid" component={Register} />

        <Protectadmin path="/admin/dashboard" component={Admin} />
        <Protectadmin path="/admin/transactions" component={Transactionx} />
        <Protectadmin path="/admin/users" exact component={Users} />
        <Protectadmin path="/admin/users/create-user" component={CreateUser} />
        <Protectadmin path="/admin/users/:userid" exact component={EditUser} />
        <Protectadmin path="/admin/ico" exact component={Ico} />
        <Protectadmin path="/admin/ico/create-ico" component={CreateIco} />
        <Protectadmin path="/admin/settings" component={Settings} />
      </Switch>
    </Router>
  );
}

export default App;
