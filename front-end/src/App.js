import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";

import AuthVerify from "./common/auth-verify";
import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Landing from "./components/landing.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import Home from "./components/home.component";
import CustomerProfile from "./components/customer-profile.component";
import AddCustomer from "./components/add-customer.component";

import Sidebar from "./components/sidebar.component";


// import BoardModerator from "./components/board-moderator.component";
// import BoardAdmin from "./components/board-admin.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
        <Sidebar/>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/landing"]} component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/customer-profile" component={CustomerProfile} />
            <Route exact path="/addCustomer" component={AddCustomer} />

            {/* <Route path="/mod" component={BoardModerator} /> */}
            {/* <Route path="/admin" component={BoardAdmin} /> */}
          </Switch>
        </div>

        <AuthVerify logOut={this.logOut}/>
      </div>
    );
  }
}

export default App;
