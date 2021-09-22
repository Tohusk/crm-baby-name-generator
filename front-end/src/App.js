import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
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
import Customers from "./components/customer-overview.component";
import Products from "./components/products-overview.component";
import CustomerProfile from "./components/customer-profile.component";
import AddCustomer from "./components/add-customer.component";
import AddProduct from "./components/add-product.component";
import AddCategory from "./components/add-category.component";
import AddTransaction from "./components/add-transaction.component";
import EditCustomer from "./components/edit-customer.component";
import Sidebar from "./components/sidebar.component";

import Sales from "./components/sales-overview.component";

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
    return (
      <div>
        
        <div className="container mt-3">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path={["/", "/landing"]}>
              <Sidebar/>
              <Landing/>
            </Route>
            <Route exact path="/profile">
              <Sidebar/>
              <Profile/>
            </Route>
            <Route exact path="/user">
              <Sidebar/>
              <BoardUser/>
            </Route>
            <Route exact path="/home">
              <Sidebar/>
              <Home/>
            </Route>
            <Route exact path="/customer-profile">
              <Sidebar/>
              <CustomerProfile/>
            </Route>
            <Route exact path="/addCustomer">
              <Sidebar/>
              <AddCustomer/>
            </Route>
            <Route exact path="/addProduct">
              <Sidebar/>
              <AddProduct/>
            </Route>
            <Route exact path="/addTransaction">
              <Sidebar/>
              <AddTransaction/>
            </Route>
            <Route exact path="/addCategory">
              <Sidebar/>
              <AddCategory/>
            </Route>
            <Route exact path="/editCustomer">
              <Sidebar/>
              <EditCustomer/>
            </Route>
            <Route exact path="/customers">
              <Sidebar/>
              <Customers/>
            </Route>
            <Route exact path="/products">
              <Sidebar/>
              <Products/>
            </Route>
            <Route exact path="/sales">
              <Sidebar/>
              <Sales/>
            </Route>
            <Route exact path="/customer-profile">
              <Sidebar/>
              <CustomerProfile/>
            </Route>
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
