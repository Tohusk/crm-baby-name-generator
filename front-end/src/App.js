import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Redirect, withRouter } from "react-router";

import UserService from "./services/user.service";
import Login from "./components/login.component";
import Register from "./components/register.component";

import Home from "./components/home.component";
import Contacts from "./components/contact-overview.component";
import Products from "./components/products-overview.component";
import Sales from "./components/sales-overview.component";

import ContactProfile from "./components/contact-profile.component";
import EditContact from "./components/edit-contact.component";

import AddContact from "./components/add-contact.component";
import AddProduct from "./components/add-product.component";
import EditCategory from "./components/edit-category.component";
import AddTransaction from "./components/add-transaction.component";

import Sidebar from "./components/sidebar.component";
import TestingPage from "./components/testing-page.component";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = UserService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
            });
        }
    }

    render() {
        return (
            <div>
                <div className="container mt-3">
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/testing/testAllServices" component={TestingPage} />
                        <Route exact path="/">
                            <Redirect to="/login" />
                        </Route>
                        <Route exact path="/home">
                            <Sidebar />
                            <Home />
                        </Route>
                        <Route exact path="/contact-profile">
                            <Sidebar />
                            <ContactProfile />
                        </Route>
                        <Route exact path="/addContact">
                            <Sidebar />
                            <AddContact />
                        </Route>
                        <Route exact path="/addProduct">
                            <Sidebar />
                            <AddProduct />
                        </Route>
                        <Route exact path="/addTransaction">
                            <Sidebar />
                            <AddTransaction />
                        </Route>
                        <Route exact path="/editCategory">
                            <Sidebar />
                            <EditCategory />
                        </Route>
                        <Route exact path="/editContact">
                            <Sidebar />
                            <EditContact />
                        </Route>
                        <Route exact path="/contacts">
                            <Sidebar />
                            <Contacts />
                        </Route>
                        <Route exact path="/products">
                            <Sidebar />
                            <Products />
                        </Route>
                        <Route exact path="/sales">
                            <Sidebar />
                            <Sales />
                        </Route>
                        <Route exact path="/contact-profile">
                            <Sidebar />
                            <ContactProfile />
                        </Route>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default withRouter(App);
